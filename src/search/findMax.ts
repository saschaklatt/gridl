import {Grid} from "../core/types";
import {_findWinner} from "./_helpers";

/**
 * Finds the maximum value in the grid by comparing values with the greater than operator.
 *
 * @param grid The grid in which to search.
 * @template T The cell type.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 1, 1, 4],
 *     [5, 6, 2, 8],
 *     [0, 2, 3, 4],
 * ]);
 * findMax(grid); // => 8
 * ```
 */
export const findMax = <T>(grid: Grid<T>): T | undefined => {
    return _findWinner(grid, (prevCell, cell) => prevCell > cell);
};
