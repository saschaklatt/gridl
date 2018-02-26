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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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

/**
 * Calculates the position according to an index.
 *
 * @memberOf utils
 * @method
 *
 * @param {number} index - The index on a one-dimensional list array.
 * @param {number} columns - The number of columns of the two-dimensional grid array.
 * @returns {number[]} The position according to the index.
 */
var index2pos = exports.index2pos = function index2pos(index, columns) {
    return [index % columns, Math.floor(index / columns)];
};

/**
 * Calculates the index according to the position.
 *
 * @memberOf utils
 * @method
 *
 * @param {number[]} position - The position on a two-dimensional array.
 * @param {number} columns - The number of columns of the two-dimensional array.
 * @returns {number} The index according to the position.
 */
var pos2index = exports.pos2index = function pos2index(position, columns) {
    return position && position[0] + position[1] * columns;
};

/**
 * Converts a two-dimensional grid array into a one-dimensional list array.
 *
 * @memberOf utils
 * @method
 *
 * @param {number[][]} array2D - The two-dimensional array that should be converted.
 * @returns {number[]} A one-dimensional array.
 */
var flatten = exports.flatten = function flatten(array2D) {
    return array2D.reduce(function (res, row) {
        return [].concat(_toConsumableArray(res), _toConsumableArray(row));
    }, []);
};

/**
 * Converts a one-dimensional list array into a two dimensional grid array.
 *
 * @memberOf utils
 * @method
 *
 * @param {number[]} array1D - The one-dimensional array you want to convert.
 * @param {number} columns - The number of columns the new two-dimensional array should have.
 * @returns {number[][]} - A two-dimensional array.
 */
var unflatten = exports.unflatten = function unflatten(array1D, columns) {
    return array1D.reduce(function (res, cell, index) {
        var pos = index2pos(index, columns);
        if (!res[pos[1]]) {
            res[pos[1]] = [];
        }
        res[pos[1]][pos[0]] = cell;
        return res;
    }, []);
};

/**
 * Adds the x and y values of two positions.
 *
 * @memberOf utils
 * @method
 *
 * @param {number[]} p1 - The first position.
 * @param {number[]} p2 - The second position.
 * @returns {number[]} The sum of both positions.
 */
var addPositions = exports.addPositions = function addPositions(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
};

/**
 * Subtracts the x and y value of two positions.
 *
 * @memberOf utils
 * @method
 *
 * @param {number[]} p1 - The first position.
 * @param {number[]} p2 - The second position.
 * @returns {number[]} - The difference of both positions.
 */
var subtractPositions = exports.subtractPositions = function subtractPositions(p1, p2) {
    return [p1[0] - p2[0], p1[1] - p2[1]];
};

/**
 * Limits a value to be between a minimum and maximum value.
 *
 * @memberOf utils
 * @method
 *
 * @param {number} value - The value that should be limited.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The limited value.
 */
var limit = exports.limit = function limit(value, min, max) {
    return Math.max(Math.min(value, max), min);
};

/**
 * Determines if a position is located within in an area.
 *
 * @memberOf utils
 * @method
 *
 * @param {number[]} areaSize - The size of the area.
 * @param {number[]} position - The position.
 * @returns {boolean} Whether or not the position is located within the area.
 */
var isNotInArea = exports.isNotInArea = function isNotInArea(areaSize, position) {
    return position[0] < 0 || position[0] >= areaSize[0] || position[1] < 0 || position[1] >= areaSize[1];
};

/**
 * Get a value at a given position. This method is operating on a one-dimensional array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<*>} data - The one-dimensional source array.
 * @param {number} columns - The number of columns.
 * @param {number[]} pos - The position where to get the value
 * @returns {*} - The value at the given position.
 */
var getValueAt = exports.getValueAt = function getValueAt(data, columns, pos) {
    var index = pos2index(pos, columns);
    if (isNaN(index)) {
        return;
    }
    return data[index];
};

/**
 * Set the value at a given position. This method is operating on a one-dimensional array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<*>} data - The one-dimensional source array.
 * @param {number} columns - The number of columns.
 * @param {number} rows - The number of rows.
 * @param {number[]} pos - The position where to set the value.
 * @param {*} value - The value to set.
 * @returns {boolean} - Whether or not the value was set successfully.
 */
var setValueAt = exports.setValueAt = function setValueAt(data, columns, rows, pos, value) {
    if (isNotInArea([columns, rows], pos)) {
        return false;
    }
    var index = pos2index(pos, columns);
    if (!isNaN(index)) {
        data[index] = value;
    }
    return true;
};

/**
 * Extracts a column at a given x position. This method operates on a one-dimensional grid array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<*>} data - The one-dimensional source array.
 * @param {number} x - The x position of the column.
 * @returns {Array.<*>} - The column.
 */
var getColumn = exports.getColumn = function getColumn(data, x) {
    if (x >= 0 && x < data[0].length) {
        return data.map(function (row) {
            return row[x];
        });
    }
};

/**
 * Check if the position is in a valid format.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<number>} position - The position to validate.
 * @returns {boolean} Whether or not it has a valid position format.
 */
var isValidPositionFormat = exports.isValidPositionFormat = function isValidPositionFormat(position) {
    if (!Array.isArray(position) || position.length !== 2) {
        return false;
    }
    return Number.isSafeInteger(position[0]) && Number.isSafeInteger(position[1]);
};

/**
 * Checks if the given data is a valid two-dimensional grid array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<Array.<*>>} data - The data to validate.
 */
var validateGridArray = exports.validateGridArray = function validateGridArray(data) {
    if (!Array.isArray(data)) {
        throw new Error('Trying to import data that is not an array.');
    }
    data.forEach(function (row, i) {
        if (!Array.isArray(row)) {
            throw new Error('Trying to import data that is not an array.');
        }
        if (i > 0 && data[i - 1].length !== row.length) {
            throw new Error('Trying to import data with inconsistent number of columns.');
        }
        if (row.length < 1) {
            throw new Error('Trying to import grid without any columns. You need to provide at least one column.');
        }
    });
};

