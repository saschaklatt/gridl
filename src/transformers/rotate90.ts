import {Grid} from "../core/types";
import {GridTransformer} from "./types";
import {createArray, reverseArray} from "../core/utils";
import {createGridFromArray2D} from "../core/grid";
import {selectColumn} from "../core/selectors";

/** @internal */
const _rotateNone = <T>(grid: Grid<T>) => grid;

/** @internal */
const _rotateClockwiseOneTime = <T>(grid: Grid<T>): Grid<T> => {
    const array2D = createArray(grid.columnCount, (y) => {
        const column = selectColumn({grid, x: y}) as T[];
        return reverseArray(column);
    });
    return createGridFromArray2D({...grid, array2D});
};

/** @internal */
const _rotateClockwiseTwoTimes = <T>(grid: Grid<T>) => {
    const array2D = reverseArray(grid.array2D.map((row) => reverseArray(row)));
    return createGridFromArray2D({...grid, array2D});
};

/** @internal */
const _rotateClockwiseThreeTimes = <T>(grid: Grid<T>) => {
    const array2D = createArray(grid.columnCount, (y) => {
        return selectColumn({grid, x: grid.columnCount - y - 1}) as T[];
    });
    return createGridFromArray2D({...grid, array2D});
};

/** @internal */
const _rotationFunctions = [
    _rotateNone,
    _rotateClockwiseOneTime,
    _rotateClockwiseTwoTimes,
    _rotateClockwiseThreeTimes,
];

/**
 * Rotates a grid by 90 degrees `times` times.
 *
 * @param times The number of times to rotate the array by 90 degrees. Positives integers rotate clockwise, whereas negative rotate counterclockwise.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0, 1,  2,  3],
 *     [4, 5,  6,  7],
 *     [8, 9, 10, 11],
 * ]);
 * // 1 step can be thought of as 90 degrees, 2 steps 180 degrees and so on
 * const steps = 1;
 * const rotatedGrid = rotate90(steps)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 3,
 * //     rowCount: 4,
 * //     array2D: [
 * //         [ 8, 4, 0],
 * //         [ 9, 5, 1],
 * //         [10, 6, 2],
 * //         [11, 7, 3],
 * //     ],
 * // }
 * ```
 */
export function rotate90<T>(times: number): GridTransformer<T> {
    return (grid) => {
        const directionCount = _rotationFunctions.length;
        const mod = times % directionCount;
        const fnIdx = mod < 0 ? mod + directionCount : mod;
        const rotate: GridTransformer<T> = _rotationFunctions[fnIdx];
        return rotate(grid);
    };
}
