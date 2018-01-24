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

const _swap = (arr, i1, i2) => {
    const tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
};

const _move = (data, fromIndex, toIndex) => {
    const cell = data[fromIndex];
    data.splice(fromIndex, 1);
    data.splice(toIndex, 0, cell);
    return data;
};

const _isNotInArea = (areaSize, position) => (
    position[0] < 0 || position[0] >= areaSize[0] ||
    position[1] < 0 || position[1] >= areaSize[1]
);

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
    if (_isNotInArea([columns, rows], targetPos)) {
        return;
    }
    return targetPos;
}

function _moveCell(api, data, columns, rows, from, to) {
    const fromIndex = _pos2index(from, columns);
    const size = [columns, rows];
    if (isNaN(fromIndex) || _isNotInArea(size, from)) {
        throw new Error(`Trying to move cell from an invalid position. Given: [${from}]`);
    }
    const toIndex = _pos2index(to, columns);
    if (isNaN(toIndex) || _isNotInArea(size, to)) {
        throw new Error(`Trying to move cell to an invalid position. Given: [${to}]`);
    }
    _move(data, fromIndex, toIndex);
    return api;
}

function _moveRow(_grid, _columns, _rows, yFrom, yTo) {
    if (yFrom < 0 || yFrom >= _rows) {
        throw new Error(`Trying to move row from an invalid position. Given: ${yFrom}`);
    }
    if (yTo < 0 || yTo >= _rows) {
        throw new Error(`Trying to move row to an invalid position. Given: ${yTo}`);
    }
    return _flatten(_move(_grid, yFrom, yTo));
}

function _moveColumn(grid, columns, rows, xFrom, xTo) {
    if (xFrom < 0 || xFrom >= columns) {
        throw new Error(`Trying to move column from an invalid position. Given: ${xFrom}`);
    }
    if (xTo < 0 || xTo >= columns) {
        throw new Error(`Trying to move column to an invalid position. Given: ${xTo}`);
    }
    const newGrid = grid.map(row => _move(row, xFrom, xTo));
    return _flatten(newGrid);
}

function _addRowAt(grid, columns, rows, row, y) {
    if (y < 0 || y > rows) {
        throw new Error(`Trying to add row at an invalid position. Given: ${y}`);
    }
    if (row.length !== columns) {
        throw new Error(
            `Trying to add a row that contains an invalid amount of cells. Expected: ${columns}, Given: ${row.length}`
        );
    }
    grid.splice(y, 0, row);
    return grid;
}

function _addColumnAt(grid, columns, rows, column, x) {
    if (x < 0 || x > columns) {
        throw new Error(`Trying to add column at an invalid position. Given: ${x}`);
    }
    if (column.length !== rows) {
        throw new Error(
            `Trying to add a column that contains an invalid amount of cells. Expected: ${rows}, Given: ${column.length}`
        );
    }
    return grid.map((row, i) => {
        row.splice(x, 0, column[i]);
        return row;
    });
}

function _removeRowAt(grid, rows, y) {
    if (y < 0 || y >= rows) {
        throw new Error(`Trying to remove a row at an invalid position. Given: ${y}`);
    }
    if (rows <= 1) {
        throw new Error('Cannot remove row because the grid would be empty after it.');
    }
    grid.splice(y, 1);
    return grid;
}

function _removeColumnAt(grid, columns, x) {
    if (x < 0 || x >= columns) {
        throw new Error(`Trying to remove a column at an invalid position. Given: ${x}`);
    }
    if (columns <= 1) {
        throw new Error('Cannot remove column because the grid would be empty after it.');
    }
    return grid.map(row => row.filter((v, c) => c !== x));
}

function _clip(grid, _columns, _rows, position, size) {
    if (position[0] < 0 || position[0] >= _columns || position[1] < 0 || position[1] >= _rows) {
        throw new Error(`Trying to clip data at an invalid position. Given: ${position}`);
    }
    const endPoint = _addPositions(position, size);
    return grid
        .filter((row, r) => r >= position[1] && r < endPoint[1])
        .map(row => row.filter((cell, c) => c >= position[0] && c < endPoint[0]));
}

function _swapCells(api, pos1, pos2) {
    const size = api.size();
    if (_isNotInArea(size, pos1) || _isNotInArea(size, pos2)) {
        throw new Error('Trying to swap cells with an invalid position.');
    }
    const tmp = api.getValueAt(pos1);
    api.setValueAt(pos1, api.getValueAt(pos2));
    api.setValueAt(pos2, tmp);
    return api;
}

