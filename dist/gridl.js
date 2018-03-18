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
 * Count the number of rows in a two-dimensional array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<Array.<any>>} array2D - The input array.
 * @returns {number} The number of rows.
 */
var countRows = exports.countRows = function countRows(array2D) {
    return array2D.length || 0;
};

/**
 * Count the number of columns in a two-dimensional array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<Array.<any>>} array2D - The input array.
 * @returns {number} The number of columns.
 */
var countColumns = exports.countColumns = function countColumns(array2D) {
    return array2D && array2D[0] && array2D[0].length || 0;
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
 * @param {number} rows - The number of rows the new two-dimensional array should have.
 * @returns {number[][]} - A two-dimensional array.
 */
var unflatten = exports.unflatten = function unflatten(array1D, columns, rows) {
    var res = [];
    for (var r = 0; r < rows; r++) {
        res[r] = [];
        for (var c = 0; c < columns; c++) {
            var pos = [c, r];
            var i = pos2index(pos, columns);
            res[r][c] = array1D[i];
        }
    }
    return res;
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
        // if (row.length < 1) {
        //     throw new Error('Trying to import grid without any columns. You need to provide at least one column.');
        // }
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
    countColumns: countColumns,
    countRows: countRows,
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

var _adjacences = __webpack_require__(18);

var _adjacences2 = _interopRequireDefault(_adjacences);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flatten = _utils2.default.flatten,
    validateGridArray = _utils2.default.validateGridArray,
    countColumns = _utils2.default.countColumns,
    countRows = _utils2.default.countRows;


var usedPlugins = [];

function registerPlugins(state) {
    var _this = this;

    var register = function register(_ref) {
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
    };
    usedPlugins.forEach(register);
}

/**
 * @class
 * @private
 */
function gridl(data) {

    // validate incoming data
    validateGridArray(data);

    // create initial state
    var initialState = {
        rows: countRows(data),
        columns: countColumns(data),
        data: flatten(data)
    };

    // register plugins with initial state
    registerPlugins.call(this, initialState);

    return this;
}

/**
 * Creates a new gridl instance.
 *
 * @constructs gridl
 * @param {Array.<Array.<*>>} data - A two dimensional grid array. Every row needs to have the same number of columns.
 */
var gridlFactory = function gridlFactory(data) {
    return new gridl(data);
};

/**
 * Register a plugin.
 *
 * @param {string} id - An unique ID to identify the plugin.
 * @param {Object} plugin - The plugin itself.
 */
gridlFactory.use = function (id, plugin) {
    usedPlugins.push([id, plugin]);
};

// register core plugins
Object.entries(_plugins2.default).forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        plugin = _ref6[1];

    return gridlFactory.use(key, plugin);
});

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

var _flipping = __webpack_require__(10);

var _flipping2 = _interopRequireDefault(_flipping);

var _iterator = __webpack_require__(11);

var _iterator2 = _interopRequireDefault(_iterator);

var _moving = __webpack_require__(12);

var _moving2 = _interopRequireDefault(_moving);

var _rotating = __webpack_require__(13);

var _rotating2 = _interopRequireDefault(_rotating);

var _rows = __webpack_require__(14);

var _rows2 = _interopRequireDefault(_rows);

var _state = __webpack_require__(15);

var _state2 = _interopRequireDefault(_state);

var _swapping = __webpack_require__(16);

var _swapping2 = _interopRequireDefault(_swapping);

var _value = __webpack_require__(17);

