import {createGridFromArray2D} from "../core/grid";
import {reverseArray} from "../core/utils";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that mirrors a grid vertically.
 *
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0,  1,  2],
 *     [3,  4,  5],
 *     [6,  7,  8],
 *     [9, 10, 11],
 * ]);
 * const mirroredGrid = mirrorVertically()(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 3,
 * //     rowCount: 4,
 * //     _array2D: [
 * //         [ 2,  1, 0],
 * //         [ 5,  4, 3],
 * //         [ 8,  7, 6],
 * //         [11, 10, 9],
 * //     ],
 * // }
 * ```
 */
export function mirrorVertically<T>(): GridTransformer<T> {
    return (grid) => createGridFromArray2D({...grid, array2D: grid._array2D.map((row) => reverseArray(row))});
}
