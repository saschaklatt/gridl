import {Grid} from "../core";

/**
 * Takes grid instance and transforms it into a new grid instance.
 * @template T The cell type of the original grid.
 * @template U The cell type of the new grid.
 * @since 0.11.1
 */
export interface GridTransformer<T, U = T> {
    /**
     * @param grid The grid to transform.
     * @returns The new grid instance.
     */
    (grid: Grid<T>): Grid<U>
}