/**
 * Utility functions. These methods are useful when working with gridl's internal data. You could find them helpful when
 * developing your own plugins.
 *
 * @namespace
 * @type {Object}
 */
var utils = {
    flatten: flatten,
    isValidPositionFormat: isValidPositionFormat,
    unflatten: unflatten,
    index2pos: index2pos,
    pos2index: pos2index,
    addPositions: addPositions,
    subtractPositions: subtractPositions,
    limit: limit,
    isNotInArea: isNotInArea,
    getColumn: getColumn,
    getValueAt: getValueAt,
    setValueAt: setValueAt,
    validateGridArray: validateGridArray
};

exports.default = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.directions = exports.adjacences = exports.generators = exports.utils = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _generators = __webpack_require__(3);

var _generators2 = _interopRequireDefault(_generators);

var _plugins = __webpack_require__(4);

var _plugins2 = _interopRequireDefault(_plugins);

var _directions = __webpack_require__(2);

var _directions2 = _interopRequireDefault(_directions);

var _adjacences = __webpack_require__(19);

var _adjacences2 = _interopRequireDefault(_adjacences);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flatten = _utils2.default.flatten,
    validateGridArray = _utils2.default.validateGridArray;


function registerPlugins(plugins, state) {
    var _this = this;

    Object.entries(plugins).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            pluginFactory = _ref2[1];

        var plugin = pluginFactory(_this, state);
        var type = typeof plugin === 'undefined' ? 'undefined' : _typeof(plugin);

        // plugin is just a function
        if (type === 'function') {
            _this[key] = plugin;
        }

        // plugin returns multiple functions with a namespace
        else if (type === 'object' && plugin.methods && plugin.namespace) {
                _this[key] = plugin.methods;
            }

            // plugin returns multiple functions without a namespace
            else if (type === 'object' && plugin.methods) {
                    Object.entries(plugin.methods).forEach(function (_ref3) {
                        var _ref4 = _slicedToArray(_ref3, 2),
                            k = _ref4[0],
                            func = _ref4[1];

                        _this[k] = func;
                    });
                }
    });
}

/**
 * @class
 * @private
 */
function gridl(plugins, data) {

    // validate incoming data
    validateGridArray(data);

    // create initial state
    var initialState = {
        rows: data.length,
        columns: data[0].length,
        data: flatten(data),
        position: [0, 0]
    };

    // register plugins with initial state
    registerPlugins.call(this, plugins, initialState);

    return this;
}

/**
 * Creates a new gridl instance.
 *
 * @constructs gridl
 * @param {Array.<Array.<*>>} data - A two dimensional grid array. Every row needs to have the same number of columns.
 */
var gridlFactory = function gridlFactory(data) {
    return new gridl(_plugins2.default, data);
};
gridlFactory.fn = _plugins2.default;

