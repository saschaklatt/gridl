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

var _defaultOpts = {
    arrayType: '1d'
};

var _validArrayTypes = Object.freeze(['1d', '2d']);

/**
 * Converts cell index into a cell position.
 *
 * @param {Integer} index - The index of the cell.
 * @param {Integer} columns - The number of columns the grid has.
 * @returns {Array} - The equivalent position within the grid as [x, y].
 */
var index2pos = exports.index2pos = function index2pos(index, columns) {
    return [index % columns, Math.floor(index / columns)];
};

/**
 * Converts a position into cell index.
 *
 * @param {Array} position - The two dimensional position array as [x, y].
 * @param {Integer} columns - The number of columns the grid has.
 * @returns {Integer} - The equivalent index within the grid.
 */
var pos2index = exports.pos2index = function pos2index(position, columns) {
    return position[0] + position[1] * columns;
};

/**
 * Converts an one-dimensional grid array into a two-dimensional grid.
 *
 * @param {Array} array1D - The one dimensional array.
 * @param {Integer} columns - The number columns the new array should have.
 * @returns {Array} - The two-dimensional array.
 */
var toArray2D = exports.toArray2D = function toArray2D(array1D, columns) {
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
function _guessDimensions(opts, data) {
    var numCells = opts.arrayType === '1d' ? data.length : data.reduce(function (res, row) {
        return res + row.length;
    }, 0);

    if (!opts.columns && !opts.rows) {
        if (opts.arrayType === '2d') {
            opts.rows = data.length;
            opts.columns = data[0].length;
        } else {
            opts.rows = 1;
            opts.columns = data.length;
        }
    } else if (opts.columns && !opts.rows && numCells % opts.columns === 0) {
        opts.rows = numCells / opts.columns;
    } else if (!opts.columns && opts.rows && numCells % opts.rows === 0) {
        opts.columns = numCells / opts.rows;
    }

    return opts;
}

var _mergeOptions = function _mergeOptions(opts, data) {
    return Object.assign({}, _defaultOpts, _guessDimensions(Object.assign({}, _defaultOpts, opts), data));
};

var _toIndex = function _toIndex(indexOrPos, columns) {
    if (!columns) {
        throw new Error('_toIndex() needs to know the number of columns.');
    }
    return Array.isArray(indexOrPos) ? pos2index(indexOrPos, columns) : parseInt(indexOrPos);
};

var _toPosition = function _toPosition(indexOrPos, columns) {
    if (!columns) {
        throw new Error('_toPosition() needs to know the number of columns.');
    }
    return Array.isArray(indexOrPos) ? indexOrPos : index2pos(indexOrPos, columns);
};

var _flatten = function _flatten(array2D) {
    return array2D.reduce(function (res, row) {
        return [].concat(_toConsumableArray(res), _toConsumableArray(row));
    }, []);
};

function _valueAt(_data, columns, indexOrPos, value) {
    var index = _toIndex(indexOrPos, columns);
    if (isNaN(index)) {
        throw new Error('Trying to access value with invalid index or position. ' + indexOrPos);
    }
    if (value === undefined) {
        return _data[index];
    } else {
        _data[index] = value;
        return this;
    }
}

function _setAreaAt(api, columns, rows, indexOrPos, area) {
    var pos = _toPosition(indexOrPos, columns);
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
            api.valueAt(targetPos, cell);
        });
    });
    return api;
}

function _getAreaAt(api, columns, rows, indexOrPos, size) {
    var pos = _toPosition(indexOrPos, columns);
    var end = [Math.min(pos[0] + size[0], columns), Math.min(pos[1] + size[1], rows)];
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

function _findPosition(api, data, callback) {
    var index = data.findIndex(callback);
    return index >= 0 ? api.index2pos(index) : undefined;
}

function _findPositionInArea(api, columns, indexOrPos, size, callback) {
    var area = api.getAreaAt(indexOrPos, size);
    var flat = _flatten(area);
    var areaIndex = flat.findIndex(callback);
    if (areaIndex >= 0) {
        var areaColumns = area[0].length;
        var areaPos = _toPosition(indexOrPos, columns);
        var posInArea = index2pos(areaIndex, areaColumns);
        return [areaPos[0] + posInArea[0], areaPos[1] + posInArea[1]];
    }
}

function _findIndexInArea(api, columns, indexOrPos, size, callback) {
    var pos = api.findPositionInArea(indexOrPos, size, callback);
    return pos ? api.pos2index(pos) : -1;
}

function _checkAreaFitsAt(columns, rows, indexOrPos, area) {
    var pos = _toPosition(indexOrPos, columns);
    var fitsHorizontally = pos[0] + area[0].length <= columns;
    var fitsVertically = pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
}

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
    var columns = _opts.columns,
        rows = _opts.rows;

    var _data = _opts.arrayType === '1d' ? [].concat(_toConsumableArray(data)) : toArray1D(data, columns, rows);

    var api = {};

    // getter for dimensions
    api.columns = function () {
        return columns;
    };
    api.rows = function () {
        return rows;
    };
    api.size = function () {
        return [columns, rows];
    };

    // position calculations
    api.index2pos = function (index) {
        return index2pos(index, columns);
    };
    api.pos2index = function (position) {
        return pos2index(position, columns);
    };

    // accessing data
    api.valueAt = _valueAt.bind(api, _data, columns);
    api.setAreaAt = function (indexOrPos, area) {
        return _setAreaAt(api, columns, rows, indexOrPos, area);
    };
    api.getAreaAt = function (indexOrPos, size) {
        return _getAreaAt(api, columns, rows, indexOrPos, size);
    };
    api.findIndex = function (callback) {
        return _data.findIndex(callback);
    };
    api.findPosition = function (callback) {
        return _findPosition(api, _data, callback);
    };
    api.findPositionInArea = function (indexOrPos, size, callback) {
        return _findPositionInArea(api, columns, indexOrPos, size, callback);
    };
    api.findIndexInArea = function (indexOrPos, size, callback) {
        return _findIndexInArea(api, columns, indexOrPos, size, callback);
    };
    api.checkAreaFitsAt = function (indexOrPos, area) {
        return _checkAreaFitsAt(columns, rows, indexOrPos, area);
    };

    // exporting data
    api.toArray1D = function () {
        return [].concat(_toConsumableArray(_data));
    };
    api.toArray2D = toArray2D.bind(api, _data, columns);
    api.serialize = function () {
        return {
            opts: _opts,
            data: _data
        };
    };

    return api;
}

exports.default = gridl;

/***/ })
/******/ ]);
});
//# sourceMappingURL=gridl.js.map