import {Grid, GridObject, CreateGridProps, OptionalPosition, CreateGridFromArray2DProps} from "./types";
import {cloneArray2D, correctEmptyArray2D, createArray2D, getColumnCount, getRowCount, shallowFreezeArray2D} from "./utils";

const createFrozenGrid = <T>(array2D: T[][], position?: OptionalPosition): Readonly<GridObject<T>> => {
    const x = position && position.x || 0;
    const y = position && position.y || 0;
    const _array2D = shallowFreezeArray2D(correctEmptyArray2D(cloneArray2D(array2D))) as T[][];
    const columnCount = getColumnCount(array2D);
    const rowCount = getRowCount(array2D);
    const cellCount = columnCount * rowCount;
    return Object.freeze({_array2D, cellCount, columnCount, rowCount, x, y});
};

/**
 * Creates a new immutable grid instance.
 *
 * @param columnCount The number of columns the new grid should have.
 * @param rowCount The number of rows the new grid should have.
 * @param x The x-position the new grid should have.
 * @param y The y-position the new grid should have.
 * @param createCell The callback function that creates to ne cell, which is called for each position of the new grid.
 * @template T The cell type.
 * @example ```js
 * const grid = createGrid({columnCount: 4, rowCount: 3, x: 1, y: 2}, (_pos, idx) => idx);
 * // => {
 * //     x: 1,
 * //     y: 2,
 * //     cellCount: 12,
 * //     columnCount: 4,
 * //     rowCount: 3,
 * //     _array2D: [
 * //         [0, 1, 2, 3],
 * //         [4, 5, 6, 7],
 * //         [8, 9, 10, 11],
 * //     ],
 * // }
 * ```
 */
export function createGrid<T>(props: CreateGridProps<T>): Grid<T> {
    const array2D = createArray2D<T>(props.columnCount, props.rowCount, props.createCell);
    return createFrozenGrid(array2D, props);
}

/**
 * Creates a new grid instance from an existing two-dimensional grid array and adds a position.
 *
 * @param array2D The array from which to create the new grid instance.
 * @param x The x-position of the new grid.
 * @param y The y-position of the new grid.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D({
 *     x: 5,
 *     y: 6,
 *     array2D: [
 *         [0, 1, 2, 3],
 *         [4, 5, 6, 7],
 *         [8, 9, 10, 11],
 *     ],
 * });
 * // => {
 * //     x: 5,
 * //     y: 6,
 * //     cellCount: 12,
 * //     columnCount: 4,
 * //     rowCount: 3,
 * //     _array2D: [
 * //         [0, 1, 2, 3],
 * //         [4, 5, 6, 7],
 * //         [8, 9, 10, 11],
 * //     ]
 * // }
 * ```
 */
export function createGridFromArray2D<T>(props: CreateGridFromArray2DProps<T>): Grid<T>;

/**
 * Creates a new grid instance from an existing two-dimensional grid array and adds a position.
 *
 * @param array2D The array from which to create the new grid instance.
 * @param x The x-position of the new grid.
 * @param y The y-position of the new grid.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0, 1, 2, 3],
 *     [4, 5, 6, 7],
 *     [8, 9, 10, 11],
 * ]);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 4,
 * //     rowCount: 3,
 * //     _array2D: [
 * //         [0, 1, 2, 3],
 * //         [4, 5, 6, 7],
 * //         [8, 9, 10, 11],
 * //     ]
 * // }
 * ```
 */
export function createGridFromArray2D<T>(array2D: T[][]): Grid<T>;

export function createGridFromArray2D<T>(...args: any): Grid<T> {
    if (Array.isArray(args[0])) {
        const array2D = args[0] as T[][];
        return createFrozenGrid(array2D, {x: 0, y: 0});
    }
    const props = args[0] as CreateGridFromArray2DProps<T>;
    return createFrozenGrid(props.array2D, props);
}