exports.utils = _utils2.default;
exports.generators = _generators2.default;
exports.adjacences = _adjacences2.default;
exports.directions = _directions2.default;
exports.default = gridlFactory;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Predefined directions you can walk in.<br>
 * Use it in combination with [walk(direction)]{@link gridl#walk}.
 *
 * @namespace
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
var directions = Object.freeze({
  UP: Object.freeze([0, -1]),
  UP_RIGHT: Object.freeze([1, -1]),
  RIGHT: Object.freeze([1, 0]),
  DOWN_RIGHT: Object.freeze([1, 1]),
  DOWN: Object.freeze([0, 1]),
  DOWN_LEFT: Object.freeze([-1, 1]),
  LEFT: Object.freeze([-1, 0]),
  UP_LEFT: Object.freeze([-1, -1])
});

exports.default = directions;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeDataGrid = makeDataGrid;
exports.makeDataList = makeDataList;
exports.makeGridl = makeGridl;

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a two dimensional grid array.
 *
 * @memberOf generators
 * @param {number} columns - The number of columns.
 * @param {number} rows - The number of rows.
 * @param {Function} callback - The generator function that is called on each cell.
 * @returns {Array.<Array.<*>>} The new grid array.
 */
function makeDataGrid(columns, rows) {
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
 * @memberOf generators
 * @param {number} length - The length of the array.
 * @param {Function} callback - The generator callback function that is called on each element.
 * @returns {Array.<*>}
 */
function makeDataList(length) {
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
 * @memberOf generators
 * @param {number} numColumns - The number of columns.
 * @param {number} numRows - The number of rows.
 * @param {Function} callback - The generator function that is called for each cell. The returned value is going to be the value of the cell.
 * @returns {gridl} A new gridl instance
 */
function makeGridl(numColumns, numRows, callback) {
    return (0, _index2.default)(makeDataGrid(numColumns, numRows, callback));
}

/**
 * @namespace generators
 */
exports.default = {
    makeGridl: makeGridl,
    makeDataGrid: makeDataGrid,
    makeDataList: makeDataList
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _adjacence = __webpack_require__(5);

var _adjacence2 = _interopRequireDefault(_adjacence);

var _area = __webpack_require__(6);

var _area2 = _interopRequireDefault(_area);

var _clipping = __webpack_require__(7);

var _clipping2 = _interopRequireDefault(_clipping);

var _columns = __webpack_require__(8);

var _columns2 = _interopRequireDefault(_columns);

var _finding = __webpack_require__(9);

var _finding2 = _interopRequireDefault(_finding);

var _flip = __webpack_require__(10);

var _flip2 = _interopRequireDefault(_flip);

var _iterator = __webpack_require__(11);

var _iterator2 = _interopRequireDefault(_iterator);

var _moving = __webpack_require__(12);

var _moving2 = _interopRequireDefault(_moving);

var _navigating = __webpack_require__(13);

var _navigating2 = _interopRequireDefault(_navigating);

var _rotating = __webpack_require__(14);

var _rotating2 = _interopRequireDefault(_rotating);

var _rows = __webpack_require__(15);

var _rows2 = _interopRequireDefault(_rows);

var _state = __webpack_require__(16);

var _state2 = _interopRequireDefault(_state);

var _swapping = __webpack_require__(17);

var _swapping2 = _interopRequireDefault(_swapping);

var _value = __webpack_require__(18);

var _value2 = _interopRequireDefault(_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    adjacence: _adjacence2.default,
    area: _area2.default,
    clipping: _clipping2.default,
    columns: _columns2.default,
    finding: _finding2.default,
    flip: _flip2.default,
    iterator: _iterator2.default,
    moving: _moving2.default,
    navigating: _navigating2.default,
    rotating: _rotating2.default,
    rows: _rows2.default,
    state: _state2.default,
    swapping: _swapping2.default,
    value: _value2.default
};
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Get the values of all adjacent cells at a given position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number[]} position - The position of the cell of which you want to know its adjacent cells.
     * @param {number[][]} [adjacence = [adjacents.ALL]{@link adjacences}] - A list of positions relative to the given position. These positions are considered as the adjacents.
     * @param {boolean} [includeOutsideValues = false] - If <code>false</code>, adjacent cells that are outside the grid will be ignored, if <code>true</code>, <code>undefined</code> will be returned for them.
     * @returns {Array.<*>} The values of the adjacent cells.
     */
    function adjacentCellsAt(position) {
        var adjacence = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _index.adjacences.ALL;
        var includeOutsideValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        var gridSize = !includeOutsideValues && [columns, rows];
        var grid = (0, _utils.unflatten)(data, columns);
        return _adjacentCells(grid, position, adjacence, gridSize);
    }

    /**
     * Get the values of all adjacent cells at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number[][]} [adjacence = [adjacents.ALL]{@link adjacences}] - A list of positions relative to the given position. These positions are considered as the adjacents.
     * @param {boolean} [includeOutsideValues = false] - If <code>false</code>, adjacent cells that are outside the grid will be ignored, if <code>true</code>, <code>undefined</code> will be returned for them.
     * @returns {Array.<*>} The values of the adjacent cells.
     */
    function adjacentCells() {
        var adjacence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _index.adjacences.ALL;
        var includeOutsideValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        var gridSize = !includeOutsideValues && [columns, rows];
        var grid = (0, _utils.unflatten)(data, columns);
        return _adjacentCells(grid, position, adjacence, gridSize);
    }

    return {
        methods: {
            adjacentCells: adjacentCells,
            adjacentCellsAt: adjacentCellsAt
        }
    };
};

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _adjacentCells = function _adjacentCells(grid, position, adjacence) {
    var gridSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    return adjacence.reduce(function (res, direction) {
        var absPos = (0, _utils.addPositions)(position, direction);
        var value = grid && grid[absPos[1]] && grid[absPos[1]][absPos[0]];
        if (gridSize) {
            return (0, _utils.isNotInArea)(gridSize, absPos) ? res : [].concat(_toConsumableArray(res), [value]);
        } else {
            return [].concat(_toConsumableArray(res), [value]);
        }
    }, []);
};

module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Check if a given area would fit inside the grid at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<Array.<*>>} area - The area itself as a two-dimensional grid array
     * @param {number[]} [anchor = [0, 0]] - The center of area.
     * @returns {boolean} Whether the area fits or not.
     */
    function areaFits(area, anchor) {
        var columns = state.columns,
            rows = state.rows,
            position = state.position;

        return _checkAreaFitsAt(columns, rows, position, area, anchor);
    }

    /**
     * Check if a given area would fit inside the grid at a given position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number[]} position - The position where the area should be placed.
     * @param {Array.<Array.<*>>} area - The area itself as a two-dimensional grid array
     * @param {number[]} [anchor = [0, 0]] - The center of area.
     * @returns {boolean} Whether the area fits or not.
     */
    function areaFitsAt(position, area, anchor) {
        var columns = state.columns,
            rows = state.rows;

        return _checkAreaFitsAt(columns, rows, position, area, anchor);
    }

    /**
     * Exports the data grid array of a given array at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} size - The size fo the area as a two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {Array.<Array.<*>>} The area.
     */
    function getArea(size, anchor) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        return _getAreaAt(data, columns, rows, position, size, anchor);
    }

    /**
     * Exports the data grid array of a given array at the given position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} position - The position of the area.
     * @param {Array.<number>} size - The size fo the area as a two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {Array.<Array.<*>>} The area.
     */
    function getAreaAt(position, size, anchor) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        return _getAreaAt(data, columns, rows, position, size, anchor);
    }

    /**
     * Overwrite the values of a given area at the current position.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} area - The area itself as two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {gridl} The same gridl instance.
     */
    function setArea(area, anchor) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        _setAreaAt(data, columns, rows, position, area, anchor);
        return context;
    }

    /**
     * Overwrite the values of a given area at a certain position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} position - The position of the area.
     * @param {Array.<number>} area - The area itself as two-dimensional grid array.
     * @param {Array.<number>} [anchor = [0, 0]] - The center of area.
     * @returns {gridl} The same gridl instance.
     */
    function setAreaAt(position, area, anchor) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        _setAreaAt(data, columns, rows, position, area, anchor);
        return context;
    }

    /**
     * Find the first occurrence of an element within a certain area.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} position - The position of the area [x, y].
     * @param {Array} size - The size of the area [columns, rows].
     * @param {iteratorCallback} callback - The callback function that is called on each element within the defined area. Should return true if the element is found or false if not.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    function findInArea(position, size, callback) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        var area = _getAreaAt(data, columns, rows, position, size);
        var flat = (0, _utils.flatten)(area);
        var areaIndex = flat.findIndex(function (v, i) {
            return callback(v, (0, _utils.index2pos)(i, columns), context);
        });
        if (areaIndex < 0) {
            return;
        }
        var areaColumns = area[0].length;
        var posInArea = (0, _utils.index2pos)(areaIndex, areaColumns);
        return [position[0] + posInArea[0], position[1] + posInArea[1]];
    }

    /**
     * Applies a function against an accumulator and each element in the area at a given position to reduce it to a single value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number[][]} position - The position of the area within the grid.
     * @param {number[][]} size - The size of the area within the grid.
     * @param {reducerCallback} callback - The callback function that is executed on each cell within the grid.
     * @param {*} [initialValue=undefined] - Value to use as the first argument to the first call of the <code>callback</code>. If no initial value is supplied, the first element in the grid will be used.
     * @returns {*} The value that results from the reduction.
     */
    function reduceAreaAt(position, size, callback, initialValue) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        return _reduceAreaAt(context, data, columns, rows, position, size, callback, initialValue, arguments.length === 1);
    }

    /**
     * Applies a function against an accumulator and each element in the area at the current position to reduce it to a single value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number[][]} size - The size of the area within the grid.
     * @param {reducerCallback} callback - The callback function that is executed on each cell within the grid.
     * @param {*} [initialValue=undefined] - Value to use as the first argument to the first call of the <code>callback</code>. If no initial value is supplied, the first element in the grid will be used.
     * @returns {*} The value that results from the reduction.
     */
    function reduceArea(size, callback, initialValue) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        return _reduceAreaAt(context, data, columns, rows, position, size, callback, initialValue, arguments.length === 1);
    }

    return {
        methods: {
            areaFits: areaFits,
            areaFitsAt: areaFitsAt,
            getArea: getArea,
            getAreaAt: getAreaAt,
            setArea: setArea,
            setAreaAt: setAreaAt,
            findInArea: findInArea,
            reduceArea: reduceArea,
            reduceAreaAt: reduceAreaAt
        }
    };
};

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getAreaAt = function _getAreaAt(data, columns, rows, position, size) {
    var anchor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [0, 0];

    var posTmp = (0, _utils.subtractPositions)(position, anchor);
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
            area[rArea][cArea] = (0, _utils.getValueAt)(data, columns, [c, r]);
        }
    }
    return area;
};

