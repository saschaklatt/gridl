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
export const index2pos = (index, columns) => [index % columns, Math.floor(index / columns)];

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
export const pos2index = (position, columns) => position && position[0] + position[1] * columns;

/**
 * Count the number of rows in a two-dimensional array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<Array.<any>>} array2D - The input array.
 * @returns {number} The number of rows.
 */
export const countRows = array2D => array2D.length || 0;

/**
 * Count the number of columns in a two-dimensional array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<Array.<any>>} array2D - The input array.
 * @returns {number} The number of columns.
 */
export const countColumns = array2D => (array2D && array2D[0] && array2D[0].length) || 0;

/**
 * Converts a two-dimensional grid array into a one-dimensional list array.
 *
 * @memberOf utils
 * @method
 *
 * @param {number[][]} array2D - The two-dimensional array that should be converted.
 * @returns {number[]} A one-dimensional array.
 */
export const flatten = array2D => array2D.reduce((res, row) => [...res, ...row], []);

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
export const unflatten = (array1D, columns, rows) => {
    const res = [];
    for (let r = 0; r < rows; r++) {
        res[r] = [];
        for (let c = 0; c < columns; c++) {
            const pos = [c, r];
            const i = pos2index(pos, columns);
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
export const addPositions = (p1, p2) => [
    p1[0] + p2[0],
    p1[1] + p2[1],
];

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
export const subtractPositions = (p1, p2) => [
    p1[0] - p2[0],
    p1[1] - p2[1],
];

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
export const limit = (value, min, max) => Math.max(Math.min(value, max), min);

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
export const isNotInArea = (areaSize, position) => (
    position[0] < 0 || position[0] >= areaSize[0] ||
    position[1] < 0 || position[1] >= areaSize[1]
);

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
export const getValueAt = (data, columns, pos) => {
    const index = pos2index(pos, columns);
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
export const setValueAt = (data, columns, rows, pos, value) => {
    if (isNotInArea([columns, rows], pos)) {
        return false;
    }
    const index = pos2index(pos, columns);
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
export const getColumn = (data, x) => {
    if (x >= 0 && x < data[0].length) {
        return data.map(row => row[x]);
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
export const isValidPositionFormat = position => {
    if (!Array.isArray(position) || position.length !== 2) {
        return false;
    }
    return (Number.isSafeInteger(position[0]) && Number.isSafeInteger(position[1]));
};

/**
 * Checks if the given data is a valid two-dimensional grid array.
 *
 * @memberOf utils
 * @method
 *
 * @param {Array.<Array.<*>>} data - The data to validate.
 */
export const validateGridArray = data => {
    if (!Array.isArray(data)) {
        throw new Error('Trying to import data that is not an array.');
    }
    data.forEach((row, i) => {
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
const utils = {
    countColumns,
    countRows,
    flatten,
    isValidPositionFormat,
    unflatten,
    index2pos,
    pos2index,
    addPositions,
    subtractPositions,
    limit,
    isNotInArea,
    getColumn,
    getValueAt,
    setValueAt,
    validateGridArray,
};

export default utils;