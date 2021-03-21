import {Grid, GridWalker} from "../core/types";
import {FindCallback} from "./types";
import {createWalker} from "../core/walker";
import {selectCell} from "../core/selectors";

/**
 * Receives a grid and returns the position of the first element that satisfies the provided
 * testing function or equals the provided value. If no cell satisfies the testing function,
 * `undefined` is returned.
 *
 * @param grid The grid in which to search.
 * @param callback Callback function that is called on each cell. Should return `true` if the element is found or `false` if not.
 * @param walk This function calculates the grid position based on the iteration step and therefore defines the order in which the cells are iterated. If no walker is defined walkDefault is used.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 1, 1, 4],
 *     [5, 6, 2, 8],
 *     [0, 2, 3, 4],
 * ]);
 * findCell(grid, (v) => v > 2); // => 4
 * ```
 */
export const findCell = <T>(grid: Grid<T>, callback: FindCallback<T>, walk?: GridWalker): T | undefined => {
    const walker = createWalker(grid, walk);
    let iteration = walker.next();

    while (!iteration.done) {
        const {position, index} = iteration.value;
        const value = selectCell({...position, grid});
        const foundValue = value && callback(value, position, index, grid);

        if (foundValue) {
            return value;
        }

        iteration = walker.next();
    }

    return undefined;
};