var _checkAreaFitsAt = function _checkAreaFitsAt(columns, rows, position, area) {
    var anchor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [0, 0];

    var pos = (0, _utils.subtractPositions)(position, anchor);
    var fitsHorizontally = pos[0] >= 0 && pos[0] + area[0].length <= columns;
    var fitsVertically = pos[1] >= 0 && pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
};

var _setAreaAt = function _setAreaAt(data, columns, rows, position, area) {
    var anchor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [0, 0];

    var pos = (0, _utils.subtractPositions)(position, anchor);
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
            (0, _utils.setValueAt)(data, columns, rows, targetPos, cell);
        });
    });
    return data;
};

var _reduceAreaAt = function _reduceAreaAt(api, data, columns, rows, position, size, callback, initialValue, hasInitialValue) {
    if (!(0, _utils.isValidPositionFormat)(position)) {
        throw new Error('Trying to reduce an area at an invalid position.');
    }
    if (!(0, _utils.isValidPositionFormat)(size)) {
        throw new Error('Trying to reduce an area with invalid size.');
    }
    var reducer = function reducer(acc, v, i) {
        var local = (0, _utils.index2pos)(i, size[0]);
        var global = (0, _utils.addPositions)(local, position);
        return callback(acc, v, global, api);
    };
    var flattenedArea = (0, _utils.flatten)(_getAreaAt(data, columns, rows, position, size));
    return hasInitialValue ? flattenedArea.reduce(reducer) : flattenedArea.reduce(reducer, initialValue);
};

module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Clip an area out of the current grid. It removes all cells that are not inside the given area.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} size - The size of the area.
     * @returns {gridl} The same gridl instance.
     */
    function clip(size) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        var grid = _clip(data, columns, rows, position, size);
        state.data = (0, _utils.flatten)(grid);
        state.rows = grid.length;
        state.columns = grid[0].length;
        return context;
    }

    /**
     * Clip an area out of the current grid. It removes all cells that are not inside the given area.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} position - The position the area.
     * @param {Array.<number>} size - The size of the area.
     * @returns {gridl} The same gridl instance.
     */
    function clipAt(position, size) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        var grid = _clip(data, columns, rows, position, size);
        state.data = (0, _utils.flatten)(grid);
        state.rows = grid.length;
        state.columns = grid[0].length;
        return context;
    }

    return {
        methods: { clip: clip, clipAt: clipAt }
    };
};

var _utils = __webpack_require__(0);

var _clip = function _clip(data, columns, rows, position, size) {
    if (position[0] < 0 || position[0] >= columns || position[1] < 0 || position[1] >= rows) {
        throw new Error('Trying to clip data at an invalid position. Given: ' + position);
    }
    var endPoint = (0, _utils.addPositions)(position, size);
    return (0, _utils.unflatten)(data, columns).filter(function (row, r) {
        return r >= position[1] && r < endPoint[1];
    }).map(function (row) {
        return row.filter(function (cell, c) {
            return c >= position[0] && c < endPoint[0];
        });
    });
};

