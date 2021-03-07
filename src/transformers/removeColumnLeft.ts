import {GridTransformer} from "./types";
import {removeColumn} from "./removeColumn";

/**
 * Creates a transformer that removes the most left column.
 *
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9],
 * ]);
 * const newGrid = removeColumnLeft()(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 6,
 * //     columnCount: 2,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [2, 3],
 * //         [5, 6],
 * //         [8, 9],
 * //     ],
 * // }
 * ```
 */
export function removeColumnLeft<T>(): GridTransformer<T> {
    return removeColumn(0);
}
