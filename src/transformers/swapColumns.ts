import {isOutOfRange} from "../core/utils";
import {GridTransformer} from "./types";
import {map} from "./map";
import {selectColumn} from "../core/selectors";

/**
 * Creates a transformer that swaps two columns at the given x-positions.
 * If one or both x-positions are outside of the grid, the original grid is returned without any transformations.
 *
 * @param x1 The x-position of the first column.
 * @param x2 The x-position of the second column.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0,  1,  2],
 *     [3,  4,  5],
 *     [6,  7,  8],
 *     [9, 10, 11],
 * ]);
 * const newGrid = swapColumns(1, 2)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 3,
 * //     rowCount: 4,
 * //     array2D: [
 * //         [0,  2,  1],
 * //         [3,  5,  4],
 * //         [6,  8,  7],
 * //         [9, 11, 10],
 * //     ],
 * // }
 * ```
 */
export function swapColumns<T>(x1: number, x2: number): GridTransformer<T> {
    return (grid) => {
        const x1Outside = isOutOfRange(x1, grid.columnCount);
        const x2Outside = isOutOfRange(x2, grid.columnCount);

        if (x1Outside || x2Outside) {
            return grid;
        }

        const col1 = selectColumn({grid, x: x1}) as T[];
        const col2 = selectColumn({grid, x: x2}) as T[];

        return map<T>((cell, {x, y}) => {
            if (x === x1) {
                return col2[y];
            }
            if (x === x2) {
                return col1[y];
            }
            return cell;
        })(grid);
    };
}
