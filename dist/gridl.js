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

/**
 * Converts cell index into a cell position.
 *
 * @param {Integer} index - The index of the cell.
 * @param {Integer} columns - The number of columns the grid has.
 * @returns {Array} - The equivalent position within the grid as [x, y].
 */
var _index2pos = function _index2pos(index, columns) {
    return [index % columns, Math.floor(index / columns)];
};

/**
 * Converts a position into cell index.
 *
 * @param {Array} position - The two dimensional position array as [x, y].
 * @param {Integer} columns - The number of columns the grid has.
 * @returns {Integer} - The equivalent index within the grid.
 */
var _pos2index = function _pos2index(position, columns) {
    return position && position[0] + position[1] * columns;
};

/**
 * Converts an one-dimensional grid array into a two-dimensional grid.
 *
 * @param {Array} array1D - The one dimensional array.
 * @param {Integer} columns - The number columns the new array should have.
 * @returns {Array} - The two-dimensional array.
 */
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

/**
 * Convert a two-dimensional array into a one-dimensional array.
 *
 * @param {Array} array2D - The two dimensional array to convert.
 * @returns {Array} - The flattened one-dimensional array.
 */
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

function _setValueAt(api, _data, columns, pos, value) {
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
            area[rArea][cArea] = api.getValueAt([c, r]);
        }
    }
    return area;
}

function _findPosition(columns, data, callback) {
    var index = data.findIndex(callback);
    return index >= 0 ? _index2pos(index, columns) : undefined;
}

function _findPositionInArea(api, columns, pos, size, callback) {
    var area = api.getAreaAt(pos, size);
    var flat = _flatten(area);
    var areaIndex = flat.findIndex(callback);
    if (areaIndex >= 0) {
        var areaColumns = area[0].length;
        var posInArea = _index2pos(areaIndex, areaColumns);
        return [pos[0] + posInArea[0], pos[1] + posInArea[1]];
    }
}

function _checkAreaFitsAt(columns, rows, pos, area) {
    var fitsHorizontally = pos[0] + area[0].length <= columns;
    var fitsVertically = pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
}

function _getRelativePosition(columns, rows, startPos, direction) {
    var targetPos = _addPositions(startPos, direction);
    if (_isNotInArea([columns, rows], targetPos)) {
        return;
    }
    return targetPos;
}

function _moveCell(api, data, columns, rows, from, to) {
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
    return api;
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
    var tmp = api.getValueAt(pos1);
    api.setValueAt(pos1, api.getValueAt(pos2));
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
            return _mirror(grid);
        case 3:
            return Array.from({ length: columns }, function (v, i) {
                return _getColumn(grid, columns - 1 - i);
            });
        default:
            throw new Error('Trying to rotate the grid with an invalid steps parameter. Given: ' + steps);
    }
}

function _mirror(grid, index) {
    return grid.reverse();
}

/**
 * The gridl base function.
 *
 * @param {Array} data
 * @returns {{ toArray1D, toArray2D, index2pos, pos2index, rows, columns }}
 */