var _value2 = _interopRequireDefault(_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    adjacence: _adjacence2.default,
    area: _area2.default,
    clipping: _clipping2.default,
    columns: _columns2.default,
    finding: _finding2.default,
    flip: _flipping2.default,
    iterator: _iterator2.default,
    moving: _moving2.default,
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
        var grid = (0, _utils.unflatten)(data, columns, rows);
        return _adjacentCells(grid, position, adjacence, gridSize);
    }

    return {
        methods: {
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (instance, state) {

    /**
     * Select a subset area of the grid to perform actions only on this limited area.
     *
     * @memberOf gridl
     * @method
     * @instance
     * @constructs area
     *
     * @param {Array.<number>} [areaDescription=[]] - Describes the size, position and anchor of area.<br><code>[columns=0, rows=0, positionX=0, positionY=0, anchorX=0, anchorY=0]</code>
     * @returns {gridl#area} The area api.
     */
    var area = function area() {
        var areaDescription = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _validateAreaDescription(areaDescription);

        // input values

        var _areaDescription2 = _slicedToArray(areaDescription, 6),
            _areaDescription2$ = _areaDescription2[0],
            _columns = _areaDescription2$ === undefined ? 0 : _areaDescription2$,
            _areaDescription2$2 = _areaDescription2[1],
            _rows = _areaDescription2$2 === undefined ? 0 : _areaDescription2$2,
            _areaDescription2$3 = _areaDescription2[2],
            _x = _areaDescription2$3 === undefined ? 0 : _areaDescription2$3,
            _areaDescription2$4 = _areaDescription2[3],
            _y = _areaDescription2$4 === undefined ? 0 : _areaDescription2$4,
            _areaDescription2$5 = _areaDescription2[4],
            _ax = _areaDescription2$5 === undefined ? 0 : _areaDescription2$5,
            _areaDescription2$6 = _areaDescription2[5],
            _ay = _areaDescription2$6 === undefined ? 0 : _areaDescription2$6;

        var _position = [_x, _y];
        var _anchor = [_ax, _ay];
        var _size = [_columns, _rows];

        // calculated values
        var data = _getAreaAt(state.data, state.columns, state.rows, _position, _size, _anchor);
        var columns = (0, _utils.countColumns)(data);
        var rows = (0, _utils.countRows)(data);
        var _size2 = [columns, rows];

        // area api
        var subgrid = (0, _index2.default)(data);
        var api = {
            /**
             * Get the number of rows.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {number} The number of rows.
             */
            numRows: function numRows() {
                return rows;
            },

            /**
             * Get the number of columns.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {number} The number of columns.
             */
            numColumns: function numColumns() {
                return columns;
            },

            /**
             * Get the number of columns and rows as a size array.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {Array.<number>} The area's size.
             */
            size: function size() {
                return _size2;
            },

            /**
             * The area's position on the main grid.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {Array.<number>} The position.
             */
            position: function position() {
                return _position;
            },

            /**
             * Get the anchor.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {Array.<number>} The anchor.
             */
            anchor: function anchor() {
                return _anchor;
            },

            /**
             * Convert a local position inside the area to a global position on the grid.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {Array.<number>} localPosition - The local position you want to convert.
             * @returns {Array.<number>} The global position.
             */
            localToGlobal: function localToGlobal(localPosition) {
                return (0, _utils.addPositions)(api.position(), localPosition);
            },

            /**
             * Convert a global position on the grid to a local position inside the area.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {Array.<number>} globalPosition - The global position you want to convert.
             * @returns {Array.<number>} The local position.
             */
            globalToLocal: function globalToLocal(globalPosition) {
                return (0, _utils.subtractPositions)(globalPosition, api.position());
            },

            /**
             * Get or set a value inside the area.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {Array.<number>} localPosition - The local position of the value.
             * @param {*} [value] - The value you want to set.
             * @returns {number} The number of rows.
             */
            valueAt: function valueAt(localPosition, value) {
                return arguments.length > 1 ? subgrid.valueAt(localPosition, value) : subgrid.valueAt(localPosition);
            },

            /**
             * Get or overwrite the data of the area. When using it as a setter, this method will not change the size of the area. Missing values or values that are outside of the area will be ignored.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {*} [array2D] - The value you want to set.
             * @returns {gridl#area|Array.<Array.<*>>} The area when used as setter, the data array when used as getter.
             */
            data: function data(array2D) {
                if (arguments.length > 0) {
                    var usedRows = Math.min((0, _utils.countRows)(array2D), rows);
                    for (var r = 0; r < usedRows; r++) {
                        var usedColumns = Math.min(array2D[r].length, columns);
                        for (var c = 0; c < usedColumns; c++) {
                            subgrid.valueAt([c, r], array2D[r][c]);
                        }
                    }
                    return api;
                }
                return subgrid.data();
            },

            /**
             * Applies the changes that are made on the area to the main grid.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {gridl} The main grid instance.
             */
            apply: function apply() {
                _setAreaAt(state.data, state.columns, state.rows, _position, subgrid.data(), _anchor);
                return instance;
            },

            /**
             * Returns the main grid.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {gridl} The main grid.
             */
            parent: function parent() {
                return instance;
            },

            /**
             * Applies a function against an accumulator and each element in the area to reduce it to a single value.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {reducerCallback} callback - The callback function that is executed on each cell.<br><code>function(accumulator, cell, position, gridlInstance) { return ... }</code>
             * @param {*} [initialValue=undefined] - Value to use as the first argument to the first call of the <code>callback</code>. If no initial value is supplied, the first element in the grid will be used.
             * @returns {*} The value that results from the reduction.
             */
            reduce: function reduce(callback, initialValue) {
                var reducer = function reducer(acc, v, i) {
                    var local = (0, _utils.index2pos)(i, columns);
                    return callback(acc, v, local, api);
                };
                return arguments.length < 1 ? (0, _utils.flatten)(data).reduce(reducer) : (0, _utils.flatten)(data).reduce(reducer, initialValue);
            },

            /**
             * Map over all cells of area. It's the equivalent of Array.map just for the grid.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {iteratorCallback} callback - The callback function that is called on each cell of the area.<br><code>function(cell, position, gridlInstance) { return ... }</code>
             * @returns {gridl#area} A new area instance.
             */
            map: function map(callback, thisArg) {
                var mapper = function mapper(v, i) {
                    var local = (0, _utils.index2pos)(i, columns);
                    return callback.call(thisArg, v, local, api);
                };
                // TODO: looks too complicated (flatten -> unflatten)
                var newData = (0, _utils.flatten)(data).map(mapper, thisArg);
                // return a copy with the new data
                return area(areaDescription).data((0, _utils.unflatten)(newData, columns, rows));
            },

            /**
             * Iterates over all cells of the area and replaces it with either a fixed value or a value returned by a callback function.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {*|iteratorCallback} callbackOrValue - A fixed value or a callback function that is executed on each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
             * @param {*} [thisArg] Optional. Object to use as <code>this</code> when executing <code>callback</code>.
             * @returns {gridl#area} The same area instance.
             */
            fill: function fill(callbackOrValue, thisArg) {
                if (typeof callbackOrValue === 'function') {
                    subgrid.fill(function (v, pos) {
                        return callbackOrValue.call(thisArg, v, pos, api);
                    });
                } else {
                    subgrid.fill(callbackOrValue);
                }
                return api;
            },

            /**
             * Find the first occurrence of an element within the area.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {iteratorCallback} callbackOrValue - The callback function that is called on each element. Should return true if the element is found or false if not.
             * @param {*} [thisArg] Optional. Object to use as <code>this</code> when executing <code>callback</code>.
             * @returns {(Array.<number>|undefined)} The local position of the first element that is found or <code>undefined</code> if nothing was found.
             */
            find: function find(callbackOrValue, thisArg) {
                if (typeof callbackOrValue === 'function') {
                    return subgrid.find(function (v, pos) {
                        return callbackOrValue.call(thisArg, v, pos, api);
                    });
                }
                return subgrid.find(function (v) {
                    return v === callbackOrValue;
                });
            },

            /**
             * Iterate over all cells in the area. It's the equivalent of Array.forEach just for the grid.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {iteratorCallback} callback - The callback function is executed on each cell in the area.<br><code>function(cell, position, gridlInstance) { return ... }</code>
             * @param {*} [thisArg] Optional. Object to use as <code>this</code> when executing <code>callback</code>.
             * @returns {gridl#area} The same area instance.
             */
            forEach: function forEach(callback, thisArg) {
                var iterator = function iterator(v, i) {
                    var local = (0, _utils.index2pos)(i, columns);
                    return callback.call(thisArg, v, local, api);
                };
                (0, _utils.flatten)(data).forEach(iterator, thisArg);
                return api;
            },

            /**
             * Generate the area description for the current area.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {Array.<number>} The area description.
             */
            description: function description() {
                return [columns, rows, _x, _y, _ax, _ay];
            },

            /**
             * Check if the current area is completely covered inside another area.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {Array.<number>} otherAreaDescription - The description of the other area.
             * @returns {boolean} Whether or not current area is covered.
             */
            isInside: function isInside(otherAreaDescription) {
                _validateAreaDescription(otherAreaDescription);
                return _contains(api.description(), otherAreaDescription);
            },

            /**
             * Check if the current area completely covers another area.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {Array.<number>} otherAreaDescription - The description of the other area.
             * @returns {boolean} Whether or not the other area is covered.
             */
            contains: function contains(otherAreaDescription) {
                _validateAreaDescription(otherAreaDescription);
                return _contains(otherAreaDescription, api.description());
            },

            /**
             * Check if the current area overlaps with another area.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {Array.<number>} otherAreaDescription - The description of the other area.
             * @returns {boolean} Whether or not the areas intersect.
             */
            intersectsWith: function intersectsWith(otherAreaDescription) {
                _validateAreaDescription(otherAreaDescription);
                return _overlap(api.description(), otherAreaDescription);
            }
        };
        return api;
    };

    return {
        methods: { area: area }
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

var _validateAreaMember = function _validateAreaMember(member) {
    return member === undefined || typeof member === 'number';
};

var _validateAreaDescription = function _validateAreaDescription(areaDescription) {
    if (areaDescription.length > 6) {
        throw new Error('Invalid area description: too many fields');
    }

    var _areaDescription = _slicedToArray(areaDescription, 6),
        _areaDescription$ = _areaDescription[0],
        _columns = _areaDescription$ === undefined ? 0 : _areaDescription$,
        _areaDescription$2 = _areaDescription[1],
        _rows = _areaDescription$2 === undefined ? 0 : _areaDescription$2,
        _areaDescription$3 = _areaDescription[2],
        _x = _areaDescription$3 === undefined ? 0 : _areaDescription$3,
        _areaDescription$4 = _areaDescription[3],
        _y = _areaDescription$4 === undefined ? 0 : _areaDescription$4,
        _areaDescription$5 = _areaDescription[4],
        _ax = _areaDescription$5 === undefined ? 0 : _areaDescription$5,
        _areaDescription$6 = _areaDescription[5],
        _ay = _areaDescription$6 === undefined ? 0 : _areaDescription$6;

    if (!_validateAreaMember(_columns)) {
        throw new Error('Invalid area description: column is not a number');
    }
    if (!_validateAreaMember(_rows)) {
        throw new Error('Invalid area description: row is not a number');
    }
    if (!_validateAreaMember(_x)) {
        throw new Error('Invalid area description: x is not a number');
    }
    if (!_validateAreaMember(_y)) {
        throw new Error('Invalid area description: y is not a number');
    }
    if (!_validateAreaMember(_ax)) {
        throw new Error('Invalid area description: anchorX is not a number');
    }
    if (!_validateAreaMember(_ay)) {
        throw new Error('Invalid area description: anchorY is not a number');
    }
    if (_columns && _columns < 0) {
        throw new Error('Invalid area description: columns cannot be negative');
    }
    if (_rows && _rows < 0) {
        throw new Error('Invalid area description: rows cannot be negative');
    }
};

var _areaStartAndEnd = function _areaStartAndEnd(areaDesc) {
    var size = [areaDesc[0] || 0, areaDesc[1] || 0];
    var pos = [areaDesc[2] || 0, areaDesc[3] || 0];
    var anchor = [areaDesc[4] || 0, areaDesc[5] || 0];
    var start = (0, _utils.subtractPositions)(pos, anchor);
    var end = (0, _utils.addPositions)(start, size);
    return [start[0], start[1], end[0] - 1, end[1] - 1];
};

var _contains = function _contains(innerAreaDesc, outerAreaDesc) {
    var inner = _areaStartAndEnd(innerAreaDesc);
    var outer = _areaStartAndEnd(outerAreaDesc);
    return outer[0] <= inner[0] && outer[1] <= inner[1] && inner[2] <= outer[2] && inner[3] <= outer[3];
};

var _overlap = function _overlap(areaDesc1, areaDesc2) {
    var area1 = _areaStartAndEnd(areaDesc1);
    var area2 = _areaStartAndEnd(areaDesc2);
    return area1[0] <= area2[2] && area2[0] <= area1[2] && area1[1] <= area2[3] && area2[1] <= area1[3];
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
        methods: { clipAt: clipAt }
    };
};

var _utils = __webpack_require__(0);

var _clip = function _clip(data, columns, rows, position, size) {
    if (position[0] < 0 || position[0] >= columns || position[1] < 0 || position[1] >= rows) {
        throw new Error('Trying to clip data at an invalid position. Given: ' + position);
    }
    var endPoint = (0, _utils.addPositions)(position, size);
    return (0, _utils.unflatten)(data, columns, rows).filter(function (row, r) {
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
            columns = state.columns,
            rows = state.rows;

        return (0, _utils.getColumn)((0, _utils.unflatten)(data, columns, rows), x);
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
        var grid = _utils2.default.unflatten(data, columns, rows).map(function (row, i) {
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
            columns = state.columns,
            rows = state.rows;

        if (x < 0 || x >= columns) {
            throw new Error('Trying to remove a column at an invalid position. Given: ' + x);
        }
        if (columns <= 1) {
            throw new Error('Cannot remove column because the grid would be empty after it.');
        }
        var grid = (0, _utils.unflatten)(data, columns, rows).map(function (row) {
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
     * @param {iteratorCallback} callbackOrValue - The callback function that is called on each element. Should return true if the element is found or false if not.
     * @param {*} [thisArg] Optional. Object to use as <code>this</code> when executing <code>callback</code>.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    function find(callbackOrValue, thisArg) {
        var data = state.data,
            columns = state.columns;

        var index = void 0;
        if (typeof callbackOrValue === 'function') {
            index = data.findIndex(function (v, i) {
                return callbackOrValue.call(thisArg, v, (0, _utils.index2pos)(i, columns), context);
            }, thisArg);
        } else {
            index = data.findIndex(function (v) {
                return v === callbackOrValue;
            }, thisArg);
        }
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
            columns = state.columns,
            rows = state.rows;

        var grid = (0, _utils.unflatten)(data, columns, rows);
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
            columns = state.columns,
            rows = state.rows;

        var grid = (0, _utils.unflatten)(data, columns, rows);
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
            columns = state.columns,
            rows = state.rows;

        var newData = data.map(function (v, i) {
            return callback(v, (0, _utils.index2pos)(i, columns), instance);
        });
        return (0, _index2.default)((0, _utils.unflatten)(newData, columns, rows));
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
            columns = state.columns,
            rows = state.rows;

        if (xFrom < 0 || xFrom >= columns) {
            throw new Error('Trying to move column from an invalid position. Given: ' + xFrom);
        }
        if (xTo < 0 || xTo >= columns) {
            throw new Error('Trying to move column to an invalid position. Given: ' + xTo);
        }
        state.data = (0, _utils.flatten)((0, _utils.unflatten)(data, columns, rows).map(function (row) {
            return _move(row, xFrom, xTo);
        }));
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
        state.data = (0, _utils.flatten)(_move((0, _utils.unflatten)(data, columns, rows), yFrom, yTo));
        return context;
    }

    return {
        methods: {
            moveCell: moveCell,
            moveColumn: moveColumn,
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
            columns = state.columns,
            rows = state.rows;

        var grid = _rotate((0, _utils.unflatten)(data, columns, rows), columns, steps);
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
/* 14 */
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
            columns = state.columns,
            rows = state.rows;

        return getRow((0, _utils.unflatten)(data, columns, rows), y);
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
        var grid = (0, _utils.unflatten)(data, columns, rows);
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
        var grid = (0, _utils.unflatten)(data, columns, rows);
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
/* 15 */
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
            state.rows = (0, _utils.countRows)(newData);
            state.columns = (0, _utils.countColumns)(newData);
            state.data = (0, _utils.flatten)(newData);
            return context;
        }
        return (0, _utils.unflatten)(state.data, state.columns, state.rows);
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
            rows = state.rows;

        return (0, _index2.default)((0, _utils.unflatten)(data, columns, rows));
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

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
            columns = state.columns,
            rows = state.rows;

        if (x1 < 0 || x1 >= columns) {
            throw new Error('Trying to swap columns from an invalid position. Given: ' + x1);
        }
        if (x2 < 0 || x2 >= columns) {
            throw new Error('Trying to swap columns to an invalid position. Given: ' + x2);
        }
        var grid = (0, _utils.unflatten)(data, columns, rows).map(function (row) {
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
        state.data = (0, _utils.flatten)(_swap((0, _utils.unflatten)(data, columns, rows), y1, y2));
        return context;
    }

    return {
        methods: {
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (context, state) {

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

        if (!(0, _utils.isValidPositionFormat)(pos)) {
            throw new Error('Trying to access value at an invalid position: ' + pos);
        }
        if (arguments.length < 2) {
            return (0, _utils.getValueAt)(data, columns, pos);
        }
        (0, _utils.setValueAt)(data, columns, rows, pos, value);
        return context;
    }

    return { methods: { valueAt: valueAt } };
};

var _utils = __webpack_require__(0);

module.exports = exports['default'];

/***/ }),
/* 18 */
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