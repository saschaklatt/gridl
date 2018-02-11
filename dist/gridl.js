(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("gridl", [], factory);
	else if(typeof exports === 'object')
		exports["gridl"] = factory();
	else
		root["gridl"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeGrid = makeGrid;
exports.makeList = makeList;
exports.make = make;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _isValidGridArray(data) {
    if (!Array.isArray(data)) {
        throw new Error('Trying to import data that is not an array.');
    }
    data.forEach(function (row, i) {
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

var _index2pos = function _index2pos(index, columns) {
    return [index % columns, Math.floor(index / columns)];
};

var _pos2index = function _pos2index(position, columns) {
    return position && position[0] + position[1] * columns;
};

var _toArray2D = function _toArray2D(array1D, columns) {
    return array1D.reduce(function (res, cell, index) {
        var pos = _index2pos(index, columns);
        if (!res[pos[1]]) {
            res[pos[1]] = [];
        }
        res[pos[1]][pos[0]] = cell;
        return res;
    }, []);
};

var _flatten = function _flatten(array2D) {
    return array2D.reduce(function (res, row) {
        return [].concat(_toConsumableArray(res), _toConsumableArray(row));
    }, []);
};

var _getColumn = function _getColumn(data, x) {
    if (x >= 0 && x < data[0].length) {
        return data.map(function (row) {
            return row[x];
        });
    }
};

var _getRow = function _getRow(data, y) {
    return data[y];
};

var _addPositions = function _addPositions(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
};

var _subtractPositions = function _subtractPositions(p1, p2) {
    return [p1[0] - p2[0], p1[1] - p2[1]];
};

var _limit = function _limit(v, min, max) {
    return Math.max(Math.min(v, max), min);
};

var _swap = function _swap(arr, i1, i2) {
    var tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
};

var _move = function _move(data, fromIndex, toIndex) {
    var cell = data[fromIndex];
    data.splice(fromIndex, 1);
    data.splice(toIndex, 0, cell);
    return data;
};

var _isNotInArea = function _isNotInArea(areaSize, position) {
    return position[0] < 0 || position[0] >= areaSize[0] || position[1] < 0 || position[1] >= areaSize[1];
};

function _getValueAt(_data, columns, pos) {
    var index = _pos2index(pos, columns);
    if (isNaN(index)) {
        return;
    }
    return _data[index];
}

function _setValueAt(api, _data, columns, rows, pos, value) {
    if (_isNotInArea([columns, rows], pos)) {
        return api;
    }
    var index = _pos2index(pos, columns);
    if (!isNaN(index)) {
        _data[index] = value;
    }
    return api;
}

function _setAreaAt(api, columns, rows, position, area) {
    var anchor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [0, 0];

    var pos = _subtractPositions(position, anchor);
    area.forEach(function (row, r) {
        var targetPos = [0, r + pos[1]];
        if (targetPos[1] >= rows) {
            return;
        }
        row.forEach(function (cell, c) {
            targetPos[0] = c + pos[0];
            if (targetPos[0] >= columns) {
                return;
            }
            api.setValueAt(targetPos, cell);
        });
    });
    return api;
}

function _getAreaAt(api, columns, rows, position, size) {
    var anchor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [0, 0];

    var posTmp = _subtractPositions(position, anchor);
    var end = [Math.min(posTmp[0] + size[0], columns), Math.min(posTmp[1] + size[1], rows)];
    var pos = [Math.max(0, posTmp[0]), Math.max(0, posTmp[1])];
    var area = [];
    for (var r = pos[1]; r < end[1]; r++) {
        var rArea = r - pos[1];
        if (!area[rArea]) {
            area[rArea] = [];
        }
        for (var c = pos[0]; c < end[0]; c++) {
            var cArea = c - pos[0];
            area[rArea][cArea] = api.valueAt([c, r]);
        }
    }
    return area;
}

function _find(columns, data, callback) {
    var index = data.findIndex(callback);
    return index >= 0 ? _index2pos(index, columns) : undefined;
}

function _findInArea(api, columns, pos, size, callback) {
    var area = api.getAreaAt(pos, size);
    var flat = _flatten(area);
    var areaIndex = flat.findIndex(function (v, i) {
        return callback(v, _index2pos(i, columns), api);
    });
    if (areaIndex >= 0) {
        var areaColumns = area[0].length;
        var posInArea = _index2pos(areaIndex, areaColumns);
        return [pos[0] + posInArea[0], pos[1] + posInArea[1]];
    }
}

function _checkAreaFitsAt(columns, rows, position, area) {
    var anchor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [0, 0];

    var pos = _subtractPositions(position, anchor);
    var fitsHorizontally = pos[0] >= 0 && pos[0] + area[0].length <= columns;
    var fitsVertically = pos[1] >= 0 && pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
}

function _goto(columns, rows, position) {
    if (!Array.isArray(position)) {
        throw new Error('Trying to go to an invalid position. Given: ' + position);
    }
    // if (_isNotInArea([columns, rows], position)) {
    //     throw new Error(`Trying to go to an invalid position. Given: ${position}`);
    // }
    return position;
}

function _walk(columns, rows, startPos, direction) {
    var targetPos = _addPositions(startPos, direction);
    if (_isNotInArea([columns, rows], targetPos)) {
        throw new Error('Trying to walk to an invalid position. Position: ' + targetPos);
    }
    return targetPos;
}

function _moveCell(data, columns, rows, from, to) {
    var fromIndex = _pos2index(from, columns);
    var size = [columns, rows];
    if (isNaN(fromIndex) || _isNotInArea(size, from)) {
        throw new Error('Trying to move cell from an invalid position. Given: [' + from + ']');
    }
    var toIndex = _pos2index(to, columns);
    if (isNaN(toIndex) || _isNotInArea(size, to)) {
        throw new Error('Trying to move cell to an invalid position. Given: [' + to + ']');
    }
    _move(data, fromIndex, toIndex);
}

function _moveRow(_grid, _columns, _rows, yFrom, yTo) {
    if (yFrom < 0 || yFrom >= _rows) {
        throw new Error('Trying to move row from an invalid position. Given: ' + yFrom);
    }
    if (yTo < 0 || yTo >= _rows) {
        throw new Error('Trying to move row to an invalid position. Given: ' + yTo);
    }
    return _flatten(_move(_grid, yFrom, yTo));
}

function _moveColumn(grid, columns, rows, xFrom, xTo) {
    if (xFrom < 0 || xFrom >= columns) {
        throw new Error('Trying to move column from an invalid position. Given: ' + xFrom);
    }
    if (xTo < 0 || xTo >= columns) {
        throw new Error('Trying to move column to an invalid position. Given: ' + xTo);
    }
    var newGrid = grid.map(function (row) {
        return _move(row, xFrom, xTo);
    });
    return _flatten(newGrid);
}

function _addRowAt(grid, columns, rows, row, y) {
    if (y < 0 || y > rows) {
        throw new Error('Trying to add row at an invalid position. Given: ' + y);
    }
    if (row.length !== columns) {
        throw new Error('Trying to add a row that contains an invalid amount of cells. Expected: ' + columns + ', Given: ' + row.length);
    }
    grid.splice(y, 0, row);
    return grid;
}

function _addColumnAt(grid, columns, rows, column, x) {
    if (x < 0 || x > columns) {
        throw new Error('Trying to add column at an invalid position. Given: ' + x);
    }
    if (column.length !== rows) {
        throw new Error('Trying to add a column that contains an invalid amount of cells. Expected: ' + rows + ', Given: ' + column.length);
    }
    return grid.map(function (row, i) {
        row.splice(x, 0, column[i]);
        return row;
    });
}

function _removeRowAt(grid, rows, y) {
    if (y < 0 || y >= rows) {
        throw new Error('Trying to remove a row at an invalid position. Given: ' + y);
    }
    if (rows <= 1) {
        throw new Error('Cannot remove row because the grid would be empty after it.');
    }
    grid.splice(y, 1);
    return grid;
}

function _removeColumnAt(grid, columns, x) {
    if (x < 0 || x >= columns) {
        throw new Error('Trying to remove a column at an invalid position. Given: ' + x);
    }
    if (columns <= 1) {
        throw new Error('Cannot remove column because the grid would be empty after it.');
    }
    return grid.map(function (row) {
        return row.filter(function (v, c) {
            return c !== x;
        });
    });
}

function _clip(grid, _columns, _rows, position, size) {
    if (position[0] < 0 || position[0] >= _columns || position[1] < 0 || position[1] >= _rows) {
        throw new Error('Trying to clip data at an invalid position. Given: ' + position);
    }
    var endPoint = _addPositions(position, size);
    return grid.filter(function (row, r) {
        return r >= position[1] && r < endPoint[1];
    }).map(function (row) {
        return row.filter(function (cell, c) {
            return c >= position[0] && c < endPoint[0];
        });
    });
}

function _swapCells(api, pos1, pos2) {
    var size = api.size();
    if (_isNotInArea(size, pos1) || _isNotInArea(size, pos2)) {
        throw new Error('Trying to swap cells with an invalid position.');
    }
    var tmp = api.valueAt(pos1);
    api.setValueAt(pos1, api.valueAt(pos2));
    api.setValueAt(pos2, tmp);
    return api;
}

function _swapRows(grid, rows, y1, y2) {
    if (y1 < 0 || y1 >= rows) {
        throw new Error('Trying to swap rows from an invalid position. Given: ' + y1);
    }
    if (y2 < 0 || y2 >= rows) {
        throw new Error('Trying to swap rows to an invalid position. Given: ' + y2);
    }
    _swap(grid, y1, y2);
    return _flatten(grid);
}

function _swapColumns(grid, columns, x1, x2) {
    if (x1 < 0 || x1 >= columns) {
        throw new Error('Trying to swap columns from an invalid position. Given: ' + x1);
    }
    if (x2 < 0 || x2 >= columns) {
        throw new Error('Trying to swap columns to an invalid position. Given: ' + x2);
    }
    grid.map(function (row) {
        _swap(row, x1, x2);
        return row;
    });
    return _flatten(grid);
}

function _rotate(grid, columns, steps) {
    var mod = steps % 4;
    var option = mod < 0 ? mod + 4 : mod;
    switch (option) {
        case 0:
            return grid;
        case 1:
            return Array.from({ length: columns }, function (v, i) {
                return _getColumn(grid, i).reverse();
            });
        case 2:
            return grid.reverse().map(function (row, r) {
                return row.reverse();
            });
        case 3:
            return Array.from({ length: columns }, function (v, i) {
                return _getColumn(grid, columns - 1 - i);
            });
        default:
            throw new Error('Trying to rotate the grid with an invalid steps parameter. Given: ' + steps);
    }
}

function _mirror(arr, index) {
    if (index === undefined) {
        return arr.reverse();
    }
    var limitedIdx = _limit(index, 0, arr.length - 1);
    var left = arr.filter(function (v, i) {
        return i < limitedIdx;
    });
    var right = arr.filter(function (v, i) {
        return i > limitedIdx;
    });
    return [].concat(_toConsumableArray(right.reverse()), [arr[limitedIdx]], _toConsumableArray(left.reverse()));
}

function _adjacentCells(grid, position, adjacence) {
    var gridSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    return adjacence.reduce(function (res, direction) {
        var absPos = _addPositions(position, direction);
        var value = grid && grid[absPos[1]] && grid[absPos[1]][absPos[0]];
        if (gridSize) {
            return _isNotInArea(gridSize, absPos) ? res : [].concat(_toConsumableArray(res), [value]);
        } else {
            return [].concat(_toConsumableArray(res), [value]);
        }
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
    var _this = this;

    /**
     * @callback iteratorCallback
     * @param {any} cell - The current cell.
     * @param {Array.<number>} position - The current position.
     * @param {gridl} gridlInstance - The current gridl instance.
     */

    _isValidGridArray(data);

    var _rows = data.length;
    var _columns = data[0].length;
    var _data = _flatten(data);
    var _position = [0, 0];

    /**
     * get the number of columns.
     */
    this.numColumns = function () {
        return _columns;
    };

    /**
     * Get the number of rows.
     * @returns {number}
     */
    this.numRows = function () {
        return _rows;
    };

    /**
     * Get the current size of the grid.
     *
     * @returns {number[]}
     */
    this.size = function () {
        return [_columns, _rows];
    };

    /**
     * Set the value at the current position. You can also set the cell to <code>undefined</code>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {any} value - The value the cell should have.
     */
    this.setValue = function (value) {
        return _setValueAt(_this, _data, _columns, _rows, _position, value);
    };

    /**
     * Get or set the value at the current position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.<br>
     * To explicitly set the value to <code>undefined</code> use [setValue()]{@link gridl#setValue}.
     *
     * @param {any} value - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {any} The cell's value or the gridl instance if you use it as a setter.
     */
    this.value = function (value) {
        return value === undefined ? _getValueAt(_data, _columns, _position) : _setValueAt(_this, _data, _columns, _rows, _position, value);
    };

    /**
     * Set the value at a certain position. You can also set the cell to <code>undefined</code>
     *
     * @param {Array.<number>} pos - The position where you want to set the value.
     * @param {any} value - The value you want to set.
     * @returns {gridl} The same gridl instance.
     */
    this.setValueAt = function (pos, value) {
        return _setValueAt(_this, _data, _columns, _rows, pos, value);
    };

    /**
     * Get or set the value at a certain position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.<br>
     * To explicitly set the value to <code>undefined</code> use [setValueAt()]{@link gridl#setValueAt}.
     *
     * @param {Array.<number>} pos - The position where you want to set or get the value.
     * @param {any} value - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {any} The cell's value or the the same gridl instance if you use it as a setter.
     */
    this.valueAt = function (pos, value) {
        return value === undefined ? _getValueAt(_data, _columns, pos) : _setValueAt(_this, _data, _columns, _rows, pos, value);
    };

    /**
     * Move a cell from one position to another.
     *
     * @param {Array} from - The position of the cell that you want to move.
     * @param {Array} to - The position where the cell should be moved.
     * @returns {gridl} - The current gridl instance.
     */
    this.moveCell = function (from, to) {
        _moveCell(_data, _columns, _rows, from, to);
        return _this;
    };

    /**
     * Move the current cell to an absolute position.
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array} to - The position where the cell should be moved.
     * @returns {gridl}
     */
    this.moveAbs = function (to) {
        _moveCell(_data, _columns, _rows, _position, to);
        return _this;
    };

    /**
     * Move the current cell from the current position in a certain direction.
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array} direction - The direction in which to move from the current position.
     * @returns {gridl} The current gridl instance.
     */
    this.moveRel = function (direction) {
        return _this.moveCell(_position, _addPositions(_position, direction));
    };

    /**
     * Move a row to a certain position.
     *
     * @param {number} yFrom - The position on the y-axis of the row you want to move.
     * @param {number} yTo - The position on the y-axis of where the row should be moved to.
     * @returns {gridl} The current gridl instance.
     */
    this.moveRow = function (yFrom, yTo) {
        _data = _moveRow(_this.data(), _columns, _rows, yFrom, yTo);
        return _this;
    };

    /**
     * Move a column to a certain position.
     *
     * @param {number} xFrom - The position on the x-axis of the column you want to move.
     * @param {number} xTo - The position on the x-axis of where the column should be moved.
     * @returns {gridl}
     */
    this.moveColumn = function (xFrom, xTo) {
        _data = _moveColumn(_this.data(), _columns, _rows, xFrom, xTo);
        return _this;
    };

    /**
     * Get the column at a certain x-position
     *
     * @param {number} x - The x-position of the column you want to get.
     * @returns {Array.<any>}
     */
    this.column = function (x) {
        return _getColumn(_this.data(), x);
    };

    /**
     * Get the row at a certain y-position
     *
     * @param {number} y - The y-position of the row you want to get.
     * @returns {Array.<any>}
     */
    this.row = function (y) {
        return _getRow(_this.data(), y);
    };

    /**
     * Add a row at a certain y-position. This changes the size of the grid.
     *
     * @param {Array.<any>} row - The row you want to add as an one-dimensional array.
     * @param {number} y - The y-position of where you want to add the row.
     * @returns {gridl} The same gridl instance.
     */
    this.addRow = function (row, y) {
        var grid = _addRowAt(_this.data(), _columns, _rows, row, y);
        _data = _flatten(grid);
        _rows = grid.length;
        return _this;
    };

    /**
     * Add a column at a certain x-position. This changes the size of the grid.
     *
     * @param {Array.<any>} column - The column you want to add as an one-dimensional array.
     * @param {number} x - The x-position of where you want to add the column.
     * @returns {gridl} The same gridl instance.
     */
    this.addColumn = function (column, x) {
        var grid = _addColumnAt(_this.data(), _columns, _rows, column, x);
        _data = _flatten(grid);
        _columns = grid[0].length;
        return _this;
    };

    /**
     * Remove a row at a certain y-position. This changes the size of the grid.
     *
     * @param {number} y - The y-position of the row you want to remove.
     * @returns {gridl} The same gridl instance.
     */
    this.removeRow = function (y) {
        var grid = _removeRowAt(_this.data(), _rows, y);
        _data = _flatten(grid);
        _rows = grid.length;
        return _this;
    };

    /**
     * Remove a column at a certain x-position. This changes the size of the grid.
     *
     * @param {number} x - The x-position of the column you want to remove.
     * @returns {gridl} The same gridl instance.
     */
    this.removeColumn = function (x) {
        var grid = _removeColumnAt(_this.data(), _columns, x);
        _data = _flatten(grid);
        _columns = grid[0].length;
        return _this;
    };

    /**
     * Clip an area out of the current grid. It removes all cells that are not inside the given area.
     *
     * @param {Array.<number>} position - The position the area.
     * @param {Array.<number>} size - The size of the area.
     * @returns {gridl} The same gridl instance.
     */
    this.clipAt = function (position, size) {
        var grid = _clip(_this.data(), _columns, _rows, position, size);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return _this;
    };

    /**
     * Clip an area out of the current grid at the current position. It removes all cells that are not inside the given area.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array.<number>} size - The size of the area.
     * @returns {gridl} The same gridl instance.
     */
    this.clip = function (size) {
        return _this.clipAt(_position, size);
    };

    /**
     * Swap the values of two cells.
     *
     * @param {Array.<number>} position1 - The position of the first cell.
     * @param {Array.<number>} position2 - The position of the second cell.
     * @returns {gridl} The same gridl instance.
     */
    this.swapCells = function (position1, position2) {
        return _swapCells(_this, position1, position2);
    };

    /**
     * Swaps the values of the cell at the current position and another cell.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array.<number>} position - The position of the first cell.
     * @returns {gridl} The same gridl instance.
     */
    this.swapCell = function (position) {
        return _swapCells(_this, _position, position);
    };

    /**
     * Swaps the values of two rows.
     *
     * @param {Array.<number>} y1 - The y-position of the first row.
     * @param {Array.<number>} y2 - The y-position of the second row.
     * @returns {gridl} The same gridl instance.
     */
    this.swapRows = function (y1, y2) {
        _data = _swapRows(_this.data(), _rows, y1, y2);
        return _this;
    };

    /**
     * Swaps the values of two columns.
     *
     * @param {Array.<number>} x1 - The x-position of the first column.
     * @param {Array.<number>} x2 - The x-position of the second column.
     * @returns {gridl} The same gridl instance.
     */
    this.swapColumns = function (x1, x2) {
        _data = _swapColumns(_this.data(), _columns, x1, x2);
        return _this;
    };

    /**
     * Overwrite the values of a given area at a certain position.
     *
     * @param {Array.<number>} position - The position of the area.
     * @param {Array.<number>} area - The area itself as two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {gridl} The same gridl instance.
     */
    this.setAreaAt = function (position, area, anchor) {
        return _setAreaAt(_this, _columns, _rows, position, area, anchor);
    };

    /**
     * Overwrite the values of a given area at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array.<number>} area - The area itself as two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {gridl} The same gridl instance.
     */
    this.setArea = function (area, anchor) {
        return _setAreaAt(_this, _columns, _rows, _position, area, anchor);
    };

    /**
     * Exports the data grid array of a given array at the given position.
     *
     * @param {Array.<number>} position - The position of the area.
     * @param {Array.<number>} size - The size fo the area as a two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {number[][]}
     */
    this.getAreaAt = function (position, size, anchor) {
        return _getAreaAt(_this, _columns, _rows, position, size, anchor);
    };

    /**
     * Exports the data grid array of a given array at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {Array.<number>} size - The size fo the area as a two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {number[][]}
     */
    this.getArea = function (size, anchor) {
        return _getAreaAt(_this, _columns, _rows, _position, size, anchor);
    };

    /**
     * Check if a given area would fit inside the grid at a given position.
     *
     * @param {number[]} position - The position where the area should be placed.
     * @param {any[][]} area - The area itself as a two-dimensional grid array
     * @param {number[]} [anchor = [0, 0]] - The center of area.
     * @returns {boolean} Whether the area fits or not.
     */
    this.areaFitsAt = function (position, area, anchor) {
        return _checkAreaFitsAt(_columns, _rows, position, area, anchor);
    };

    /**
     * Check if a given area would fit inside the grid at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {any[][]} area - The area itself as a two-dimensional grid array
     * @param {number[]} [anchor = [0, 0]] - The center of area.
     * @returns {boolean} Whether the area fits or not.
     */
    this.areaFits = function (area, anchor) {
        return _checkAreaFitsAt(_columns, _rows, _position, area, anchor);
    };

    /**
     * Find the first occurrence of an element within the entire grid.
     *
     * @param {iteratorCallback} callback - The callback function that is called on each element. Should return true if the element is found or false if not.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    this.find = function (callback) {
        return _find(_columns, _data, function (v, i) {
            return callback(v, _index2pos(i, _columns), _this);
        });
    };

    /**
     * Find the first occurrence of an element within a certain area.
     *
     * @param {Array} position - The position of the area [x, y].
     * @param {Array} size - The size of the area [columns, rows].
     * @param {iteratorCallback} callback - The callback function that is called on each element within the defined area. Should return true if the element is found or false if not.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    this.findInArea = function (position, size, callback) {
        return _findInArea(_this, _columns, position, size, callback);
    };

    /**
     * Exports a copy of the internal data as two-dimensional array.
     *
     * @returns {any[][]} The data as two-dimensional array.
     */
    this.data = function () {
        return _toArray2D(_data, _columns);
    };

    /**
     * Rotate the array in a 90 degree steps. A positive step turns it clockwise, a negative step turns it counterclockwise.
     *
     * @param {number} steps - The number of 90 degree turns as integer number.
     * @returns {gridl} The same gridl instance.
     */
    this.rotate = function (steps) {
        var grid = _rotate(_this.data(), _columns, steps);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return _this;
    };

    /**
     * Flips the array on the given x-position
     *
     * @param {number} xPos - The x-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    this.mirrorX = function (xPos) {
        _data = _flatten(_mirror(_this.data(), xPos));
        return _this;
    };

    /**
     * Flips the array on the given y-position.
     *
     * @param {number} yPos - The y-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    this.mirrorY = function (yPos) {
        var grid = _this.data();
        _data = _flatten(grid.map(function (row) {
            return _mirror(row, yPos);
        }));
        return _this;
    };

    /**
     * Go to an absolute position.
     * The internal cursor will be set to this position and can then be used for further operations.
     *
     * @param {Array} position - The new position.
     * @returns {gridl}
     */
    this.goto = function (position) {
        var pos = _goto(_columns, _rows, position);
        _position[0] = pos[0];
        _position[1] = pos[1];
        return _this;
    };

    /**
     * Walk in a given direction based on the current position.
     *
     * @param {Array} direction - The direction you want to go. (It's the position relative to the current position)
     * @returns {gridl} The same gridl instance.
     */
    this.walk = function (direction) {
        var pos = _walk(_columns, _rows, _position, direction);
        _position[0] = pos[0];
        _position[1] = pos[1];
        return _this;
    };

    /**
     * Get the current position.
     *
     * @returns {Array} The current position array [column, row].
     */
    this.position = function () {
        return [_position[0], _position[1]];
    };

    /**
     * Map over all cells. It's the equivalent of Array.map just for the grid.
     *
     * @param {iteratorCallback} callback - The callback function that is called on each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
     * @returns {gridl} A new gridl instance.
     */
    this.map = function (callback) {
        var newData = _data.map(function (v, i) {
            return callback(v, _index2pos(i, _columns), _this);
        });
        return new gridl(_toArray2D(newData, _columns));
    };

    /**
     * Iterate over all cells. It's the equivalent of Array.forEach just for the grid.
     *
     * @param {iteratorCallback} callback - The callback function is called for each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
     * @returns {gridl} The same gridl instance.
     */
    this.forEach = function (callback) {
        _data.forEach(function (v, i) {
            return callback(v, _index2pos(i, _columns), _this);
        });
        return _this;
    };

    /**
     * Make a clone of the current gridl instance.
     *
     * @returns {gridl} A new gridl instance.
     */
    this.clone = function () {
        return new gridl(_toArray2D(_data, _columns)).goto(_position);
    };

    /**
     * Get the values of all adjacent cells at a given position.
     *
     * @param {number[]} position - The position of the cell of which you want to know its adjacent cells.
     * @param {number[][]} [adjacence = [adjacents.ALL]{@link adjacences}] - A list of positions relative to the given position. These positions are considered as the adjacents.
     * @param {boolean} includeOutsideValues - If false, adjacent cells that are outside the grid will be ignored, if true <code>undefined</code> will be returned for them.
     * @returns {any[]} The values of the adjacent cells.
     */
    this.adjacentCellsAt = function (position) {
        var adjacence = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : adjacences.ALL;
        var includeOutsideValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var gridSize = !includeOutsideValues && [_columns, _rows];
        var grid = _toArray2D(_data, _columns);
        return _adjacentCells(grid, position, adjacence, gridSize);
    };

    /**
     * Get the values of all adjacent cells at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @param {number[][]} [adjacence = [adjacents.ALL]{@link adjacences}] - A list of positions relative to the given position. These positions are considered as the adjacents.
     * @param {boolean} includeOutsideValues - If false, adjacent cells that are outside the grid will be ignored, if true <code>undefined</code> will be returned for them.
     * @returns {any[]} The values of the adjacent cells.
     */
    this.adjacentCells = function () {
        var adjacence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : adjacences.ALL;
        var includeOutsideValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var gridSize = !includeOutsideValues && [_columns, _rows];
        var grid = _toArray2D(_data, _columns);
        return _adjacentCells(grid, _position, adjacence, gridSize);
    };

    /**
     * Exports all entries as an one dimensional array.
     *
     * @returns {any[]}
     */
    this.list = function () {
        return [].concat(_toConsumableArray(_data));
    };

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
var directions = exports.directions = Object.freeze({
    UP: [0, -1],
    UP_RIGHT: [1, -1],
    RIGHT: [1, 0],
    DOWN_RIGHT: [1, 1],
    DOWN: [0, 1],
    DOWN_LEFT: [-1, 1],
    LEFT: [-1, 0],
    UP_LEFT: [-1, -1]
});

/**
 * Predefined lists of adjacent positions relative to a certain position.
 *
 * @type {Object}
 * @property {number[][]} ALL - all direct adjacent positions (orthogonal + diagonal)
 * @property {number[][]} ORTHOGONAL - all orthogonal adjacent positions
 * @property {number[][]} DIAGONAL - all diagonal adjacent positions
 */
var adjacences = exports.adjacences = Object.freeze({
    ALL: [directions.UP_LEFT, directions.UP, directions.UP_RIGHT, directions.LEFT, directions.RIGHT, directions.DOWN_LEFT, directions.DOWN, directions.DOWN_RIGHT],
    ORTHOGONAL: [directions.UP, directions.LEFT, directions.RIGHT, directions.DOWN],
    DIAGONAL: [directions.UP_LEFT, directions.UP_RIGHT, directions.DOWN_LEFT, directions.DOWN_RIGHT]
});

/**
 * Create a two dimensional grid array.
 *
 * @param {number} columns - The number of columns.
 * @param {number} rows - The number of rows.
 * @param {Function} callback - The generator function that is called on each cell.
 * @returns {any[][]} The new grid array.
 */
function makeGrid(columns, rows) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
        return null;
    };

    var parsedColumns = parseInt(columns);
    var parsedRows = parseInt(rows);
    if (parsedColumns < 1 || isNaN(parsedColumns)) {
        throw new Error('You need to specify at least one column. Given: ' + columns);
    }
    if (parsedRows < 1 || isNaN(parsedRows)) {
        throw new Error('You need to specify at least one row. Given: ' + rows);
    }
    return Array.from({ length: parsedRows }, function (vr, row) {
        return Array.from({ length: parsedColumns }, function (vc, column) {
            return callback({ column: column, row: row });
        });
    });
}

/**
 * Generate a one-dimensional array that can be a single row or column.
 *
 * @param {number} length - The length of the array.
 * @param {Function} callback - The generator callback function that is called on each element.
 * @returns {any[]}
 */
function makeList(length) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return null;
    };

    var parsedLength = parseInt(length);
    if (parsedLength < 1 || isNaN(parsedLength)) {
        throw new Error('Trying to make a list with an invalid length. Given: ' + length);
    }
    return Array.from({ length: parsedLength }, function (v, i) {
        return callback(i);
    });
}

/**
 * Generate a gridl instance from scratch by specifying the number of rows and columns and fill it with values.
 *
 * @param {number} numColumns - The number of columns.
 * @param {number} numRows - The number of rows.
 * @param {Function} callback - The generator function that is called for each cell. The returned value is going to be the value of the cell.
 * @returns {gridl} A new gridl instance
 */
function make(numColumns, numRows, callback) {
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
var gridlFactory = function gridlFactory(data) {
    return new gridl(data);
};
gridlFactory.adjacences = adjacences;
gridlFactory.directions = directions;
gridlFactory.make = make;
gridlFactory.makeGrid = makeGrid;
gridlFactory.makeList = makeList;

exports.default = gridlFactory;

/***/ })
/******/ ]);
});