module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Get the number of columns.
     *
     * @memberOf gridl
     * @method
     * @instance
     * @returns {number}
     */
    function numColumns() {
        return state.columns;
    }

    /**
     * Get the column at a certain x-position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} x - The x-position of the column you want to get.
     * @returns {Array.<*>}
     */
    function column(x) {
        var data = state.data,
            columns = state.columns;

        return (0, _utils.getColumn)((0, _utils.unflatten)(data, columns), x);
    }

    /**
     * Add a column at a certain x-position. This changes the size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<*>} column - The column you want to add as an one-dimensional array.
     * @param {number} x - The x-position of where you want to add the column.
     * @returns {gridl} The same gridl instance.
     */
    function addColumn(column, x) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        if (x < 0 || x > columns) {
            throw new Error('Trying to add column at an invalid position. Given: ' + x);
        }
        if (column.length !== rows) {
            throw new Error('Trying to add a column that contains an invalid amount of cells. Expected: ' + rows + ', Given: ' + column.length);
        }
        var grid = _utils2.default.unflatten(data, columns).map(function (row, i) {
            row.splice(x, 0, column[i]);
            return row;
        });
        state.data = _utils2.default.flatten(grid);
        state.columns = grid[0].length;
        return context;
    }

    /**
     * Remove a column at a certain x-position. This changes the size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} x - The x-position of the column you want to remove.
     * @returns {gridl} The same gridl instance.
     */
    function removeColumn(x) {
        var data = state.data,
            columns = state.columns;

        if (x < 0 || x >= columns) {
            throw new Error('Trying to remove a column at an invalid position. Given: ' + x);
        }
        if (columns <= 1) {
            throw new Error('Cannot remove column because the grid would be empty after it.');
        }
        var grid = (0, _utils.unflatten)(data, columns).map(function (row) {
            return row.filter(function (v, c) {
                return c !== x;
            });
        });
        state.data = (0, _utils.flatten)(grid);
        state.columns = grid[0].length;
        return context;
    }

    return {
        methods: {
            addColumn: addColumn,
            column: column,
            numColumns: numColumns,
            removeColumn: removeColumn
        }
    };
};

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Find the first occurrence of an element within the entire grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {iteratorCallback} callback - The callback function that is called on each element. Should return true if the element is found or false if not.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    function find(callback) {
        var data = state.data,
            columns = state.columns;

        var index = data.findIndex(function (v, i) {
            return callback(v, (0, _utils.index2pos)(i, columns), context);
        });
        return index >= 0 ? (0, _utils.index2pos)(index, columns) : undefined;
    }

    return { methods: { find: find } };
};

var _utils = __webpack_require__(0);

module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Flips the array on the given x-position
     *
     * @param {number} xPos - The x-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    var flipX = function flipX(xPos) {
        var data = state.data,
            columns = state.columns;

        var grid = (0, _utils.unflatten)(data, columns);
        state.data = (0, _utils.flatten)(_flip(grid, xPos));
        return context;
    };

    /**
     * Flips the array on the given y-position.
     *
     * @param {number} yPos - The y-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    function flipY(yPos) {
        var data = state.data,
            columns = state.columns;

        var grid = (0, _utils.unflatten)(data, columns);
        state.data = (0, _utils.flatten)(grid.map(function (row) {
            return _flip(row, yPos);
        }));
        return context;
    }

    return {
        methods: { flipX: flipX, flipY: flipY }
    };
};

var _utils = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _flip = function _flip(arr, index) {
    if (index === undefined) {
        return arr.reverse();
    }
    var limitedIdx = (0, _utils.limit)(index, 0, arr.length - 1);
    var left = arr.filter(function (v, i) {
        return i < limitedIdx;
    });
    var right = arr.filter(function (v, i) {
        return i > limitedIdx;
    });
    return [].concat(_toConsumableArray(right.reverse()), [arr[limitedIdx]], _toConsumableArray(left.reverse()));
};

module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (instance, state) {

    /**
     * Map over all cells. It's the equivalent of Array.map just for the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {iteratorCallback} callback - The callback function that is called on each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
     * @returns {gridl} A new gridl instance.
     */
    function map(callback) {
        var data = state.data,
            columns = state.columns;

        var newData = data.map(function (v, i) {
            return callback(v, (0, _utils.index2pos)(i, columns), instance);
        });
        return (0, _index2.default)((0, _utils.unflatten)(newData, columns));
    }

    /**
     * Iterate over all cells. It's the equivalent of Array.forEach just for the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {iteratorCallback} callback - The callback function is called for each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
     * @returns {gridl} The same gridl instance.
     */
    function forEach(callback) {
        var data = state.data,
            columns = state.columns;

        data.forEach(function (v, i) {
            return callback(v, (0, _utils.index2pos)(i, columns), instance);
        });
        return instance;
    }

    /**
     * Applies a function against an accumulator and each element in the grid to reduce it to a single value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {reducerCallback} callback - The callback function that is executed on each cell.<br><code>function(accumulator, cell, position, gridlInstance) { return ... }</code>
     * @param {*} [initialValue=undefined] - Value to use as the first argument to the first call of the <code>callback</code>. If no initial value is supplied, the first element in the grid will be used.
     * @returns {*} The value that results from the reduction.
     */
    function reduce(callback, initialValue) {
        var data = state.data,
            columns = state.columns;

        var reducer = function reducer(acc, v, i) {
            return callback(acc, v, (0, _utils.index2pos)(i, columns), instance);
        };
        return arguments.length === 1 ? data.reduce(reducer) : data.reduce(reducer, initialValue);
    }

    /**
     * Fill every cells with a value. You can either provide a value or a callback function to set the value for each cell.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {(iteratorCallback|*)} callbackOrValue - Either a fixed value for each cell or a callback function to fill each cell separately.
     * @returns {gridl} The same gridl instance.
     */
    function fill(callbackOrValue) {
        var data = state.data,
            columns = state.columns;

        if (typeof callbackOrValue === 'function') {
            data.forEach(function (v, i) {
                return data[i] = callbackOrValue(v, (0, _utils.index2pos)(i, columns), instance);
            });
        } else {
            data.forEach(function (v, i) {
                return data[i] = callbackOrValue;
            });
        }
        return instance;
    }

    return {
        methods: {
            map: map,
            forEach: forEach,
            reduce: reduce,
            fill: fill
        }
    };
};

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; /**
                                      * @callback iteratorCallback
                                      * @param {*} cell - The value of the current cell.
                                      * @param {Array.<number>} position - The current position.
                                      * @param {gridl} gridlInstance - The current gridl instance.
                                      */

