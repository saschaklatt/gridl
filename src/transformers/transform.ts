import {Grid} from "../core/types";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that combines a series of other transformers and applies them to the grid one by one.
 *
 * @param transformers The list of transformers to apply.
 * @template T The cell type.
 * @example ```js
 * const oldGrid = createGridFromArray2D([
 *     [0, 0, 0, 0],
 *     [0, 0, 0, 0],
 *     [0, 0, 0, 0],
 * ]);
 * const newGrid = transform(
 *     map((_cell, pos) => pos.x < 2 ? 1 : 2),
 *     setCell({x: 2, y: 1}, 666),
 *     rotate90(1),
 *     removeRow(1),
 * )(oldGrid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     _array2D: [
 * //         [1, 1, 1],
 * //         [2, 666, 2],
 * //         [2, 2, 2],
 * //     ],
 * // }
 * ```
 */
export const transform = <T>(...transformers: GridTransformer<T>[]): GridTransformer<T> => {
    return (initialGrid: Grid<T>): Grid<T> => {
        return transformers.reduce((acc, t) => t(acc), initialGrid);
    };
};
