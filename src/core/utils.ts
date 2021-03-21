import {Area, CellFactory, Position, Shape} from "./types";

/**
 * Check if arr2D equals `[[]]`
 */
const checkIsOneEmptyRow = (arr2D: any[][]) => arr2D && arr2D[0] && !arr2D[0].length;

/**
 * Get the number of columns from an 2d array.
 *
 * @param arr2D The grid array.
 * @since 0.11.1
 */
export const getColumnCount = (arr2D: any[][]) => arr2D && arr2D[0] && arr2D[0].length || 0;

/**
 * The get number of rows from an array 2d.
 *
 * @param arr2D The grid array.
 * @since 0.11.1
 */
export const getRowCount = (arr2D: any[][]) => checkIsOneEmptyRow(arr2D) ? 0 : arr2D && arr2D.length || 0;

/**
 * Ensures that an empty grid array won't have an empty row entry.
 * A value of `[[]]` is replaced by `[]`.
 *
 * @param arr2D
 * @since 0.11.1
 */
export const correctEmptyArray2D = <T>(arr2D: T[][]) => {
    return (arr2D && arr2D[0] && arr2D[0].length === 0) ? [] : arr2D;
};

/**
 * Checks whether the value is a number or not.
 *
 * @param value The value to check.
 * @since 0.11.1
 */
export const isNumber = (value: any) => typeof value === "number";

/**
 * Checks whether the value is a function or not.
 *
 *  @param value The value to check.
 * @since 0.11.1
 */
export const isFunction = (value: any) => typeof value === "function";

/**
 * Creates an array of the given length using a createItem callback function.
 *
 * @param length The number of elements the array should have.
 * @param createElement The element factory function to create a new single element.
 * @since 0.11.1
 */
export function createArray<T>(length: number, createElement: (idx: number) => T): T[] {
    const result = new Array<T>(length);
    for (let idx = 0; idx < length; idx++) {
        result[idx] = createElement(idx);
    }
    return result;
}

/**
 * Checks whether the given number is outside the given range.
 *
 * @param value The value to check.
 * @param max The range's maximum value.
 * @param min The range's minimum value.
 * @since 0.11.1
 */
export function isOutOfRange(value: number, max: number, min = 0) {
    return value < min || value >= max;
}

/**
 * Checks whether the given position is outside the given shape or not.
 *
 * @param position The position to check.
 * @param shape The shape to check against.
 * @since 0.11.1
 */
export function isOutOfShape(position: Position, shape: Shape) {
    return isOutOfRange(position.x, shape.columnCount) || isOutOfRange(position.y, shape.rowCount);
}

/**
 * Create a two-dimensional grid array.
 *
 * @param columnCount The number of columns, the grid array should have.
 * @param rowCount The number of row, the grid array should have.
 * @param createCell The factory function to create a single cell.
 * @since 0.11.1
 */
export function createArray2D<T>(columnCount: number, rowCount: number, createCell: CellFactory<T>): T[][] {
    return createArray(rowCount, (y) => createArray(columnCount, (x) => {
        const pos = {x, y};
        const idx = y * columnCount + x;
        return createCell(pos, idx);
    }));
}

/**
 * Clones a two-dimensional grid array.
 * @param src The array to clone.
 * @template T The cell type.
 * @since 0.11.1
 */
export function cloneArray2D<T = any>(src: T[][]) {
    const rows = src && src.length || 0;
    const cols = src && src[0] && src[0].length || 0;
    return createArray2D(cols, rows, ({x, y}) => src[y][x]);
}

/**
 * Freezes a 2D array.
 * @param array2D The array to be frozen.
 * @since 0.11.1
 */
export function shallowFreezeArray2D<T>(array2D: T[][]) {
    const rowCount = array2D.length;
    for (let y = 0; y < rowCount; y++) {
        Object.freeze(array2D[y]);
    }
    return Object.freeze(array2D);
}

/**
 * Extracts the values of the given area from a two-dimensional grid array.
 * Positions that are outside the grid are ignored.
 * @since 0.11.1
 */
export function cropArray2D<T>(xMin: number, yMin: number, xMax: number, yMax: number) {
    return (array2D: T[][]): T[][] => {
        return array2D
            .filter((_row, y) => !isOutOfRange(y, yMax, yMin))
            .map((row) => row.filter(
                (_cell: any, x: number) => !isOutOfRange(x, xMax, xMin)),
            );
    };
}

/**
 * Clamps a value between min and max.
 *
 * @param min The minimum value.
 * @param max The maximum value.
 * @param value The value to clamp.
 */
export function clamp(min: number, max: number, value: number) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Converts coordinates to an area defintion.
 *
 * @param x1 First x-value.
 * @param y1 First y-value.
 * @param x2 Second x-value.
 * @param y2 Second y-value.
 */
export function coordinatesToArea(x1: number, y1: number, x2: number, y2: number) {
    const xMin = Math.min(x1, x2);
    const yMin = Math.min(y1, y2);
    const xMax = Math.max(x1, x2);
    const yMax = Math.max(y1, y2);
    return {
        x: xMin,
        y: yMin,
        columnCount: xMax - xMin + 1,
        rowCount: yMax - yMin + 1,
    };
}

/**
 * Converts an area to min/max coordinates.
 *
 * @param area The area to convert.
 */
export function areaToCoordinates(area: Area) {
    const x2 = area.x + area.columnCount - 1;
    const y2 = area.y + area.rowCount - 1;
    return {
        xMin: Math.min(area.x, x2),
        yMin: Math.min(area.y, y2),
        xMax: Math.max(area.x, x2),
        yMax: Math.max(area.y, y2),
    };
}

/**
 * Calculate the intersecting area of two areas.
 *
 * @param area1 The first area.
 * @param area2 The second area.
 */
export function getIntersectingArea(area1: Area, area2: Area): Area {
    const coords1 = areaToCoordinates(area1);
    const coords2 = areaToCoordinates(area2);

    const xMin = Math.max(coords1.xMin, coords2.xMin);
    const yMin = Math.max(coords1.yMin, coords2.yMin);
    const xMax = Math.min(coords1.xMax, coords2.xMax);
    const yMax = Math.min(coords1.yMax, coords2.yMax);

    const columnCount = xMax - xMin + 1;
    const rowCount = yMax - yMin + 1;

    return {x: xMin, y: yMin, columnCount, rowCount};
}

/**
 * Returns a reversed copy the given array.
 *
 * @param arr The array to be reversed.
 */
export function reverseArray<T>(arr: T[]): T[] {
    const lastIdx = arr.length - 1;
    return arr.map((_value, idx) => arr[lastIdx - idx]);
}

/**
 * Checks if two positions have the same x- and y-component.
 *
 * @param pos1 First position.
 * @param pos2 Second position.
 */
export function positionsEqual(pos1: Position, pos2: Position) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

/**
 * Sums up the x- and y-components of two positions.
 *
 * @param pos1 The first position.
 * @param pos2 The second position.
 */
export function addPositions(pos1: Position, pos2: Position): Position {
    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y,
    };
}
