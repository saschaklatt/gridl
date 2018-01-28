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

const _index2pos = (index, columns) => [index % columns, Math.floor(index / columns)];

const _pos2index = (position, columns) => position && position[0] + position[1] * columns;

const _toArray2D = (array1D, columns) => array1D.reduce((res, cell, index) => {
    const pos = _index2pos(index, columns);
    if (!res[pos[1]]) {
        res[pos[1]] = [];
    }
    res[pos[1]][pos[0]] = cell;
    return res;
}, []);

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

function _setValueAt(api, _data, columns, rows, pos, value) {
    if (_isNotInArea([columns, rows], pos)) {
        return api;
    }
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
            area[rArea][cArea] = api.valueAt([c, r]);
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
    const areaIndex = flat.findIndex((v, i) => callback(v, _index2pos(i, columns), api));
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

function _goto(columns, rows, position) {
    if (!Array.isArray(position)) {
        throw new Error(`Trying to go to an invalid position. Given: ${position}`);
    }
    // if (_isNotInArea([columns, rows], position)) {
    //     throw new Error(`Trying to go to an invalid position. Given: ${position}`);
    // }
    return position;
}

function _walk(columns, rows, startPos, direction) {
    const targetPos = _addPositions(startPos, direction);
    if (_isNotInArea([columns, rows], targetPos)) {
        throw new Error(`Trying to walk to an invalid position. Position: ${targetPos}`);
    }
    return targetPos;
}

function _moveCell(data, columns, rows, from, to) {
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
    const tmp = api.valueAt(pos1);
    api.setValueAt(pos1, api.valueAt(pos2));
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

function _adjacentCells(api, _columns, _rows, position, adjacence = adjacences.ALL) {
    const gridSize = [_columns, _rows];
    return adjacence.reduce((res, direction) => {
        const absPos = _addPositions(position, direction);
        return _isNotInArea(gridSize, absPos) ? res : [...res, api.valueAt(absPos)];
    }, []);
}

/**
 * Generates a new gridl instance.
 *
 * @constructor
 * @param {Array} data - A two-dimsensional grid array. Every row needs to have the same length.
 * @returns {gridl} The new gridl instance.
 */
function gridl(data) {

    /**
     * @callback iteratorCallback
     * @param {any} cell - The current cell.
     * @param {Array.<number>} position - The current position.
     * @param {gridl} gridlInstance - The current gridl instance.
     */

    _isValidGridArray(data);

    let _rows = data.length;
    let _columns = data[0].length;
    let _data = _flatten(data);
    let _position = [0,0];

    /**
     * get the number of columns.
     */
    this.numColumns = () => _columns;

    /**
     * Get the number of rows.
     * @returns {number}
     */
    this.numRows = () => _rows;

    /**
     * Get the current size of the grid.
     *
     * @returns {number[]}
     */
    this.size = () => [_columns, _rows];

    /**
     * Set the value at the current position. You can also set the cell to <code>undefined</code>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {any} value - The value the cell should have.
     */
    this.setValue = value => _setValueAt(this, _data, _columns, _rows, _position, value);

    /**
     * Get or set the value at the current position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.<br>
     * To explicitly set the value to <code>undefined</code> use [setValue()]{@link gridl#setValue}.
     *
     * @param {any} value - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {any} The cell's value or the gridl instance if you use it as a setter.
     */
    this.value = value => value === undefined ? _getValueAt(_data, _columns, _position) : _setValueAt(this, _data, _columns, _rows, _position, value);

    /**
     * Set the value at a certain position. You can also set the cell to <code>undefined</code>
     *
     * @param {Array.<number>} pos - The position where you want to set the value.
     * @param {any} value - The value you want to set.
     * @returns {gridl} The same gridl instance.
     */
    this.setValueAt = (pos, value) => _setValueAt(this, _data, _columns, _rows, pos, value);

    /**
     * Get or set the value at a certain position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.<br>
     * To explicitly set the value to <code>undefined</code> use [setValueAt()]{@link gridl#setValueAt}.
     *
     * @param {Array.<number>} pos - The position where you want to set or get the value.
     * @param {any} value - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {any} The cell's value or the the same gridl instance if you use it as a setter.
     */
    this.valueAt = (pos, value) => value === undefined ? _getValueAt(_data, _columns, pos) : _setValueAt(this, _data, _columns, _rows, pos, value);

    /**
     * Move a cell from one position to another.
     *
     * @param {Array} from - The position of the cell that you want to move.
     * @param {Array} to - The position where the cell should be moved.
     * @returns {gridl} - The current gridl instance.
     */
    this.moveCell = (from, to) => {
        _moveCell(_data, _columns, _rows, from, to);
        return this;
    };

    /**
     * Move the current cell to an absolute position.
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array} to - The position where the cell should be moved.
     * @returns {gridl}
     */
    this.moveAbs = to => {
        _moveCell(_data, _columns, _rows, _position, to);
        return this;
    };

    /**
     * Move the current cell from the current position in a certain direction.
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array} direction - The direction in which to move from the current position.
     * @returns {gridl} The current gridl instance.
     */
    this.moveRel = direction => this.moveCell(_position, _addPositions(_position, direction));

    /**
     * Move a row to a certain position.
     *
     * @param {number} yFrom - The position on the y-axis of the row you want to move.
     * @param {number} yTo - The position on the y-axis of where the row should be moved to.
     * @returns {gridl} The current gridl instance.
     */
    this.moveRow = (yFrom, yTo) => {
        _data = _moveRow(this.data(), _columns, _rows, yFrom, yTo);
        return this;
    };

    /**
     * Move a column to a certain position.
     *
     * @param {number} xFrom - The position on the x-axis of the column you want to move.
     * @param {number} xTo - The position on the x-axis of where the column should be moved.
     * @returns {gridl}
     */
    this.moveColumn = (xFrom, xTo) => {
        _data = _moveColumn(this.data(), _columns, _rows, xFrom, xTo);
        return this;
    };

    /**
     * Get the column at a certain x-position
     *
     * @param {number} x - The x-position of the column you want to get.
     * @returns {Array.<any>}
     */
    this.column = x => _getColumn(this.data(), x);

    /**
     * Get the row at a certain y-position
     *
     * @param {number} y - The y-position of the row you want to get.
     * @returns {Array.<any>}
     */
    this.row = y => _getRow(this.data(), y);

    /**
     * Add a row at a certain y-position. This changes the size of the grid.
     *
     * @param {Array.<any>} row - The row you want to add as an one-dimensional array.
     * @param {number} y - The y-position of where you want to add the row.
     * @returns {gridl} The same gridl instance.
     */
    this.addRow = (row, y) => {
        const grid = _addRowAt(this.data(), _columns, _rows, row, y);
        _data = _flatten(grid);
        _rows = grid.length;
        return this;
    };

    /**
     * Add a column at a certain x-position. This changes the size of the grid.
     *
     * @param {Array.<any>} column - The column you want to add as an one-dimensional array.
     * @param {number} x - The x-position of where you want to add the column.
     * @returns {gridl} The same gridl instance.
     */
    this.addColumn = (column, x) => {
        const grid = _addColumnAt(this.data(), _columns, _rows, column, x);
        _data = _flatten(grid);
        _columns = grid[0].length;
        return this;
    };

    /**
     * Remove a row at a certain y-position. This changes the size of the grid.
     *
     * @param {number} y - The y-position of the row you want to remove.
     * @returns {gridl} The same gridl instance.
     */
    this.removeRow = y => {
        const grid = _removeRowAt(this.data(), _rows, y);
        _data = _flatten(grid);
        _rows = grid.length;
        return this;
    };

    /**
     * Remove a column at a certain x-position. This changes the size of the grid.
     *
     * @param {number} x - The x-position of the column you want to remove.
     * @returns {gridl} The same gridl instance.
     */
    this.removeColumn = x => {
        const grid = _removeColumnAt(this.data(), _columns, x);
        _data = _flatten(grid);
        _columns = grid[0].length;
        return this;
    };

    /**
     * Clip an area out of the current grid. It removes all cells that are not inside the given area.
     *
     * @param {Array.<number>} position - The position the area.
     * @param {Array.<number>} size - The size of the area.
     * @returns {gridl} The same gridl instance.
     */
    this.clipAt = (position, size) => {
        const grid = _clip(this.data(), _columns, _rows, position, size);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return this;
    };

    /**
     * Clip an area out of the current grid at the current position. It removes all cells that are not inside the given area.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array.<number>} size - The size of the area.
     * @returns {gridl} The same gridl instance.
     */
    this.clip = size => this.clipAt(_position, size);

    /**
     * Swap the values of two cells.
     *
     * @param {Array.<number>} position1 - The position of the first cell.
     * @param {Array.<number>} position2 - The position of the second cell.
     * @returns {gridl} The same gridl instance.
     */
    this.swapCells = (position1, position2) => _swapCells(this, position1, position2);

    /**
     * Swaps the values of the cell at the current position and another cell.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array.<number>} position - The position of the first cell.
     * @returns {gridl} The same gridl instance.
     */
    this.swapCell = position => _swapCells(this, _position, position);

    /**
     * Swaps the values of two rows.
     *
     * @param {Array.<number>} y1 - The y-position of the first row.
     * @param {Array.<number>} y2 - The y-position of the second row.
     * @returns {gridl} The same gridl instance.
     */
    this.swapRows = (y1, y2) => {
        _data = _swapRows(this.data(), _rows, y1, y2);
        return this;
    };

    /**
     * Swaps the values of two columns.
     *
     * @param {Array.<number>} x1 - The x-position of the first column.
     * @param {Array.<number>} x2 - The x-position of the second column.
     * @returns {gridl} The same gridl instance.
     */
    this.swapColumns = (x1, x2) => {
        _data = _swapColumns(this.data(), _columns, x1, x2);
        return this;
    };

    /**
     * Overwrite the values of a given area at a certain position.
     *
     * @param {Array.<number>} position - The position of the area.
     * @param {Array.<number>} area - The area itself as two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {gridl} The same gridl instance.
     */
    this.setAreaAt = (position, area, anchor) => _setAreaAt(this, _columns, _rows, position, area, anchor);

    /**
     * Overwrite the values of a given area at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array.<number>} area - The area itself as two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {gridl} The same gridl instance.
     */
    this.setArea = (area, anchor) => _setAreaAt(this, _columns, _rows, _position, area, anchor);

    /**
     * Exports the data grid array of a given array at the given position.
     *
     * @param {Array.<number>} position - The position of the area.
     * @param {Array.<number>} size - The size fo the area as a two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {number[][]}
     */
    this.getAreaAt = (position, size, anchor) => _getAreaAt(this, _columns, _rows, position, size, anchor);

    /**
     * Exports the data grid array of a given array at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array.<number>} size - The size fo the area as a two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {number[][]}
     */
    this.getArea = (size, anchor) => _getAreaAt(this, _columns, _rows, _position, size, anchor);

    /**
     * Check if a given area would fit inside the grid at a given position.
     *
     * @param {number[]} position - The position where the area should be placed.
     * @param {any[][]} area - The area itself as a two-dimensional grid array
     * @param {number[]} [anchor = [0, 0]] - The center of area.
     * @returns {boolean} Whether the area fits or not.
     */
    this.areaFitsAt = (position, area, anchor) => _checkAreaFitsAt(_columns, _rows, position, area, anchor);

    /**
     * Check if a given area would fit inside the grid at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {any[][]} area - The area itself as a two-dimensional grid array
     * @param {number[]} [anchor = [0, 0]] - The center of area.
     * @returns {boolean} Whether the area fits or not.
     */
    this.areaFits = (area, anchor) => _checkAreaFitsAt(_columns, _rows, _position, area, anchor);

    /**
     * Find the first occurrence of an element within the entire grid.
     *
     * @param {iteratorCallback} callback - The callback function that is called on each element. Should return true if the element is found or false if not.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    this.find = callback => _find(_columns, _data, (v, i) => callback(v, _index2pos(i, _columns), this));

    /**
     * Find the first occurrence of an element within a certain area.
     *
     * @param {Array} position - The position of the area [x, y].
     * @param {Array} size - The size of the area [columns, rows].
     * @param {iteratorCallback} callback - The callback function that is called on each element within the defined area. Should return true if the element is found or false if not.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    this.findInArea = (position, size, callback) => _findInArea(this, _columns, position, size, callback);

    /**
     * Exports a copy of the internal data as two-dimensional array.
     *
     * @returns {any[][]} The data as two-dimensional array.
     */
    this.data = () => _toArray2D(_data, _columns);

    /**
     * Rotate the array in a 90 degree steps. A positive step turns it clockwise, a negative step turns it counterclockwise.
     *
     * @param {number} steps - The number of 90 degree turns as integer number.
     * @returns {gridl} The same gridl instance.
     */
    this.rotate = steps => {
        const grid = _rotate(this.data(), _columns, steps);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return this;
    };

    /**
     * Flips the array on the given x-position
     *
     * @param {number} xPos - The x-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    this.mirrorX = xPos => {
        _data = _flatten(_mirror(this.data(), xPos));
        return this;
    };

    /**
     * Flips the array on the given y-position.
     *
     * @param {number} yPos - The y-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    this.mirrorY = yPos => {
        const grid = this.data();
        _data = _flatten(grid.map(row => _mirror(row, yPos)));
        return this;
    };

    /**
     * Go to an absolute position.
     * The internal cursor will be set to this position and can then be used for further operations.
     *
     * @param {Array} position - The new position.
     * @returns {gridl}
     */
    this.goto = position => {
        const pos = _goto(_columns, _rows, position);
        _position[0] = pos[0];
        _position[1] = pos[1];
        return this;
    };

    /**
     * Walk in a given direction based on the current position.
     *
     * @param {Array} direction - The direction you want to go. (It's the position relative to the current position)
     * @returns {gridl} The same gridl instance.
     */
    this.walk = direction => {
        const pos = _walk(_columns, _rows, _position, direction);
        _position[0] = pos[0];
        _position[1] = pos[1];
        return this;
    };

    /**
     * Get the current position.
     *
     * @returns {Array} The current position array [column, row].
     */
    this.position = () => [
        _position[0],
        _position[1],
    ];

    /**
     * Map over all cells. It's the equivalent of Array.map just for the grid.
     *
     * @param {iteratorCallback} callback - The callback function that is called on each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
     * @returns {gridl} A new gridl instance.
     */
    this.map = callback => {
        const newData = _data.map((v, i) => callback(v, _index2pos(i, _columns), this));
        return new gridl(_toArray2D(newData, _columns));
    };

    /**
     * Iterate over all cells. It's the equivalent of Array.forEach just for the grid.
     *
     * @param {iteratorCallback} callback - The callback function is called for each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
     * @returns {gridl} The same gridl instance.
     */
    this.forEach = callback => {
        _data.forEach((v, i) => callback(v, _index2pos(i, _columns), this));
        return this;
    };

    /**
     * Make a clone of the current gridl instance.
     *
     * @returns {gridl} A new gridl instance.
     */
    this.clone = () => new gridl(_toArray2D(_data, _columns)).goto(_position);

    /**
     * Get the values of all adjacent cells at a given position.
     *
     * @param {number[]} position - The position of the cell of which you want to know its adjacent cells.
     * @param {number[][]} [adjacence = [adjacents.ALL]{@link adjacences}] - A list of positions relative to the given position. These positions are considered as the adjacents.
     * @returns {any[]} The values of the adjacent cells.
     */
    this.adjacentCellsAt = (position, adjacence = adjacences.ALL) => _adjacentCells(this, _columns, _rows, position, adjacence);

    /**
     * Get the values of all adjacent cells at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {number[][]} [adjacence = [adjacents.ALL]{@link adjacences}] - A list of positions relative to the given position. These positions are considered as the adjacents.
     * @returns {any[]} The values of the adjacent cells.
     */
    this.adjacentCells = (adjacence = adjacences.ALL) => _adjacentCells(this, _columns, _rows, _position, adjacence);

    return this;

}

/**
 * Predefined directions you can walk in.<br>
 * Use it in combination with [walk(direction)]{@link gridl#walk}.
 *
 * @type {Object}
 * @property {Array.<number>} UP - one step up
 * @property {Array.<number>} UP_LEFT - one step left, one step up
 * @property {Array.<number>} UP_RIGHT - one step right, one step up
 * @property {Array.<number>} RIGHT - one step right
 * @property {Array.<number>} LEFT - one step left
 * @property {Array.<number>} DOWN - one step down
 * @property {Array.<number>} DOWN_LEFT - one step left, one step down
 * @property {Array.<number>} DOWN_RIGHT - one step right, one step down
 */
export const directions = Object.freeze({
    UP:         [ 0, -1],
    UP_RIGHT:   [ 1, -1],
    RIGHT:      [ 1,  0],
    DOWN_RIGHT: [ 1,  1],
    DOWN:       [ 0,  1],
    DOWN_LEFT:  [-1,  1],
    LEFT:       [-1,  0],
    UP_LEFT:    [-1, -1],
});

/**
 * Predefined lists of adjacent positions relative to a certain position.
 *
 * @type {Object}
 * @property {number[][]} ALL - all direct adjacent positions (orthogonal + diagonal)
 * @property {number[][]} ORTHOGONAL - all orthogonal adjacent positions
 * @property {number[][]} DIAGONAL - all diagonal adjacent positions
 */
export const adjacences = Object.freeze({
    ALL: [
        directions.UP_LEFT,
        directions.UP,
        directions.UP_RIGHT,
        directions.LEFT,
        directions.RIGHT,
        directions.DOWN_LEFT,
        directions.DOWN,
        directions.DOWN_RIGHT,
    ],
    ORTHOGONAL: [
        directions.UP,
        directions.LEFT,
        directions.RIGHT,
        directions.DOWN,
    ],
    DIAGONAL: [
        directions.UP_LEFT,
        directions.UP_RIGHT,
        directions.DOWN_LEFT,
        directions.DOWN_RIGHT,
    ]
});

/**
 * Create a two dimensional grid array.
 *
 * @param {number} columns - The number of columns.
 * @param {number} rows - The number of rows.
 * @param {Function} callback - The generator function that is called on each cell.
 * @returns {any[][]} The new grid array.
 */
export function makeGrid(columns, rows, callback = () => null) {
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
}

/**
 * Generate a one-dimensional array that can be a single row or column.
 *
 * @param {number} length - The length of the array.
 * @param {Function} callback - The generator callback function that is called on each element.
 * @returns {any[]}
 */
export function makeList(length, callback = () => null) {
    const parsedLength = parseInt(length);
    if (parsedLength < 1 || isNaN(parsedLength)) {
        throw new Error(`Trying to make a list with an invalid length. Given: ${length}`);
    }
    return Array.from({ length: parsedLength }, (v, i) => callback(i));
}

/**
 * Generate a gridl instance from scratch by specifying the number of rows and columns and fill it with values.
 *
 * @param {number} numColumns - The number of columns.
 * @param {number} numRows - The number of rows.
 * @param {Function} callback - The generator function that is called for each cell. The returned value is going to be the value of the cell.
 * @returns {gridl} A new gridl instance
 */
export function make(numColumns, numRows, callback) {
    return new gridl(makeGrid(numColumns, numRows, callback));
}

/**
 * Creates a new gridl instance.<br>
 * <br>
 * This is exported as the default function. It serves as a wrapper around gridl so that you don't have to use the <code>`new`</code>
 * keyword each time. So instead of saying `<code>new gridl(data)</code>` you can just say `<code>gridl(data)</code>`.
 * That's the only reason for gridlFactory.<br>
 * <br>
 * Please don't care too much about the difference between gridl and gridlFactory. Just use it as `<code>gridl(data)</code>`.
 *
 * @constructor
 * @param {Array} data - A two dimensional grid array. Every row needs to have the same length.
 * @returns {gridl}
 */
const gridlFactory = data => new gridl(data);
gridlFactory.adjacences = adjacences;
gridlFactory.directions = directions;
gridlFactory.make = make;
gridlFactory.makeGrid = makeGrid;
gridlFactory.makeList = makeList;

export default gridlFactory;
