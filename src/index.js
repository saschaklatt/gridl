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
const _index2pos = (index, columns) => [index % columns, Math.floor(index / columns)];

/**
 * Converts a position into cell index.
 *
 * @param {Array} position - The two dimensional position array as [x, y].
 * @param {Integer} columns - The number of columns the grid has.
 * @returns {Integer} - The equivalent index within the grid.
 */
const _pos2index = (position, columns) => position[0] + position[1] * columns;

/**
 * Converts an one-dimensional grid array into a two-dimensional grid.
 *
 * @param {Array} array1D - The one dimensional array.
 * @param {Integer} columns - The number columns the new array should have.
 * @returns {Array} - The two-dimensional array.
 */
const _toArray2D = (array1D, columns) => array1D.reduce((res, cell, index) => {
    const pos = _index2pos(index, columns);
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
const _toArray1D = (array2D, columns, rows) => {
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

const _toIndex = (indexOrPos, columns) => {
    if (!columns) {
        throw new Error('_toIndex() needs to know the number of columns.');
    }
    return Array.isArray(indexOrPos) ? _pos2index(indexOrPos, columns) : parseInt(indexOrPos);
};

const _toPosition = (indexOrPos, columns) => {
    if (!columns) {
        throw new Error('_toPosition() needs to know the number of columns.');
    }
    return Array.isArray(indexOrPos) ? indexOrPos : _index2pos(indexOrPos, columns);
};

const _flatten = array2D => array2D.reduce((res, row) => [...res, ...row], []);

const _addPositions = (p1, p2) => [
    p1[0] + p2[0],
    p1[1] + p2[1],
];

function _valueAt(_data, columns, indexOrPos, value) {
    const index = _toIndex(indexOrPos, columns);
    if (isNaN(index)) {
        // throw new Error(`Trying to access value with invalid index or position. ${indexOrPos}`);
        return;
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

function _findPosition(api, data, callback) {
    const index = data.findIndex(callback);
    return (index >= 0) ? api.index2pos(index) : undefined;
}

function _findPositionInArea(api, columns, indexOrPos, size, callback) {
    const area = api.getAreaAt(indexOrPos, size);
    const flat = _flatten(area);
    const areaIndex = flat.findIndex(callback);
    if (areaIndex >= 0) {
        const areaColumns = area[0].length;
        const areaPos = _toPosition(indexOrPos, columns);
        const posInArea = _index2pos(areaIndex, areaColumns);
        return [
            areaPos[0] + posInArea[0],
            areaPos[1] + posInArea[1],
        ];
    }
}

function _checkAreaFitsAt(columns, rows, indexOrPos, area) {
    const pos = _toPosition(indexOrPos, columns);
    const fitsHorizontally = pos[0] + area[0].length <= columns;
    const fitsVertically = pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
}

function _getRelativePosition(columns, rows, indexOrPos, direction) {
    const startPos = _toPosition(indexOrPos, columns);
    const targetPos = _addPositions(startPos, direction);
    if (targetPos[0] < 0 || targetPos[0] >= columns || targetPos[1] < 0 || targetPos[1] >= rows) {
        return;
    }
    return targetPos;
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
    const _data = _opts.arrayType === '1d' ? [...data] : _toArray1D(data, columns, rows);

    const api = {};

    // getter for dimensions
    api.columns = () => columns;
    api.rows = () => rows;
    api.size = () => [columns, rows];

    // position calculations
    api.index2pos = index => _index2pos(index, columns);
    api.pos2index = position => {
        if (!position) {
            return -1;
        }
        return _pos2index(position, columns);
    };

    // accessing data
    api.valueAt = _valueAt.bind(api, _data, columns);
    api.setAreaAt = (indexOrPos, area) => _setAreaAt(api, columns, rows, indexOrPos, area);
    api.getAreaAt = (indexOrPos, size) => _getAreaAt(api, columns, rows, indexOrPos, size);
    api.findIndex = callback => _data.findIndex(callback);
    api.findPosition = callback => _findPosition(api, _data, callback);
    api.findPositionInArea = (indexOrPos, size, callback) => _findPositionInArea(api, columns, indexOrPos, size, callback);
    api.findIndexInArea = (indexOrPos, size, callback) => api.pos2index(api.findPositionInArea(indexOrPos, size, callback));
    api.checkAreaFitsAt = (indexOrPos, area) => _checkAreaFitsAt(columns, rows, indexOrPos, area);
    api.getRelativePosition = (indexOrPos, direction) => _getRelativePosition(columns, rows, indexOrPos, direction);
    api.getRelativeIndex = (indexOrPos, direction) => api.pos2index(api.getRelativePosition(indexOrPos, direction));
    api.getRelativeValue = (indexOrPos, direction) => api.valueAt(api.getRelativePosition(indexOrPos, direction));

    // exporting data
    api.toArray1D = () => [..._data];
    api.toArray2D = _toArray2D.bind(api, _data, columns);
    api.serialize = () => ({
        opts: _opts,
        data: _data,
    });

    return api;
}

gridl.directions = Object.freeze({
    TOP:          [ 0, -1],
    TOP_RIGHT:    [ 1, -1],
    RIGHT:        [ 1,  0],
    BOTTOM_RIGHT: [ 1,  1],
    BOTTOM:       [ 0,  1],
    BOTTOM_LEFT:  [-1,  1],
    LEFT:         [-1,  0],
    TOP_LEFT:     [-1, -1],
});

export default gridl;
