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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y) {
    return { x: x, y: y };
};

var add = function add(p1, p2) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    };
};

var orthogonalPoints = [new Point(0, -1), // top
new Point(1, 0), // right
new Point(0, 1), // bottom
new Point(-1, 0)];

var diagonalPoints = [new Point(1, -1), // top right
new Point(1, 1), // bottom right
new Point(-1, 1), // bottom left
new Point(-1, -1)];

var mergedPoints = [orthogonalPoints[0], // top
diagonalPoints[0], // top right
orthogonalPoints[1], // right
diagonalPoints[1], // bottom right
orthogonalPoints[2], // bottom
diagonalPoints[2], // bottom left
orthogonalPoints[3], // left
diagonalPoints[3]];

/**
 * Returns the new position after a step of delta.
 * If a step goes beyond the grid, undefined is returned.
 *
 * @param {Point} position - The starting position.
 * @param {Point} delta - The step to take from the starting position.
 * @param {Number} columns - The number of columns.
 * @param {Number} rows - The number of rows.
 * @returns {(Point|undefined)} The new position or undefined if none is available.
 */
var stepBounded = exports.stepBounded = function stepBounded(position, delta, columns, rows) {
    var newPos = add(position, delta);

    var maxX = columns - 1;
    if (newPos.x > maxX || newPos.x < 0) {
        return undefined;
    }

    var maxY = rows - 1;
    if (newPos.y > maxY || newPos.y < 0) {
        return undefined;
    }

    return newPos;
};

/**
 * Returns the new position after a step of delta.
 * If a the step goes beyond the grid, the position will continue on the opposite side of the grid.
 *
 * CAUTION: Might not work if delta.x/delta.y are bigger than the number of rows/columns!
 *
 * @param {Point} position - The starting position.
 * @param {Point} delta - The step to take from the starting position.
 * @param {Number} columns - The number of columns.
 * @param {Number} rows - The number of rows.
 * @returns {Point} The new position.
 */
var stepUnbounded = exports.stepUnbounded = function stepUnbounded(position, delta, columns, rows) {
    var newPos = add(position, delta);

    var maxX = columns - 1;
    if (newPos.x > maxX) {
        newPos.x = newPos.x - maxX - 1;
    } else if (newPos.x < 0) {
        newPos.x = maxX - newPos.x - 1;
    }

    var maxY = rows - 1;
    if (newPos.y > maxY) {
        newPos.y = newPos.y - maxY - 1;
    } else if (newPos.y < 0) {
        newPos.y = maxY - newPos.y - 1;
    }

    return newPos;
};

var toMap2D = exports.toMap2D = function toMap2D(data, columns) {
    return data.reduce(function (res, cell, index) {
        var pos = _index2pos(index, columns);
        if (!res[pos.y]) {
            res[pos.y] = [];
        }
        res[pos.y][pos.x] = cell;
        return res;
    }, []);
};

var _index2pos = function _index2pos(index, columns) {
    if (isNaN(columns)) {
        throw new Error("The number of columns must be a number. Given: " + columns);
    }
    return new Point(index % columns, Math.floor(index / columns));
};

exports.index2pos = _index2pos;
var _pos2index = function _pos2index(pos, columns) {
    if (isNaN(columns)) {
        throw new Error("The number of columns must be a number. Given: " + columns);
    }
    return pos.x + pos.y * columns;
};

/**
 * Get all neighbours in clockwise order.
 *
 * @private
 * @param {Array} data - The one dimensional data array.
 * @param {Number} index - The starting index
 * @param {Boolean} includeDiagonal - Whether to include diagonal neighbours or not.
 * @param {Number} columns - The number of columns the grid has.
 * @param {Number} rows - The number of rows the grid has.
 * @param {Function} doStep - Function that resolves a single neighbour.
 * @returns {Array} The neighbours.
 */
exports.pos2index = _pos2index;
var getNeighbours = function getNeighbours(data, index, includeDiagonal, columns, rows, doStep) {
    var pointSet = includeDiagonal ? mergedPoints : orthogonalPoints;
    var pos = _index2pos(index, columns);
    return pointSet.map(function (point) {
        var neighbour = doStep(pos, point, columns, rows);
        return neighbour ? data[_pos2index(neighbour, columns)] : undefined;
    });
};

var _getNeighboursBounded = function _getNeighboursBounded(data, index, columns, rows) {
    var includeDiagonal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    return getNeighbours(data, index, includeDiagonal, columns, rows, stepBounded);
};

exports.getNeighboursBounded = _getNeighboursBounded;
var _getNeighboursUnbounded = function _getNeighboursUnbounded(data, index, columns, rows) {
    var includeDiagonal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    return getNeighbours(data, index, includeDiagonal, columns, rows, stepUnbounded);
};

exports.getNeighboursUnbounded = _getNeighboursUnbounded;

