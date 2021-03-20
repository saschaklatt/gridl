import {Grid, GridWalker} from "../core/types";
import {createWalker} from "../core/walker";
import {selectCell} from "../core/selectors";
import {FindCallback} from "./types";

/**
 * Returns true if the grid includes the given cell.
 *
 * @param grid The grid in which to search.
 * @param cell The value of the cell to search for.
 * @param walk This function calculates the grid position based on the iteration step and therefore defines the order in which the cells are iterated. If no walker is defined walkDefault is used.
 * @template T The cell type.
 * @since 0.11.5
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [{v: 1}, {v: 1}, {v: 1}, {v: 4}],
 *     [{v: 5}, {v: 6}, {v: 2}, {v: 8}],
 *     [{v: 0}, {v: 2}, {v: 3}, {v: 4}],
 * ]);
 * includesWhere(grid, (cell) => cell.v === 6); // => true
 * includesWhere(grid, (cell) => cell.v === 10); // => false
 * ```
 */
export const includesWhere = <T>(grid: Grid<T>, callback: FindCallback<T>, walk?: GridWalker): boolean => {
    const walker = createWalker(grid, walk);
    let iteration = walker.next();

    while (!iteration.done) {
        const {position, index} = iteration.value;
        const value = selectCell({...position, grid}) as T;
        const foundValue = callback(value, position, index, grid);

        if (foundValue) {
            return true;
        }

        iteration = walker.next();
    }

    return false;
};
