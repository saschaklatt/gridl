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

var _addPositions = function _addPositions(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]];
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

function _setAreaAt(api, columns, rows, pos, area) {
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

function _getAreaAt(api, columns, rows, pos, size) {
    var end = [Math.min(pos[0] + size[0], columns), Math.min(pos[1] + size[1], rows)];
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
    if (targetPos[0] < 0 || targetPos[0] >= columns || targetPos[1] < 0 || targetPos[1] >= rows) {
        return;
    }
    return targetPos;
}

/**
 * The gridl base function.
 *
 * @param {Array} data
 * @param {{ arrayType, columns, rows }} opts
 * @returns {{ toArray1D, toArray2D, index2pos, pos2index, rows, columns }}
 */
function gridl(data) {

    _isValidGridArray(data);

    var rows = data.length;
    var columns = data[0].length;

    var _data = _flatten(data, columns, rows);

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

    // accessing data
    api.getValueAt = function (pos) {
        return _getValueAt(_data, columns, pos);
    };
    api.setValueAt = function (pos, value) {
        return _setValueAt(api, _data, columns, pos, value);
    };
    api.setAreaAt = function (pos, area) {
        return _setAreaAt(api, columns, rows, pos, area);
    };
    api.getAreaAt = function (pos, size) {
        return _getAreaAt(api, columns, rows, pos, size);
    };
    api.findPosition = function (callback) {
        return _findPosition(columns, _data, callback);
    };
    api.findPositionInArea = function (pos, size, callback) {
        return _findPositionInArea(api, columns, pos, size, callback);
    };
    api.checkAreaFitsAt = function (pos, area) {
        return _checkAreaFitsAt(columns, rows, pos, area);
    };
    api.getRelativePosition = function (pos, direction) {
        return _getRelativePosition(columns, rows, pos, direction);
    };
    api.getRelativeValue = function (pos, direction) {
        return api.getValueAt(api.getRelativePosition(pos, direction));
    };

    // exporting data
    api.getData = function () {
        return _toArray2D(_data, columns);
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

exports.default = gridl;

/***/ })
/******/ ]);
});
//# sourceMappingURL=gridl.js.map