import {GridTransformer} from "./types";
import {removeColumn} from "./removeColumn";

/**
 * Creates a transformer that removes the most right column.
 *
 * @template T The cell type.
 * @since 0.11.1
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9],
 * ]);
 * const newGrid = removeColumnRight()(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 6,
 * //     columnCount: 2,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [1, 2],
 * //         [4, 5],
 * //         [7, 8],
 * //     ],
 * // }
 * ```
 */
export function removeColumnRight<T>(): GridTransformer<T> {
    return (grid) => {
        return removeColumn<T>(grid.columnCount - 1)(grid);
    };
}
