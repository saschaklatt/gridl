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
exports.gridl = gridl;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
exports.index2pos = _index2pos;
var _pos2index = function _pos2index(position, columns) {
    return position[0] + position[1] * columns;
};

/**
 * Converts an one-dimensional grid array into a two-dimensional grid.
 *
 * @param {Array} array1D - The one dimensional array.
 * @param {Integer} columns - The number columns the new array should have.
 * @returns {Array} - The two-dimensional array.
 */
exports.pos2index = _pos2index;
var toArray2D = exports.toArray2D = function toArray2D(array1D, columns) {
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
 * @param {Integer} columns - The number of columns.
 * @param {Integer} rows - The number of rows.
 * @returns {Array} - The flattened one-dimensional array.
 */
var toArray1D = exports.toArray1D = function toArray1D(array2D, columns, rows) {
    if (rows !== array2D.length) {
        var dataStr = '(expected: ' + rows + ', actually: ' + array2D.length + ')';
        throw new Error('Trying to convert invalid array2D with invalid number of rows to array1D. ' + dataStr);
    }
    return array2D.reduce(function (res, row) {
        if (columns !== row.length) {
            var _dataStr = '(expected: ' + columns + ', actually: ' + row.length + ')';
            throw new Error('Trying to convert invalid array2D with invalid number of columns to array1D. ' + _dataStr);
        }
        return [].concat(_toConsumableArray(res), _toConsumableArray(row));
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
var _guessDimensions = function _guessDimensions(opts, data) {
    var numCells = opts.arrayType === '1d' ? data.length : data.reduce(function (res, row) {
        return res + row.length;
    }, 0);

    if (!opts.columns && !opts.rows) {
        if (opts.arrayType === '2d') {
            opts.rows = data.length;
            opts.columns = data[0].length;
        } else if (opts.arrayType === '1d') {
            opts.rows = 1;
            opts.columns = data.length;
        }
    } else if (opts.columns && !opts.rows && numCells % opts.columns === 0) {
        opts.rows = numCells / opts.columns;
    } else if (!opts.columns && opts.rows && numCells % opts.rows === 0) {
        opts.columns = numCells / opts.rows;
    }

    return opts;
};

var _defaultOpts = {
    arrayType: '1d'
};

var _mergeOptions = function _mergeOptions(opts, data) {
    return Object.assign({}, _defaultOpts, _guessDimensions(Object.assign({}, _defaultOpts, opts), data));
};

var _validArrayTypes = Object.freeze(['1d', '2d']);

/**
 * The gridl base function.
 *
 * @param {Array} data
 * @param {{ arrayType, columns, rows }} opts
 * @returns {{ toArray1D, toArray2D, index2pos, pos2index, rows, columns }}
 */
function gridl(data) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (!Array.isArray(data)) {
        throw new Error('Trying to use gridl with none-array value for data.');
    }

    if (opts.arrayType && !_validArrayTypes.includes(opts.arrayType)) {
        throw new Error('Trying to use invalid arrayType. expected: (' + _validArrayTypes.join('|') + '), actually: ' + opts.arrayType);
    }

    var _opts = _mergeOptions(opts, data);
    var _data = _opts.arrayType === '1d' ? [].concat(_toConsumableArray(data)) : toArray1D(data, _opts.columns, _opts.rows);

    return {
        // getter for dimensions
        columns: function columns() {
            return _opts.columns;
        },
        rows: function rows() {
            return _opts.rows;
        },
        size: function size() {
            return [_opts.columns, _opts.rows];
        },

        // position calculations
        index2pos: function index2pos(index) {
            return _index2pos(index, _opts.columns);
        },
        pos2index: function pos2index(position) {
            return _pos2index(position, _opts.columns);
        },

        // exporting data
        toArray1D: function toArray1D() {
            return [].concat(_toConsumableArray(_data));
        },
        toArray2D: toArray2D.bind(this, _data, _opts.columns),
        serialize: function serialize() {
            return {
                opts: _opts,
                data: _data
            };
        }
    };
}

exports.default = {
    pos2index: _pos2index,
    index2pos: _index2pos,
    toArray2D: toArray2D,
    toArray1D: toArray1D,
    gridl: gridl
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=gridl.js.map