var Grid = exports.Grid = function () {
    function Grid(_ref) {
        var rows = _ref.rows,
            columns = _ref.columns,
            _ref$data = _ref.data,
            data = _ref$data === undefined ? null : _ref$data;

        _classCallCheck(this, Grid);

        this._rows = rows;
        this._cols = columns;

        if (data) {
            this.importData(data);
        } else {
            this.fillAllWith(null);
        }
    }

    _createClass(Grid, [{
        key: "importData",
        value: function importData(data) {
            if (data.length !== this.numCells()) {
                throw new Error("Importing data failed. Length of [" + data.length + "] doesn't fit [" + this.numCells() + "].");
            }
            this._data = data;
        }
    }, {
        key: "exportData",
        value: function exportData() {
            return [].concat(_toConsumableArray(this._data));
        }
    }, {
        key: "fillAllWith",
        value: function fillAllWith(cell) {
            var length = this._rows * this._cols;
            this._data = Array.from({ length: length }, function () {
                return cell;
            });
        }
    }, {
        key: "getNeighboursBounded",
        value: function getNeighboursBounded(index) {
            var includeDiagonal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return _getNeighboursBounded(this._data, index, this._cols, this._rows, includeDiagonal);
        }
    }, {
        key: "getNeighboursUnbounded",
        value: function getNeighboursUnbounded(index) {
            var includeDiagonal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return _getNeighboursUnbounded(this._data, index, this._cols, this._rows, includeDiagonal);
        }
    }, {
        key: "getNextIndex",
        value: function getNextIndex(indexOrPos, delta) {
            var pos = isNaN(indexOrPos) ? indexOrPos : _index2pos(indexOrPos, this._cols);
            var nextPos = stepUnbounded(pos, delta, this._cols, this._rows);
            return _pos2index(nextPos, this._cols);
        }
    }, {
        key: "center",
        value: function center() {
            return new Point(Math.floor((this._cols - 1) * .5), Math.floor((this._rows - 1) * .5));
        }
    }, {
        key: "getSize",
        value: function getSize() {
            return {
                columns: this._cols,
                rows: this._rows
            };
        }
    }, {
        key: "numCells",
        value: function numCells() {
            return this._rows * this._cols;
        }
    }, {
        key: "setCellAtPos",
        value: function setCellAtPos(cell, pos) {
            var index = _pos2index(pos, this._cols);
            this.setCellAtIndex(cell, index);
        }
    }, {
        key: "setCellAtIndex",
        value: function setCellAtIndex(cell, index) {
            this._data[index] = cell;
        }
    }, {
        key: "index2pos",
        value: function index2pos(index) {
            return _index2pos(index, this._cols);
        }
    }, {
        key: "pos2index",
        value: function pos2index(pos) {
            return _pos2index(pos, this._cols);
        }
    }, {
        key: "mergeGridAtIndex",
        value: function mergeGridAtIndex(area, index) {
            var _this = this;

            var pos = this.index2pos(index);
            area.forEach(function (row, r) {
                row.forEach(function (cell, c) {
                    _this.setCellAtPos(cell, new Point(pos.x + c, pos.y + r));
                });
            });
        }
    }, {
        key: "includesAreaOnlyThisValue",
        value: function includesAreaOnlyThisValue(startIndex, area, value) {
            var pos = this.index2pos(startIndex);

            if (!area.length) {
                // console.warn('area is empty');
                return true;
            }

            // area too high
            if (pos.y + area.length < this._data.length) {
                return false;
            }

            // area too wide
            if (pos.x + area[0].length < this._data[0].length) {
                return false;
            }

            // search for values
            for (var r = pos.y; r < area.length; r++) {
                for (var c = pos.x; c < area[r].length; c++) {
                    if (this._data[r][c] !== value) {
                        return false;
                    }
                }
            }
            return true;
        }
    }, {
        key: "removeCellAtPos",
        value: function removeCellAtPos(pos) {
            var index = _pos2index(pos, this._cols);
            this.removeCellAtIndex(index);
        }
    }, {
        key: "removeCellAtIndex",
        value: function removeCellAtIndex(index) {
            this._data[index] = null;
        }
    }, {
        key: "getAtPosition",
        value: function getAtPosition(pos) {
            return this.getAtIndex(_pos2index(pos, this._cols));
        }
    }, {
        key: "getAtIndex",
        value: function getAtIndex(index) {
            return this._data[index];
        }
    }, {
        key: "serialilze",
        value: function serialilze() {
            return {
                rows: this._rows,
                columns: this._cols,
                data: [].concat(_toConsumableArray(this._data))
            };
        }
    }, {
        key: "rows",
        get: function get() {
            return this._rows;
        }
    }, {
        key: "columns",
        get: function get() {
            return this._cols;
        }
    }]);

    return Grid;
}();

exports.default = {
    Grid: Grid,
    getNeighboursBounded: _getNeighboursBounded,
    getNeighboursUnbounded: _getNeighboursUnbounded,
    pos2index: _pos2index,
    index2pos: _index2pos,
    toMap2D: toMap2D,
    stepBounded: stepBounded,
    stepUnbounded: stepUnbounded
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=gridl.js.map