function gridl(data) {

    _isValidGridArray(data);

    var _rows = data.length;
    var _columns = data[0].length;
    var _data = _flatten(data);

    var api = {};

    // getter for dimensions
    api.columns = function () {
        return _columns;
    };
    api.rows = function () {
        return _rows;
    };
    api.size = function () {
        return [_columns, _rows];
    };

    // single value operations
    api.getValueAt = function (pos) {
        return _getValueAt(_data, _columns, pos);
    }; // TODO: merge with getRelativeValue
    api.setValueAt = function (pos, value) {
        return _setValueAt(api, _data, _columns, pos, value);
    }; // TODO: provide optional relative offset (direction)
    api.getRelativeValue = function (pos, direction) {
        return api.getValueAt(api.getRelativePosition(pos, direction));
    }; // TODO: merge this functionality into getValueAt() with an optional parameter "direction" that defaults to [0,0]
    api.getRelativePosition = function (pos, direction) {
        return _getRelativePosition(_columns, _rows, pos, direction);
    }; // TODO: rename to "getPositionFrom"

    // moving cells
    api.moveCell = function (from, to) {
        return _moveCell(api, _data, _columns, _rows, from, to);
    };
    api.moveCellFrom = function (position, direction) {
        return api.moveCell(position, _addPositions(position, direction));
    };
    api.moveRow = function (yFrom, yTo) {
        _data = _moveRow(api.getData(), _columns, _rows, yFrom, yTo);
        return api;
    };
    api.moveColumn = function (xFrom, xTo) {
        _data = _moveColumn(api.getData(), _columns, _rows, xFrom, xTo);
        return api;
    };

    // columns and rows
    api.getColumn = function (x) {
        return _getColumn(api.getData(), x);
    };
    api.getRow = function (y) {
        return _getRow(api.getData(), y);
    };
    api.addRowAt = function (row, y) {
        var grid = _addRowAt(api.getData(), _columns, _rows, row, y);
        _data = _flatten(grid);
        _rows = grid.length;
        return api;
    };
    api.addColumnAt = function (column, x) {
        var grid = _addColumnAt(api.getData(), _columns, _rows, column, x);
        _data = _flatten(grid);
        _columns = grid[0].length;
        return api;
    };
    api.removeRowAt = function (y) {
        var grid = _removeRowAt(api.getData(), _rows, y);
        _data = _flatten(grid);
        _rows = grid.length;
        return api;
    };
    api.removeColumnAt = function (x) {
        var grid = _removeColumnAt(api.getData(), _columns, x);
        _data = _flatten(grid);
        _columns = grid[0].length;
        return api;
    };

    // clipping
    api.clip = function (position, size) {
        var grid = _clip(api.getData(), _columns, _rows, position, size);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return api;
    };

    // swapping
    api.swapCells = function (pos1, pos2) {
        return _swapCells(api, pos1, pos2);
    };
    api.swapRows = function (y1, y2) {
        _data = _swapRows(api.getData(), _rows, y1, y2);
        return api;
    };
    api.swapColumns = function (x1, x2) {
        _data = _swapColumns(api.getData(), _columns, x1, x2);
        return api;
    };

    // area operations
    api.setAreaAt = function (pos, area, anchor) {
        return _setAreaAt(api, _columns, _rows, pos, area, anchor);
    };
    api.getAreaAt = function (pos, size, anchor) {
        return _getAreaAt(api, _columns, _rows, pos, size, anchor);
    };
    api.checkAreaFitsAt = function (pos, area) {
        return _checkAreaFitsAt(_columns, _rows, pos, area);
    };

    // finding
    api.findPosition = function (callback) {
        return _findPosition(_columns, _data, callback);
    };
    api.findPositionInArea = function (pos, size, callback) {
        return _findPositionInArea(api, _columns, pos, size, callback);
    };

    // exporting data
    api.getData = function () {
        return _toArray2D(_data, _columns);
    };

    // rotating
    api.rotate = function (steps) {
        var grid = _rotate(api.getData(), _columns, steps);
        _data = _flatten(grid);
        _rows = grid.length;
        _columns = grid[0].length;
        return api;
    };

    // mirroring
    api.mirrorX = function (xPos) {
        _data = _flatten(_mirror(api.getData(), xPos));
        return api;
    };

    api.mirrorY = function (yPos) {
        var grid = api.getData();
        _data = _flatten(grid.map(function (row) {
            return _mirror(row, yPos);
        }));
        return api;
    };

    return api;
}

gridl.directions = Object.freeze({
    TOP: [0, -1],
    TOP_RIGHT: [1, -1],
    RIGHT: [1, 0],
    BOTTOM_RIGHT: [1, 1],
    BOTTOM: [0, 1],
    BOTTOM_LEFT: [-1, 1],
    LEFT: [-1, 0],
    TOP_LEFT: [-1, -1]
});

gridl.generateData = function (columns, rows, callback) {
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
};

gridl.generate = function (columns, rows, callback) {
    return gridl(gridl.generateData(columns, rows, callback));
};

exports.default = gridl;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=gridl.js.map