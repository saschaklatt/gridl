import {createGridFromArray2D} from "../core/grid";
import {reverseArray} from "../core/utils";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that mirrors the grid horizontally.
 *
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0,  1,  2],
 *     [3,  4,  5],
 *     [6,  7,  8],
 *     [9, 10, 11],
 * ]);
 * const mirroredGrid = mirrorHorizontally()(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 3,
 * //     rowCount: 4,
 * //     array2D: [
 * //         [9, 10, 11],
 * //         [6,  7,  8],
 * //         [3,  4,  5],
 * //         [0,  1,  2],
 * //     ],
 * // }
 * ```
 */
export function mirrorHorizontally<T>(): GridTransformer<T> {
    return (grid) => createGridFromArray2D({...grid, array2D: reverseArray(grid.array2D)});
}

