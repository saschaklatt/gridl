import {Grid} from "../core/types";
import {_findWinner} from "./_helpers";

/**
 * Finds the minimum value in the grid by comparing values with the less than operator.
 *
 * @param grid The grid in which to search.
 * @template T The cell type.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [2, 9, 2, 4],
 *     [5, 6, 2, 8],
 *     [1, 2, 3, 4],
 * ]);
 * findMin(grid); // => 1
 * ```
 */
export const findMin = <T>(grid: Grid<T>): T | undefined => {
    return _findWinner(grid, (prevCell, cell) => prevCell < cell);
};
