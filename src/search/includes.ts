import {Grid, GridWalker} from "../core/types";
import {createWalker} from "../core/walker";
import {selectCell} from "../core/selectors";

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
 *     [1, 1, 1, 4],
 *     [5, 6, 2, 8],
 *     [0, 2, 3, 4],
 * ]);
 * includes(grid, 2); // => true
 * includes(grid, 10); // => false
 * ```
 */
export const includes = <T>(grid: Grid<T>, cell: T, walk?: GridWalker): boolean => {
    const walker = createWalker(grid, walk);
    let iteration = walker.next();

    while (!iteration.done) {
        const value = selectCell({...iteration.value.position, grid});
        if (value === cell) {
            return true;
        }
        iteration = walker.next();
    }

    return false;
};
