import {GridTransformer} from "./types";
import {map} from "./map";

/**
 * Creates a transformer that fills all cells of the grid with the given value.
 *
 * @param value The value to fill the grid with.
 * @template T The type of the original cell values.
 * @template U The type of the new cell values.
 * @since 0.11.1
 * @example ```js
 * const grid = createGrid({columnCount: 4, rowCount: 5, createCell: () => 0});
 * const newGrid = fill(6)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 20,
 * //     columnCount: 4,
 * //     rowCount: 5,
 * //     array2D: [
 * //         [6, 6, 6, 6],
 * //         [6, 6, 6, 6],
 * //         [6, 6, 6, 6],
 * //         [6, 6, 6, 6],
 * //         [6, 6, 6, 6],
 * //     ],
 * // }
 */
export function fill<T, U = T>(value: U): GridTransformer<T, U> {
    return map(() => value);
}
