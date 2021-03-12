import {Grid} from "../core/types";

/**
 * Returns true if the includes no values.
 *
 * @param grid The grid to be checked.
 * @template T The cell type.
 * @since 0.11.3
 *
 * @example ```js
 * isEmptyGrid(
 *     createGrid({
 *         columnCount: 0,
 *         rowCount: 0,
 *         createCell: () => 7,
 *     })
 * ); // => true
 * ```
 */
export function isEmptyGrid<T>(grid: Grid<T>): boolean {
    return !grid || grid.cellCount === 0;
}
