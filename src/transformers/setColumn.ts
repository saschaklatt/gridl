import {GridTransformer} from "./types";
import {createGridFromArray2D} from "../core/grid";

/**
 * Creates a transformer that replaces the column at the given x-positon with the given column.
 *
 * @param x The x-position of the column to be replaced.
 * @param column The new column to replace the old one.
 * @param yOffset An optional offset to shift the new column on the y-axis.
 * @template T The cell type.
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [0, 0, 0],
 *     [0, 0, 0],
 *     [0, 0, 0],
 * ]);
 * const newColumn = [6, 6, 6];
 * const newGrid = setColumn(0, newColumn)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     _array2D: [
 * //         [6, 0, 0],
 * //         [6, 0, 0],
 * //         [6, 0, 0],
 * //     ],
 * // }
 * ```
 */
export function setColumn<T>(x: number, column: T[], yOffset = 0): GridTransformer<T> {
    return (grid) => {
        if (x < 0 || x >= grid.columnCount) {
            return grid;
        }

        const array2D = grid._array2D.map((row, y) => {
            return row.map((oldCell, curX) => {
                // different column
                if (curX !== x) {
                    return oldCell;
                }

                // use old cells when smaller than yOffset
                if (y - yOffset < 0) {
                    return oldCell;
                }

                // use new cells between yOffset and column.length
                if (y - yOffset < column.length) {
                    return column[y - yOffset];
                }

                // use old cells when greater than column.length
                else {
                    return oldCell;
                }
            });
        });
        return createGridFromArray2D({...grid, array2D});
    };
}
