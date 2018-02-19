import gridl from './index';

/**
 * Create a two dimensional grid array.
 *
 * @param {number} columns - The number of columns.
 * @param {number} rows - The number of rows.
 * @param {Function} callback - The generator function that is called on each cell.
 * @returns {Array.<Array.<*>>} The new grid array.
 */
export function makeDataGrid(columns, rows, callback = () => null) {
    const parsedColumns = parseInt(columns);
    const parsedRows = parseInt(rows);
    if (parsedColumns < 1 || isNaN(parsedColumns)) {
        throw new Error(`You need to specify at least one column. Given: ${columns}`);
    }
    if (parsedRows < 1 || isNaN(parsedRows)) {
        throw new Error(`You need to specify at least one row. Given: ${rows}`);
    }
    return Array.from({ length: parsedRows }, (vr, row) => (
        Array.from({ length: parsedColumns }, (vc, column) => (
            callback({ column, row })
        ))
    ));
}

/**
 * Generate a one-dimensional array that can be a single row or column.
 *
 * @param {number} length - The length of the array.
 * @param {Function} callback - The generator callback function that is called on each element.
 * @returns {Array.<*>}
 */
export function makeDataList(length, callback = () => null) {
    const parsedLength = parseInt(length);
    if (parsedLength < 1 || isNaN(parsedLength)) {
        throw new Error(`Trying to make a list with an invalid length. Given: ${length}`);
    }
    return Array.from({ length: parsedLength }, (v, i) => callback(i));
}

/**
 * Generate a gridl instance from scratch by specifying the number of rows and columns and fill it with values.
 *
 * @param {number} numColumns - The number of columns.
 * @param {number} numRows - The number of rows.
 * @param {Function} callback - The generator function that is called for each cell. The returned value is going to be the value of the cell.
 * @returns {gridl} A new gridl instance
 */
export function makeGridl(numColumns, numRows, callback) {
    return gridl(makeDataGrid(numColumns, numRows, callback));
}

/**
 * @namespace generators
 */
export default {
    makeGridl,
    makeDataGrid,
    makeDataList,
}