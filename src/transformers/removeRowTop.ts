import {GridTransformer} from "./types";
import {removeRow} from "./removeRow";

/**
 * Creates a transformer that removes the top row.
 *
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9],
 * ]);
 * const newGrid = removeRowTop()(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 6,
 * //     columnCount: 3,
 * //     rowCount: 2,
 * //     _array2D: [
 * //         [4, 5, 6],
 * //         [7, 8, 9],
 * //     ],
 * // }
 * ```
 */
export function removeRowTop<T>(): GridTransformer<T> {
    return removeRow<T>(0);
}
