import {createGrid, createGridFromArray2D} from "../core/grid";
import {selectCell} from "../core/selectors";
import {GridTransformer} from "./types";

const validateColumnSizes = <T>(rows: T[][], columnCount: number) => {
    for (const row of rows) {
        if (columnCount !== row.length) {
            return false;
        }
    }
    return true;
};

/**
 * Creates a transformer that adds the given rows at the given y-position.
 *
 * @param y The y-position of where to add the rows.
 * @param rows The rows to add.
 * @template T The cell type.
 * @since 0.11.8
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 * const newRows = [
 *     [ 7,  8,  9],
 *     [10, 11, 12],
 * ];
 * const newGrid = addRows(1, newRows)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 3,
 * //     rowCount: 4,
 * //     array2D: [
 * //         [ 1,  2,  3],
 * //         [ 7,  8,  9],
 * //         [10, 11, 12],
 * //         [ 4,  5,  6],
 * //     ],
 * // }
 * ```
 */
export function addRows<T>(y: number, rows: T[][]): GridTransformer<T> {
    return (grid) => {
        if (!rows.length) {
            return grid;
        }

        const gridHasRows = grid.rowCount > 0;
        const compatibleColumnCount = validateColumnSizes(rows, grid.columnCount);

        if (gridHasRows && !compatibleColumnCount) {
            throw new TypeError("Incompatible number of columns");
        }

        if (y <= 0) {
            return createGridFromArray2D({...grid, array2D: [...rows, ...grid.array2D]});
        }

        if (y >= grid.rowCount) {
            return createGridFromArray2D({...grid, array2D: [...grid.array2D, ...rows]});
        }

        const yStart = y;
        const yEnd = y + rows.length;
        return createGrid({
            ...grid,
            rowCount: grid.rowCount + rows.length,
            createCell: (pos) => {
                if (pos.y < yStart) {
                    return selectCell({...pos, grid}) as T;
                }
                if (pos.y >= yEnd) {
                    return selectCell({...pos, y: pos.y - rows.length, grid}) as T;
                }
                return rows[pos.y - y][pos.x];
            },
        });
    };
}