/**
 * @callback reducerCallback
 * @param {*} accumulator - The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied.
 * @param {*} cell - The value of the current cell.
 * @param {Array.<number>} position - The current position.
 * @param {gridl} gridlInstance - The current gridl instance.
 */

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Move the current cell to an absolute position.
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} to - The position where the cell should be moved.
     * @returns {gridl}
     */
    function moveAbs(to) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        state.data = _moveCell(data, columns, rows, position, to);
        return context;
    }

    /**
     * Move a cell from one position to another.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} from - The position of the cell that you want to move.
     * @param {Array} to - The position where the cell should be moved.
     * @returns {gridl} - The current gridl instance.
     */
    function moveCell(from, to) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        state.data = _moveCell(data, columns, rows, from, to);
        return context;
    }

    /**
     * Move a column to a certain position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} xFrom - The position on the x-axis of the column you want to move.
     * @param {number} xTo - The position on the x-axis of where the column should be moved.
     * @returns {gridl}
     */
    function moveColumn(xFrom, xTo) {
        var data = state.data,
            columns = state.columns;

        if (xFrom < 0 || xFrom >= columns) {
            throw new Error('Trying to move column from an invalid position. Given: ' + xFrom);
        }
        if (xTo < 0 || xTo >= columns) {
            throw new Error('Trying to move column to an invalid position. Given: ' + xTo);
        }
        state.data = (0, _utils.flatten)((0, _utils.unflatten)(data, columns).map(function (row) {
            return _move(row, xFrom, xTo);
        }));
        return context;
    }

    /**
     * Move the current cell from the current position in a certain direction.
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} direction - The direction in which to move from the current position.
     * @returns {gridl} The current gridl instance.
     */
    function moveRel(direction) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        state.data = _moveCell(data, columns, rows, position, (0, _utils.addPositions)(position, direction));
        return context;
    }

    /**
     * Move a row to a certain position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} yFrom - The position on the y-axis of the row you want to move.
     * @param {number} yTo - The position on the y-axis of where the row should be moved to.
     * @returns {gridl} The current gridl instance.
     */
    function moveRow(yFrom, yTo) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        if (yFrom < 0 || yFrom >= rows) {
            throw new Error('Trying to move row from an invalid position. Given: ' + yFrom);
        }
        if (yTo < 0 || yTo >= rows) {
            throw new Error('Trying to move row to an invalid position. Given: ' + yTo);
        }
        state.data = (0, _utils.flatten)(_move((0, _utils.unflatten)(data, columns), yFrom, yTo));
        return context;
    }

    return {
        methods: {
            moveAbs: moveAbs,
            moveCell: moveCell,
            moveColumn: moveColumn,
            moveRel: moveRel,
            moveRow: moveRow
        }
    };
};

var _utils = __webpack_require__(0);

var _move = function _move(data, fromIndex, toIndex) {
    var cell = data[fromIndex];
    data.splice(fromIndex, 1);
    data.splice(toIndex, 0, cell);
    return data;
};

var _moveCell = function _moveCell(data, columns, rows, from, to) {
    var fromIndex = (0, _utils.pos2index)(from, columns);
    var size = [columns, rows];
    if (isNaN(fromIndex) || (0, _utils.isNotInArea)(size, from)) {
        throw new Error('Trying to move cell from an invalid position. Given: [' + from + ']');
    }
    var toIndex = (0, _utils.pos2index)(to, columns);
    if (isNaN(toIndex) || (0, _utils.isNotInArea)(size, to)) {
        throw new Error('Trying to move cell to an invalid position. Given: [' + to + ']');
    }
    return _move(data, fromIndex, toIndex);
};

module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Get the current position.
     *
     * @returns {Array} The current position array [column, row].
     */
    function position() {
        var position = state.position;

        return [position[0], position[1]];
    }

    /**
     * Go to an absolute position.
     * The internal cursor will be set to this position and can then be used for further operations.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} position - The new position.
     * @returns {gridl}
     */
    function goto(position) {
        if (!(0, _utils.isValidPositionFormat)(position)) {
            throw new Error('Trying to go to an invalid position. Given: ' + position);
        }
        state.position = [position[0], position[1]];
        return context;
    }

    /**
     * Walk in a given direction based on the current position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} direction - The direction you want to go. (It's the position relative to the current position)
     * @returns {gridl} The same gridl instance.
     */
    function walk(direction) {
        var position = state.position;

        if (!(0, _utils.isValidPositionFormat)(direction)) {
            throw new Error('Trying to walk into an invalid direction. Given: ' + direction);
        }
        state.position = (0, _utils.addPositions)(position, direction);
        return context;
    }

    return {
        methods: {
            goto: goto,
            position: position,
            walk: walk
        }
    };
};

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Rotate the array in a 90 degree steps. A positive step turns it clockwise, a negative step turns it counterclockwise.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} steps - The number of 90 degree turns as integer number.
     * @returns {gridl} The same gridl instance.
     */
    function rotate(steps) {
        var data = state.data,
            columns = state.columns;

        var grid = _rotate((0, _utils.unflatten)(data, columns), columns, steps);
        state.data = (0, _utils.flatten)(grid);
        state.rows = grid.length;
        state.columns = grid[0].length;
        return context;
    }

    return { methods: { rotate: rotate } };
};