function _swapRows(grid, rows, y1, y2) {
    if (y1 < 0 || y1 >= rows) {
        throw new Error(`Trying to swap rows from an invalid position. Given: ${y1}`);
    }
    if (y2 < 0 || y2 >= rows) {
        throw new Error(`Trying to swap rows to an invalid position. Given: ${y2}`);
    }
    _swap(grid, y1, y2);
    return _flatten(grid);
}

function _swapColumns(grid, columns, x1, x2) {
    if (x1 < 0 || x1 >= columns) {
        throw new Error(`Trying to swap columns from an invalid position. Given: ${x1}`);
    }
    if (x2 < 0 || x2 >= columns) {
        throw new Error(`Trying to swap columns to an invalid position. Given: ${x2}`);
    }
    grid.map(row => {
        _swap(row, x1, x2);
        return row;
    });
    return _flatten(grid);
}

/**
 * The gridl base function.
 *
 * @param {Array} data
 * @returns {{ toArray1D, toArray2D, index2pos, pos2index, rows, columns }}
 */
function gridl(data) {

    _isValidGridArray(data);

    let _rows = data.length;
    let _columns = data[0].length;
    let _data = _flatten(data);

    const api = {};

    // getter for dimensions
    api.columns = () => _columns;
    api.rows = () => _rows;
    api.size = () => [_columns, _rows];

    // single value operations
    api.getValueAt = pos => _getValueAt(_data, _columns, pos);                                                          // TODO: merge with getRelativeValue
    api.setValueAt = (pos, value) => _setValueAt(api, _data, _columns, pos, value);                                     // TODO: provide optional relative offset (direction)
    api.getRelativeValue = (pos, direction) => api.getValueAt(api.getRelativePosition(pos, direction));                 // TODO: merge this functionality into getValueAt() with an optional parameter "direction" that defaults to [0,0]
    api.getRelativePosition = (pos, direction) => _getRelativePosition(_columns, _rows, pos, direction);                // TODO: rename to "getPositionFrom"

    // moving cells
    api.moveCell = (from, to) => _moveCell(api, _data, _columns, _rows, from, to);
    api.moveCellFrom = (position, direction) => api.moveCell(position, _addPositions(position, direction));
    api.moveRow = (yFrom, yTo) => {
        _data = _moveRow(api.getData(), _columns, _rows, yFrom, yTo);
        return api;
    };
    api.moveColumn = (xFrom, xTo) => {
        _data = _moveColumn(api.getData(), _columns, _rows, xFrom, xTo);
        return api;
    };

    // adding columns and rows
    api.addRowAt = (row, y) => {
        const grid = _addRowAt(api.getData(), _columns, _rows, row, y);
        _data = _flatten(grid);
        _rows = grid.length;
        return api;
    };
    api.addColumnAt = (column, x) => {
        const grid = _addColumnAt(api.getData(), _columns, _rows, column, x);
        _data = _flatten(grid);
        _columns = grid[0].length;
        return api;
    };
    api.removeRowAt = y => {
        const grid = _removeRowAt(api.getData(), _rows, y);
        _data = _flatten(grid);
        _rows = grid.length;
        return api;
    };
    api.removeColumnAt = x => {
        const grid = _removeColumnAt(api.getData(), _columns, x);
        _data = _flatten(grid);
        _columns = grid[0].length;
        return api;
    };

    // clipping
    api.clip = (position, size) => {
        const grid = _clip(api.getData(), _columns, _rows, position, size);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return api;
    };
    api.extract = (position, size) => _clip(api.getData(), _columns, _rows, position, size);

    // swapping
    api.swapCells = (pos1, pos2) => _swapCells(api, pos1, pos2);
    api.swapRows = (y1, y2) => {
        _data = _swapRows(api.getData(), _rows, y1, y2);
        return api;
    };
    api.swapColumns = (x1, x2) => {
        _data = _swapColumns(api.getData(), _columns, x1, x2);
        return api;
    };

    // area operations
    api.setAreaAt = (pos, area) => _setAreaAt(api, _columns, _rows, pos, area);
    api.getAreaAt = (pos, size) => _getAreaAt(api, _columns, _rows, pos, size);
    api.checkAreaFitsAt = (pos, area) => _checkAreaFitsAt(_columns, _rows, pos, area);

    // finding
    api.findPosition = callback => _findPosition(_columns, _data, callback);
    api.findPositionInArea = (pos, size, callback) => _findPositionInArea(api, _columns, pos, size, callback);

    // exporting data
    api.getData = () => _toArray2D(_data, _columns);

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
    return Array.from({ length: parsedRows }, (vr, row) => (
        Array.from({ length: parsedColumns }, (vc, column) => (
            callback({ column, row })
        ))
    ));
};

gridl.generate = (columns, rows, callback) => gridl(gridl.generateData(columns, rows, callback));

export default gridl;
