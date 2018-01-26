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

const _getColumn = (data, x) => {
    if (x >= 0 && x < data[0].length) {
        return data.map(row => row[x]);
    }
};

const _getRow = (data, y) => data[y];

const _addPositions = (p1, p2) => [
    p1[0] + p2[0],
    p1[1] + p2[1],
];

const _subtractPositions = (p1, p2) => [
    p1[0] - p2[0],
    p1[1] - p2[1],
];

const _limit = (v, min, max) => Math.max(Math.min(v, max), min);

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

function _setAreaAt(api, columns, rows, position, area, anchor = [0,0]) {
    const pos = _subtractPositions(position, anchor);
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

function _getAreaAt(api, columns, rows, position, size, anchor = [0,0]) {
    const posTmp = _subtractPositions(position, anchor);
    const end = [
        Math.min(posTmp[0] + size[0], columns),
        Math.min(posTmp[1] + size[1], rows),
    ];
    const pos = [
        Math.max(0, posTmp[0]),
        Math.max(0, posTmp[1]),
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

function _find(columns, data, callback) {
    const index = data.findIndex(callback);
    return (index >= 0) ? _index2pos(index, columns) : undefined;
}

function _findInArea(api, columns, pos, size, callback) {
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

function _checkAreaFitsAt(columns, rows, position, area, anchor = [0,0]) {
    const pos = _subtractPositions(position, anchor);
    const fitsHorizontally = pos[0] >= 0 && pos[0] + area[0].length <= columns;
    const fitsVertically = pos[1] >= 0 && pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
}

function _getRelativePosition(columns, rows, startPos, direction) {
    const targetPos = _addPositions(startPos, direction);
    if (_isNotInArea([columns, rows], targetPos)) {
        return;
    }
    return targetPos;
}

function _goto(columns, rows, position) {
    if (!Array.isArray(position)) {
        throw new Error(`Trying to go to an invalid position. Given: ${position}`);
    }
    if (_isNotInArea([columns, rows], position)) {
        throw new Error(`Trying to go to an invalid position. Given: ${position}`);
    }
    return position;
}

function _walk(columns, rows, startPos, direction) {
    const targetPos = _addPositions(startPos, direction);
    if (_isNotInArea([columns, rows], targetPos)) {
        throw new Error(`Trying to walk to an invalid position. Position: ${targetPos}`);
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

function _rotate(grid, columns, steps) {
    const mod = steps % 4;
    const option = mod < 0 ? mod + 4 : mod;
    switch (option) {
        case 0:
            return grid;
        case 1:
            return Array.from({ length: columns }, (v, i) => _getColumn(grid, i).reverse());
        case 2:
            return grid.reverse().map((row, r) => row.reverse());
        case 3:
            return Array.from({ length: columns }, (v, i) => _getColumn(grid, columns - 1 - i));
        default:
            throw new Error(`Trying to rotate the grid with an invalid steps parameter. Given: ${steps}`);
    }
}

function _mirror(arr, index) {
    if (index === undefined) {
        return arr.reverse();
    }
    const limitedIdx = _limit(index, 0, arr.length - 1);
    const left = arr.filter((v, i) => i < limitedIdx);
    const right = arr.filter((v, i) => i > limitedIdx);
    return [
        ...right.reverse(),
        arr[limitedIdx],
        ...left.reverse(),
    ];
}

function _clone(data, position) {
    return gridl(data).goto(position);
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
    let _position = [0,0];

    const api = {};

    // getter for dimensions
    api.columns = () => _columns;
    api.rows = () => _rows;
    api.size = () => [_columns, _rows];

    // single value operations
    api.getValue = () => _getValueAt(_data, _columns, _position);
    api.getValueAt = pos => _getValueAt(_data, _columns, pos);
    api.setValue = value => _setValueAt(api, _data, _columns, _position, value);
    api.setValueAt = (pos, value) => _setValueAt(api, _data, _columns, pos, value);
    api.getRelativeValue = (pos, direction) => api.getValueAt(api.getRelativePosition(pos, direction));  // TODO: scrap it - replaced by navigation api
    api.getRelativePosition = (pos, direction) => _getRelativePosition(_columns, _rows, pos, direction); // TODO: scrap it - replaced by navigation api

    // moving cells
    api.moveCell = (from, to) => _moveCell(api, _data, _columns, _rows, from, to);
    api.moveAbs = to => _moveCell(api, _data, _columns, _rows, _position, to);
    api.moveCellFrom = (position, direction) => api.moveCell(position, _addPositions(position, direction));
    api.moveRel = direction => api.moveCell(_position, _addPositions(_position, direction));
    api.moveRow = (yFrom, yTo) => {
        _data = _moveRow(api.getData(), _columns, _rows, yFrom, yTo);
        return api;
    };
    api.moveColumn = (xFrom, xTo) => {
        _data = _moveColumn(api.getData(), _columns, _rows, xFrom, xTo);
        return api;
    };

    // columns and rows
    api.getColumn = x => _getColumn(api.getData(), x);
    api.getRow = y => _getRow(api.getData(), y);
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
    api.clipAt = (position, size) => {
        const grid = _clip(api.getData(), _columns, _rows, position, size);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return api;
    };
    api.clip = size => api.clipAt(_position, size);

    // swapping
    api.swapCells = (pos1, pos2) => _swapCells(api, pos1, pos2);
    api.swapCell = pos => _swapCells(api, _position, pos);
    api.swapRows = (y1, y2) => {
        _data = _swapRows(api.getData(), _rows, y1, y2);
        return api;
    };
    api.swapColumns = (x1, x2) => {
        _data = _swapColumns(api.getData(), _columns, x1, x2);
        return api;
    };

    // area operations
    api.setAreaAt = (pos, area, anchor) => _setAreaAt(api, _columns, _rows, pos, area, anchor);
    api.setArea = (area, anchor) => _setAreaAt(api, _columns, _rows, _position, area, anchor);
    api.getAreaAt = (pos, size, anchor) => _getAreaAt(api, _columns, _rows, pos, size, anchor);
    api.getArea = (size, anchor) => _getAreaAt(api, _columns, _rows, _position, size, anchor);
    api.checkAreaFitsAt = (pos, area, anchor) => _checkAreaFitsAt(_columns, _rows, pos, area, anchor);
    api.checkAreaFits = (area, anchor) => _checkAreaFitsAt(_columns, _rows, _position, area, anchor);

    // finding
    api.find = callback => _find(_columns, _data, callback);
    api.findInArea = (pos, size, callback) => _findInArea(api, _columns, pos, size, callback);

    // exporting data
    api.getData = () => _toArray2D(_data, _columns);

    // rotating
    api.rotate = steps => {
        const grid = _rotate(api.getData(), _columns, steps);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return api;
    };

    // mirroring
    api.mirrorX = xPos => {
        _data = _flatten(_mirror(api.getData(), xPos));
        return api;
    };
    api.mirrorY = yPos => {
        const grid = api.getData();
        _data = _flatten(grid.map(row => _mirror(row, yPos)));
        return api;
    };

    // navigating
    api.goto = position => {
        const pos = _goto(_columns, _rows, position);
        _position[0] = pos[0];
        _position[1] = pos[1];
        return api;
    };
    api.position = () => [
        _position[0],
        _position[1],
    ];
    api.walk = direction => {
        const pos = _walk(_columns, _rows, _position, direction);
        _position[0] = pos[0];
        _position[1] = pos[1];
        return api;
    };

    // iterators
    api.map = callback => {
        const newData = _data.map((v, i) => callback(v, _index2pos(i, _columns), api));
        return gridl(_toArray2D(newData, _columns));
    };
    api.forEach = callback => {
        _data.forEach((v, i) => callback(v, _index2pos(i, _columns), api));
        return api;
    };

    // cloning
    api.clone = () => gridl(_toArray2D(_data, _columns)).goto(_position);

    return api;

}

gridl.directions = Object.freeze({
    UP:          [ 0, -1],
    UP_RIGHT:    [ 1, -1],
    RIGHT:        [ 1,  0],
    DOWN_RIGHT: [ 1,  1],
    DOWN:       [ 0,  1],
    DOWN_LEFT:  [-1,  1],
    LEFT:         [-1,  0],
    UP_LEFT:     [-1, -1],
});

gridl.generateData = (columns, rows, callback = () => null) => {
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