var _utils = __webpack_require__(0);

function _rotate(grid, columns, steps) {
    var mod = steps % 4;
    var option = mod < 0 ? mod + 4 : mod;
    switch (option) {
        case 0:
            return grid;
        case 1:
            return Array.from({ length: columns }, function (v, i) {
                return (0, _utils.getColumn)(grid, i).reverse();
            });
        case 2:
            return grid.reverse().map(function (row, r) {
                return row.reverse();
            });
        case 3:
            return Array.from({ length: columns }, function (v, i) {
                return (0, _utils.getColumn)(grid, columns - 1 - i);
            });
        default:
            throw new Error('Trying to rotate the grid with an invalid steps parameter. Given: ' + steps);
    }
}

module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Get the number of rows.
     *
     * @memberOf gridl
     * @method
     * @instance
     * @returns {number}
     */
    function numRows() {
        return state.rows;
    }

    /**
     * Get the row at a certain y-position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} y - The y-position of the row you want to get.
     * @returns {Array.<*>}
     */
    function row(y) {
        var data = state.data,
            columns = state.columns;

        return getRow((0, _utils.unflatten)(data, columns), y);
    }

    /**
     * Add a row at a certain y-position. This changes the size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<*>} row - The row you want to add as an one-dimensional array.
     * @param {number} y - The y-position of where you want to add the row.
     * @returns {gridl} The same gridl instance.
     */
    function addRow(row, y) {
        var data = state.data,
            rows = state.rows,
            columns = state.columns;

        if (y < 0 || y > rows) {
            throw new Error('Trying to add row at an invalid position. Given: ' + y);
        }
        if (row.length !== columns) {
            throw new Error('Trying to add a row that contains an invalid amount of cells. Expected: ' + columns + ', Given: ' + row.length);
        }
        var grid = (0, _utils.unflatten)(data, columns);
        grid.splice(y, 0, row);
        state.data = (0, _utils.flatten)(grid);
        state.rows = grid.length;
        return context;
    }

    /**
     * Remove a row at a certain y-position. This changes the size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} y - The y-position of the row you want to remove.
     * @returns {gridl} The same gridl instance.
     */
    function removeRow(y) {
        var data = state.data,
            rows = state.rows,
            columns = state.columns;

        if (y < 0 || y >= rows) {
            throw new Error('Trying to remove a row at an invalid position. Given: ' + y);
        }
        if (rows <= 1) {
            throw new Error('Cannot remove row because the grid would be empty after it.');
        }
        var grid = (0, _utils.unflatten)(data, columns);
        grid.splice(y, 1);
        state.data = (0, _utils.flatten)(grid);
        state.rows = grid.length;
        return context;
    }

    return {
        methods: {
            addRow: addRow,
            numRows: numRows,
            removeRow: removeRow,
            row: row
        }
    };
};

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRow = function getRow(data, y) {
    return data[y];
};

module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Get the current size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @returns {number[]}
     */
    function size() {
        var columns = state.columns,
            rows = state.rows;

        return [columns, rows];
    }

    /**
     * Exports a copy of the internal data as two-dimensional array or imports a new data into the array. If you use it to import new grid data, make sure the new data has the same size.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<Array.<*>>} [newData] The new data you want to import as a two-dimensional grid array.
     * @returns {Array.<Array.<*>>} The data as two-dimensional array or the same gridl instance if you use it as a setter.
     */
    function data(newData) {
        if (arguments.length) {
            (0, _utils.validateGridArray)(newData);
            state.data = (0, _utils.flatten)(newData);
            return context;
        }
        return (0, _utils.unflatten)(state.data, state.columns);
    }

    /**
     * Exports all entries as an one dimensional array.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @returns {Array.<*>}
     */
    function list() {
        return [].concat(_toConsumableArray(state.data));
    }

    /**
     * Make a clone of the current gridl instance.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @returns {gridl} A new gridl instance.
     */
    function clone() {
        var data = state.data,
            columns = state.columns,
            position = state.position;

        return (0, _index2.default)((0, _utils.unflatten)(data, columns)).goto(position);
    }

    return {
        methods: {
            size: size,
            data: data,
            list: list,
            clone: clone
        }
    };
};

var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Swaps the values of the cell at the current position and another cell.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} otherPosition - The position of the first cell.
     * @returns {gridl} The same gridl instance.
     */
    function swapCell(otherPosition) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        _swapCells(data, columns, rows, position, otherPosition);
        return context;
    }

    /**
     * Swaps the values of two cells.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} position1 - The position of the first cell.
     * @param {Array.<number>} position2 - The position of the second cell.
     * @returns {gridl} The same gridl instance.
     */
    function swapCells(position1, position2) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        _swapCells(data, columns, rows, position1, position2);
        return context;
    }

    /**
     * Swaps the values of two columns.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} x1 - The x-position of the first column.
     * @param {Array.<number>} x2 - The x-position of the second column.
     * @returns {gridl} The same gridl instance.
     */
    function swapColumns(x1, x2) {
        var data = state.data,
            columns = state.columns;

        if (x1 < 0 || x1 >= columns) {
            throw new Error('Trying to swap columns from an invalid position. Given: ' + x1);
        }
        if (x2 < 0 || x2 >= columns) {
            throw new Error('Trying to swap columns to an invalid position. Given: ' + x2);
        }
        var grid = (0, _utils.unflatten)(data, columns).map(function (row) {
            _swap(row, x1, x2);
            return row;
        });
        state.data = (0, _utils.flatten)(grid);
        return context;
    }

    /**
     * Swaps the values of two rows.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} y1 - The y-position of the first row.
     * @param {Array.<number>} y2 - The y-position of the second row.
     * @returns {gridl} The same gridl instance.
     */
    function swapRows(y1, y2) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        if (y1 < 0 || y1 >= rows) {
            throw new Error('Trying to swap rows from an invalid position. Given: ' + y1);
        }
        if (y2 < 0 || y2 >= rows) {
            throw new Error('Trying to swap rows to an invalid position. Given: ' + y2);
        }
        state.data = (0, _utils.flatten)(_swap((0, _utils.unflatten)(data, columns), y1, y2));
        return context;
    }

    return {
        methods: {
            swapCell: swapCell,
            swapCells: swapCells,
            swapColumns: swapColumns,
            swapRows: swapRows
        }
    };
};

