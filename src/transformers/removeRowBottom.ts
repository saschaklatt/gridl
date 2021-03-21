import {GridTransformer} from "./types";
import {removeRow} from "./removeRow";

/**
 * Creates a transformer that removes the bottom row.
 *
 * @template T The cell type.
 * @since 0.11.1
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9],
 * ]);
 * const newGrid = removeRowBottom()(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 6,
 * //     columnCount: 3,
 * //     rowCount: 2,
 * //     array2D: [
 * //         [1, 2, 3],
 * //         [4, 5, 6],
 * //     ],
 * // }
 * ```
 */
export function removeRowBottom<T>(): GridTransformer<T> {
    return (grid) => removeRow<T>(grid.rowCount - 1)(grid);
}
