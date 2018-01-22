function _isValidGridArray(data) {
    if (!Array.isArray(data)) {
        throw new Error('Trying to import data that is not an array.');
    }
    data.forEach((row, i) => {
        if (!Array.isArray(row)) {
            throw new Error('Trying to import data that is not an array.');
        }
        if (i > 0 && data[i - 1].length !== row.length) {
            throw new Error('Trying to import data with different row lengths.');
        }
        if (row.length < 1) {
            throw new Error('Trying to import grid without any columns. You need to provide at least one column.');
        }
    });
}

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
const _pos2index = (position, columns) => position && position[0] + position[1] * columns;

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
 * @returns {Array} - The flattened one-dimensional array.
 */
const _flatten = array2D => array2D.reduce((res, row) => [...res, ...row], []);

const _addPositions = (p1, p2) => [
    p1[0] + p2[0],
    p1[1] + p2[1],
];

function _getValueAt(_data, columns, pos) {
    const index = _pos2index(pos, columns);
    if (isNaN(index)) {
        return;
    }
    return _data[index];
}

function _setValueAt(api, _data, columns, pos, value) {
    const index = _pos2index(pos, columns);
    if (!isNaN(index)) {
        _data[index] = value;
    }
    return api;
}

function _setAreaAt(api, columns, rows, pos, area) {
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
            api.setValueAt(targetPos, cell);
        });
    });
    return api;
}

function _getAreaAt(api, columns, rows, pos, size) {
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
            area[rArea][cArea] = api.getValueAt([c, r]);
        }
    }
    return area;
}

function _findPosition(columns, data, callback) {
    const index = data.findIndex(callback);
    return (index >= 0) ? _index2pos(index, columns) : undefined;
}

function _findPositionInArea(api, columns, pos, size, callback) {
    const area = api.getAreaAt(pos, size);
    const flat = _flatten(area);
    const areaIndex = flat.findIndex(callback);
    if (areaIndex >= 0) {
        const areaColumns = area[0].length;
        const posInArea = _index2pos(areaIndex, areaColumns);
        return [
           pos[0] + posInArea[0],
           pos[1] + posInArea[1],
        ];
    }
}

function _checkAreaFitsAt(columns, rows, pos, area) {
    const fitsHorizontally = pos[0] + area[0].length <= columns;
    const fitsVertically = pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
}

function _getRelativePosition(columns, rows, startPos, direction) {
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
function gridl(data) {

    _isValidGridArray(data);

    const rows = data.length;
    const columns = data[0].length;

    const _data = _flatten(data, columns, rows);

    const api = {};

    // getter for dimensions
    api.columns = () => columns;
    api.rows = () => rows;
    api.size = () => [columns, rows];

    // accessing data
    api.getValueAt = pos => _getValueAt(_data, columns, pos);
    api.setValueAt = (pos, value) => _setValueAt(api, _data, columns, pos, value);
    api.setAreaAt = (pos, area) => _setAreaAt(api, columns, rows, pos, area);
    api.getAreaAt = (pos, size) => _getAreaAt(api, columns, rows, pos, size);
    api.findPosition = callback => _findPosition(columns, _data, callback);
    api.findPositionInArea = (pos, size, callback) => _findPositionInArea(api, columns, pos, size, callback);
    api.checkAreaFitsAt = (pos, area) => _checkAreaFitsAt(columns, rows, pos, area);
    api.getRelativePosition = (pos, direction) => _getRelativePosition(columns, rows, pos, direction);
    api.getRelativeValue = (pos, direction) => api.getValueAt(api.getRelativePosition(pos, direction));

    // exporting data
    api.getData = () => _toArray2D(_data, columns);

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

gridl.generateData = (columns, rows, callback) => {
    const parsedColumns = parseInt(columns);
    const parsedRows = parseInt(rows);
    if (parsedColumns < 1 || isNaN(parsedColumns)) {
        throw new Error(`You need to specify at least one column. Given: ${columns}`);
    }
    if (parsedRows < 1 || isNaN(parsedRows)) {
        throw new Error(`You need to specify at least one row. Given: ${rows}`);
    }
    return Array.from({ length: parsedRows }, (vr, row) => {
        return Array.from({ length: parsedColumns }, (vc, column) => {
            return callback({ column, row });
        });
    });
};

gridl.generate = (columns, rows, callback) => gridl(gridl.generateData(columns, rows, callback));

export default gridl;
