const _defaultOpts = {
    arrayType: '1d',
};

const _validArrayTypes = Object.freeze(['1d', '2d']);

/**
 * Converts cell index into a cell position.
 *
 * @param {Integer} index - The index of the cell.
 * @param {Integer} columns - The number of columns the grid has.
 * @returns {Array} - The equivalent position within the grid as [x, y].
 */
export const index2pos = (index, columns) => [index % columns, Math.floor(index / columns)];

/**
 * Converts a position into cell index.
 *
 * @param {Array} position - The two dimensional position array as [x, y].
 * @param {Integer} columns - The number of columns the grid has.
 * @returns {Integer} - The equivalent index within the grid.
 */
export const pos2index = (position, columns) => position[0] + position[1] * columns;

/**
 * Converts an one-dimensional grid array into a two-dimensional grid.
 *
 * @param {Array} array1D - The one dimensional array.
 * @param {Integer} columns - The number columns the new array should have.
 * @returns {Array} - The two-dimensional array.
 */
export const toArray2D = (array1D, columns) => array1D.reduce((res, cell, index) => {
    const pos = index2pos(index, columns);
    if (!res[pos[1]]) {
        res[pos[1]] = [];
    }
    res[pos[1]][pos[0]] = cell;
    return res;
}, []);

/**
 * Convert a two-dimensional array into a one-dimensional array.
 *
 * @param {Array} array2D - The two dimensional array to convert.
 * @param {Integer} columns - The number of columns.
 * @param {Integer} rows - The number of rows.
 * @returns {Array} - The flattened one-dimensional array.
 */
export const toArray1D = (array2D, columns, rows) => {
    if (rows !== array2D.length) {
        const dataStr = `(expected: ${rows}, actually: ${array2D.length})`;
        throw new Error(`Trying to convert invalid array2D with invalid number of rows to array1D. ${dataStr}`);
    }
    return array2D.reduce((res, row) => {
        if (columns !== row.length) {
            const dataStr = `(expected: ${columns}, actually: ${row.length})`;
            throw new Error(`Trying to convert invalid array2D with invalid number of columns to array1D. ${dataStr}`);
        }
        return [...res, ...row];
    }, []);
};

/**
 * Enhance the options with number of rows and columns if they're not provided by the user.
 *
 * @param {Object} opts - The given options.
 * @param {Array} data - One- or two-dimensional data array.
 * @returns {Object} - The options with rows and columns field.
 * @private
 */
function _guessDimensions(opts, data) {
    const numCells = opts.arrayType === '1d' ? data.length : data.reduce((res, row) => res + row.length, 0);

    if (!opts.columns && !opts.rows) {
        if (opts.arrayType === '2d') {
            opts.rows = data.length;
            opts.columns = data[0].length;
        }
        else {
            opts.rows = 1;
            opts.columns = data.length;
        }
    }
    else if (opts.columns && !opts.rows && numCells % opts.columns === 0) {
        opts.rows = numCells / opts.columns;
    }
    else if (!opts.columns && opts.rows && numCells % opts.rows === 0) {
        opts.columns = numCells / opts.rows;
    }

    return opts;
}

const _mergeOptions = (opts, data) => ({
    ..._defaultOpts,
    ..._guessDimensions({ ..._defaultOpts, ...opts }, data),
});

const _toIndex = (indexOrPos, columns) => Array.isArray(indexOrPos) ? pos2index(indexOrPos, columns) : parseInt(indexOrPos);

const _toPosition = (indexOrPos, columns) => Array.isArray(indexOrPos) ? indexOrPos : index2pos(indexOrPos, columns);

function _valueAt(_data, columns, indexOrPos, value) {
    const index = _toIndex(indexOrPos, columns);
    if (isNaN(index)) {
        throw new Error(`Trying to access value with invalid index or position. ${indexOrPos}`);
    }
    if (value === undefined) {
        return _data[index];
    }
    else {
        _data[index] = value;
        return this;
    }
}

function _setAreaAt(api, columns, rows, indexOrPos, area) {
    const pos = _toPosition(indexOrPos, columns);
    area.forEach((row, r) => {
        const targetPos = [0, r + pos[1]];
        if (targetPos[1] >= rows) {
            return;
        }
        row.forEach((cell, c) => {
            targetPos[0] = c + pos[0];
            if (targetPos[0] >= columns) {
                return;
            }
            api.valueAt(targetPos, cell);
        });
    });
    return api;
}

function _getAreaAt(api, columns, rows, indexOrPos, size) {
    const pos = _toPosition(indexOrPos, columns);
    const end = [
        Math.min(pos[0] + size[0], columns),
        Math.min(pos[1] + size[1], rows),
    ];
    const area = [];
    for (let r = pos[1]; r < end[1]; r++) {
        const rArea = r - pos[1];
        if (!area[rArea]) {
            area[rArea] = [];
        }
        for (let c = pos[0]; c < end[0]; c++) {
            const cArea = c - pos[0];
            area[rArea][cArea] = api.valueAt([c, r]);
        }
    }
    return area;
}

/**
 * The gridl base function.
 *
 * @param {Array} data
 * @param {{ arrayType, columns, rows }} opts
 * @returns {{ toArray1D, toArray2D, index2pos, pos2index, rows, columns }}
 */
export function gridl(data, opts = {}) {

    if (!Array.isArray(data)) {
        throw new Error('Trying to use gridl with none-array value for data.');
    }

    if (opts.arrayType && !_validArrayTypes.includes(opts.arrayType)) {
        throw new Error(`Trying to use invalid arrayType. expected: (${_validArrayTypes.join('|')}), actually: ${opts.arrayType}`);
    }

    const _opts = _mergeOptions(opts, data);
    const { columns, rows } = _opts;
    const _data = _opts.arrayType === '1d' ? [...data] : toArray1D(data, columns, rows);

    const api = {};

    // getter for dimensions
    api.columns = () => columns;
    api.rows = () => rows;
    api.size = () => [columns, rows];

    // position calculations
    api.index2pos = index => index2pos(index, columns);
    api.pos2index = position => pos2index(position, columns);

    // accessing data
    api.valueAt = _valueAt.bind(api, _data, columns);
    api.setAreaAt = (indexOrPos, area) => _setAreaAt(api, columns, rows, indexOrPos, area);
    api.getAreaAt = (indexOrPos, size) => _getAreaAt(api, columns, rows, indexOrPos, size);

    // exporting data
    api.toArray1D = () => [..._data];
    api.toArray2D = toArray2D.bind(api, _data, columns);
    api.serialize = () => ({
        opts: _opts,
        data: _data,
    });

    return api;
}

export default gridl;
