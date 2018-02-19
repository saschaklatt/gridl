import gridl from '../index';
import {
    setValueAt,
    subtractPositions,
    index2pos,
    flatten,
    addPositions,
    isValidPositionFormat, getValueAt,
} from '../utils';

const _getAreaAt = (data, columns, rows, position, size, anchor = [0,0]) => {
    const posTmp = subtractPositions(position, anchor);
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
            area[rArea][cArea] = getValueAt(data, columns, [c, r]);
        }
    }
    return area;
};

const _checkAreaFitsAt = (columns, rows, position, area, anchor = [0,0]) => {
    const pos = subtractPositions(position, anchor);
    const fitsHorizontally = pos[0] >= 0 && pos[0] + area[0].length <= columns;
    const fitsVertically = pos[1] >= 0 && pos[1] + area.length <= rows;
    return fitsHorizontally && fitsVertically;
};

const _setAreaAt = (data, columns, rows, position, area, anchor = [0,0]) => {
    const pos = subtractPositions(position, anchor);
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
            setValueAt(data, columns, rows, targetPos, cell);
        });
    });
    return data;
};

const _reduceAreaAt = (api, data, columns, rows, position, size, callback, initialValue, hasInitialValue) => {
    if (!isValidPositionFormat(position)) {
        throw new Error('Trying to reduce an area at an invalid position.');
    }
    if (!isValidPositionFormat(size)) {
        throw new Error('Trying to reduce an area with invalid size.');
    }
    const reducer = (acc, v, i) => {
        const local = index2pos(i, size[0]);
        const global = addPositions(local, position);
        return callback(acc, v, global, api);
    };
    const flattenedArea = flatten(_getAreaAt(data, columns, rows, position, size));
    return hasInitialValue ? flattenedArea.reduce(reducer) : flattenedArea.reduce(reducer, initialValue);
};

export default function(context, stateProvider) {

    const { data, columns, rows, position } = stateProvider.getState();

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
        const area = _getAreaAt(data, columns, rows, position, size);
        const flat = flatten(area);
        const areaIndex = flat.findIndex((v, i) => callback(v, index2pos(i, columns), context));
        if (areaIndex < 0) {
            return;
        }
        const areaColumns = area[0].length;
        const posInArea = index2pos(areaIndex, areaColumns);
        return [
            position[0] + posInArea[0],
            position[1] + posInArea[1],
        ];
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
        return _reduceAreaAt(context, data, columns, rows, position, size, callback, initialValue, arguments.length === 1);
    }

    return {
        areaFits,
        areaFitsAt,
        getArea,
        getAreaAt,
        setArea,
        setAreaAt,
        findInArea,
        reduceArea,
        reduceAreaAt,
    };
}