var _utils = __webpack_require__(0);

var _swap = function _swap(arr, i1, i2) {
    var tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
    return arr;
};

var _swapCells = function _swapCells(data, columns, rows, position1, position2) {
    var size = [columns, rows];
    if ((0, _utils.isNotInArea)(size, position1) || (0, _utils.isNotInArea)(size, position2)) {
        throw new Error('Trying to swap cells with an invalid position.');
    }
    var index1 = (0, _utils.pos2index)(position1, columns);
    var index2 = (0, _utils.pos2index)(position2, columns);
    return _swap(data, index1, index2);
};

module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

    /**
     * Get or set the value at the current position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {*} [value] - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {*} The cell's value or the gridl instance if you use it as a setter.
     */
    function value(value) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows,
            position = state.position;

        if (arguments.length < 1) {
            return (0, _utils.getValueAt)(data, columns, position);
        }
        (0, _utils.setValueAt)(data, columns, rows, position, value);
        return context;
    }

    /**
     * Get or set the value at a certain position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} pos - The position where you want to set or get the value.
     * @param {*} [value] - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {*} The cell's value or the the same gridl instance if you use it as a setter.
     */
    function valueAt(pos, value) {
        var data = state.data,
            columns = state.columns,
            rows = state.rows;

        if (arguments.length < 2) {
            return (0, _utils.getValueAt)(data, columns, pos);
        }
        (0, _utils.setValueAt)(data, columns, rows, pos, value);
        return context;
    }

    return { methods: { value: value, valueAt: valueAt } };
};

var _utils = __webpack_require__(0);

module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _directions = __webpack_require__(2);

var _directions2 = _interopRequireDefault(_directions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Predefined lists of adjacent positions relative to a certain position.
 *
 * @namespace
 *
 * @type {Object}
 * @property {number[][]} ALL - all direct adjacent positions (orthogonal + diagonal) in the order: left to right, top to bottom
 * @property {number[][]} ALL_CW - all direct adjacent positions (orthogonal + diagonal) in clockwise order
 * @property {number[][]} ALL_CCW - all direct adjacent positions (orthogonal + diagonal) in counterclockwise order
 * @property {number[][]} ORTHOGONAL - all orthogonal adjacent positions in the order: left to right, top to bottom
 * @property {number[][]} ORTHOGONAL_CW - all orthogonal adjacent positions in clockwise order
 * @property {number[][]} ORTHOGONAL_CCW - all orthogonal adjacent positions in counterclockwise order
 * @property {number[][]} DIAGONAL - all diagonal adjacent positions in the order: left to right, top to bottom
 * @property {number[][]} DIAGONAL_CW - all diagonal adjacent positions in clockwise order
 * @property {number[][]} DIAGONAL_CCW - all diagonal adjacent positions in counterclockwise order
 */
var adjacences = Object.freeze({
    ALL: Object.freeze([_directions2.default.UP_LEFT, _directions2.default.UP, _directions2.default.UP_RIGHT, _directions2.default.LEFT, _directions2.default.RIGHT, _directions2.default.DOWN_LEFT, _directions2.default.DOWN, _directions2.default.DOWN_RIGHT]),
    ALL_CW: Object.freeze([_directions2.default.UP, _directions2.default.UP_RIGHT, _directions2.default.RIGHT, _directions2.default.DOWN_RIGHT, _directions2.default.DOWN, _directions2.default.DOWN_LEFT, _directions2.default.LEFT, _directions2.default.UP_LEFT]),
    ALL_CCW: Object.freeze([_directions2.default.UP, _directions2.default.UP_LEFT, _directions2.default.LEFT, _directions2.default.DOWN_LEFT, _directions2.default.DOWN, _directions2.default.DOWN_RIGHT, _directions2.default.RIGHT, _directions2.default.UP_RIGHT]),
    ORTHOGONAL: Object.freeze([_directions2.default.UP, _directions2.default.LEFT, _directions2.default.RIGHT, _directions2.default.DOWN]),
    ORTHOGONAL_CW: Object.freeze([_directions2.default.UP, _directions2.default.RIGHT, _directions2.default.DOWN, _directions2.default.LEFT]),
    ORTHOGONAL_CCW: Object.freeze([_directions2.default.UP, _directions2.default.LEFT, _directions2.default.DOWN, _directions2.default.RIGHT]),
    DIAGONAL: Object.freeze([_directions2.default.UP_LEFT, _directions2.default.UP_RIGHT, _directions2.default.DOWN_LEFT, _directions2.default.DOWN_RIGHT]),
    DIAGONAL_CW: Object.freeze([_directions2.default.UP_RIGHT, _directions2.default.DOWN_RIGHT, _directions2.default.DOWN_LEFT, _directions2.default.UP_LEFT]),
    DIAGONAL_CCW: Object.freeze([_directions2.default.UP_LEFT, _directions2.default.DOWN_LEFT, _directions2.default.DOWN_RIGHT, _directions2.default.UP_RIGHT])
});

exports.default = adjacences;
module.exports = exports['default'];

/***/ })
/******/ ]);
});