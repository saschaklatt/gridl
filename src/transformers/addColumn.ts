import {createGridFromArray2D} from "../core/grid";
import {clamp} from "../core/utils";
import {Grid} from "../core/types";
import {GridTransformer} from "./types";

const addFirstColumn = <T>(column: T[]): T[][] => {
    return column.reduce((newGrid, cell) => {
        const newRow = [cell];
        return [
            ...newGrid,
            newRow,
        ];
    }, [] as T[][]);
};

const addNthColumn = <T>(column: T[], x: number, grid: Grid<T>): T[][] => {
    return grid.array2D.map((row, i) => {
        const newRow = [...row];
        newRow.splice(x, 0, column[i]);
        return newRow;
    });
};

/**
 * Creates a transformer that adds the given column at the given x-position.
 *
 * @param x The x-position of where to add the column.
 * @param column The column to add.
 * @template T The cell type.
 * @example ```js
 * const x = 1;
 * const y = 2;
 * const grid = createGridFromArray2D({
 *     x,
 *     y,
 *     array2D: [
 *         [1, 2, 3],
 *         [4, 5, 6],
 *     ],
 * });
 * const newCol = [8, 9];
 * const newGrid = addColumn(1, newCol)(grid);
 * // => {
 * //    x: 1,
 * //    y: 2,
 * //    cellCount: 8,
 * //    rowCount: 2,
 * //    columnCount: 4,
 * //    array2D: [
 * //        [1, 8, 2, 3],
 * //        [4, 9, 5, 6],
 * //    ],
 * // }
 * ```
 */
export function addColumn<T>(x: number, column: T[]): GridTransformer<T> {
    return (grid) => {
        const hasRows = grid.rowCount > 0;
        if (hasRows && column.length !== grid.rowCount) {
            throw new TypeError();
        }

        const sanitizedX = clamp(0, grid.columnCount, x);
        const array2D = hasRows ? addNthColumn(column, sanitizedX, grid) : addFirstColumn(column);
        return createGridFromArray2D({...grid, array2D});
    };
}
