import {createGrid} from "../core/grid";
import {selectCell} from "../core/selectors";
import {clamp} from "../core/utils";
import {GridTransformer} from "./types";

const validateRowSizes = <T>(columns: T[][], gridRowCount: number) => {
    for (const column of columns) {
        if (gridRowCount !== column.length) {
            return false;
        }
    }
    return true;
};

/**
 * Creates a transformer that adds the given columns at the given x-position.
 *
 * @param x The x-position of where to add the columns.
 * @param columns The columns to add.
 * @template T The cell type.
 * @since 0.11.9
 * @example ```ts
 * ```
 */
export function addColumns<T>(x: number, columns: T[][]): GridTransformer<T> {
    return (grid) => {
        if (!columns.length) {
            return grid;
        }

        const gridHasRows = grid.rowCount > 0;
        const compatibleRowCount = validateRowSizes(columns, grid.rowCount);

        if (gridHasRows && !compatibleRowCount) {
            throw new TypeError("Incompatible number of rows");
        }

        const clampedX = clamp(0, grid.columnCount, x);
        const xNewStart = clampedX;
        const xNewEnd = clampedX + columns.length;

        const rowCount = gridHasRows ? grid.rowCount : columns[0].length;
        const columnCount = grid.columnCount + columns.length;

        return createGrid({
            ...grid,
            rowCount,
            columnCount,
            createCell: (pos) => {
                if (pos.x < xNewStart) {
                    return selectCell({...pos, grid}) as T;
                }
                if (pos.x >= xNewEnd) {
                    return selectCell({...pos, x: pos.x - columns.length, grid}) as T;
                }
                return columns[pos.x - clampedX][pos.y];
            },
        });
    };
}
