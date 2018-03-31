import gridl from '../index';
import {
    setValueAt,
    subtractPositions,
    index2pos,
    flatten,
    unflatten,
    addPositions,
    getValueAt,
    countRows,
    countColumns,
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

const _validateAreaMember = member => member === undefined || typeof member === 'number';

const _validateAreaDescription = areaDescription => {
    if (areaDescription.length > 6) {
        throw new Error('Invalid area description: too many fields');
    }
    const [_columns = 0, _rows = 0, _x = 0, _y = 0, _ax = 0, _ay = 0] = areaDescription;
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

const _areaStartAndEnd = areaDesc => {
    const size   = [areaDesc[0] || 0, areaDesc[1] || 0];
    const pos    = [areaDesc[2] || 0, areaDesc[3] || 0];
    const anchor = [areaDesc[4] || 0, areaDesc[5] || 0];
    const start  = subtractPositions(pos, anchor);
    const end    = addPositions(start, size);
    return [start[0], start[1], end[0] - 1, end[1] - 1];
};

const _contains = (innerAreaDesc, outerAreaDesc) => {
    const inner = _areaStartAndEnd(innerAreaDesc);
    const outer = _areaStartAndEnd(outerAreaDesc);
    return (
        outer[0] <= inner[0] &&
        outer[1] <= inner[1] &&
        inner[2] <= outer[2] &&
        inner[3] <= outer[3]
    );
};

const _overlaps = (areaDesc1, areaDesc2) => {
    const area1 = _areaStartAndEnd(areaDesc1);
    const area2 = _areaStartAndEnd(areaDesc2);
    return (
        area1[0] <= area2[2] &&
        area2[0] <= area1[2] &&
        area1[1] <= area2[3] &&
        area2[1] <= area1[3]
    );
};

const _intersection = (areaDesc1, areaDesc2) => {
    const area1 = _areaStartAndEnd(areaDesc1);
    const area2 = _areaStartAndEnd(areaDesc2);

    const left   = Math.max(area1[0], area2[0]);
    const right  = Math.min(area1[2], area2[2]);
    const top    = Math.max(area1[1], area2[1]);
    const bottom = Math.min(area1[3], area2[3]);

    const columns = right - left + 1;
    const rows = bottom - top + 1;

    return [columns, rows, left, top];
};

export default function(instance, state) {

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
    const area = (areaDescription = []) => {
        _validateAreaDescription(areaDescription);

        // input values
        const [_columns = 0, _rows = 0, _x = 0, _y = 0, _ax = 0, _ay = 0] = areaDescription;
        const _position = [_x, _y];
        const _anchor = [_ax, _ay];
        const _size = [_columns, _rows];

        // calculated values
        const data = _getAreaAt(state.data, state.columns, state.rows, _position, _size, _anchor);
        const columns = countColumns(data);
        const rows = countRows(data);
        const size = [columns, rows];

        // area api
        const subgrid = gridl(data);
        const api = {
            /**
             * Get the number of rows.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {number} The number of rows.
             */
            numRows: () => rows,

            /**
             * Get the number of columns.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {number} The number of columns.
             */
            numColumns: () => columns,

            /**
             * Get the number of columns and rows as a size array.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {Array.<number>} The area's size.
             */
            size: () => size,

            /**
             * The area's position on the main grid.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {Array.<number>} The position.
             */
            position: () => _position,

            /**
             * Get the anchor.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @returns {Array.<number>} The anchor.
             */
            anchor: () => _anchor,

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
            localToGlobal: (localPosition) => addPositions(api.position(), localPosition),

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
            globalToLocal: (globalPosition) => subtractPositions(globalPosition, api.position()),

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
            valueAt: function(localPosition, value) {
                return arguments.length > 1 ?
                    subgrid.valueAt(localPosition, value) :
                    subgrid.valueAt(localPosition);
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
            data: function(array2D) {
                if (arguments.length > 0) {
                    const usedRows = Math.min(countRows(array2D), rows);
                    for (let r = 0; r < usedRows; r++) {
                        const usedColumns= Math.min(array2D[r].length, columns);
                        for (let c = 0; c < usedColumns; c++) {
                            subgrid.valueAt([c,r], array2D[r][c]);
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
            apply: () => {
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
            parent: () => instance,

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
            reduce: function(callback, initialValue) {
                const reducer = (acc, v, i) => {
                    const local = index2pos(i, columns);
                    return callback(acc, v, local, api);
                };
                return arguments.length < 1 ?
                    flatten(data).reduce(reducer) :
                    flatten(data).reduce(reducer, initialValue);
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
            map: function(callback, thisArg) {
                const mapper = (v, i) => {
                    const local = index2pos(i, columns);
                    return callback.call(thisArg, v, local, api);
                };
                // TODO: looks too complicated (flatten -> unflatten)
                const newData = flatten(data).map(mapper, thisArg);
                // return a copy with the new data
                return area(areaDescription).data(unflatten(newData, columns, rows));
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
            fill: (callbackOrValue, thisArg) => {
                if (typeof callbackOrValue === 'function') {
                    subgrid.fill((v, pos) => callbackOrValue.call(thisArg, v, pos, api));
                }
                else {
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
            find: (callbackOrValue, thisArg) => {
                if (typeof callbackOrValue === 'function') {
                    return subgrid.find((v, pos) => callbackOrValue.call(thisArg, v, pos, api));
                }
                return subgrid.find(v => v === callbackOrValue);
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
            forEach: (callback, thisArg) => {
                const iterator = (v, i) => {
                    const local = index2pos(i, columns);
                    return callback.call(thisArg, v, local, api);
                };
                flatten(data).forEach(iterator, thisArg);
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
            description: () => [columns, rows, _x, _y, _ax, _ay],

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
            isInside: otherAreaDescription => {
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
            contains: otherAreaDescription => {
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
            intersectsWith: otherAreaDescription => {
                _validateAreaDescription(otherAreaDescription);
                return _overlaps(api.description(), otherAreaDescription);
            },

            /**
             * Get the intersection of two areas as area or false if there is no intersection.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {Array.<number>} otherAreaDescription - The description of the other area.
             * @returns {boolean|gridl#area} The area of overlapping values or false if there is no intersecting area.
             */
            intersection: otherAreaDescription => {
                _validateAreaDescription(otherAreaDescription);
                const intersectingDesc = _intersection(api.description(), otherAreaDescription);
                const isPositiveSized = intersectingDesc[0] >= 0 && intersectingDesc[1] >= 0;
                const isIntersecting = intersectingDesc[0] > 0 || intersectingDesc[1] > 0;
                return isPositiveSized && isIntersecting && area(intersectingDesc);
            },

            /**
             * Get the column of an area at a certain x-position.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {number} x - The x-position of the column you want to get.
             * @returns {Array.<*>}
             */
            column: x => subgrid.column(x),

            /**
             * Get the row of an area at a certain y-position.
             *
             * @memberOf gridl#area
             * @method
             * @instance
             *
             * @param {number} y - The y-position of the row you want to get.
             * @returns {Array.<*>}
             */
            row: y => subgrid.row(y),

        };
        return api;
    };

    return {
        methods: { area },
    };
}
