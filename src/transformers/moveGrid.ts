import {createGridFromArray2D} from "../core/grid";
import {Position} from "../core/types";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that moves the grid to the given position.
 *
 * @param position The position of where to move the grid.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9],
 * ]);
 * moveGrid({x: -2, y: -4})(grid); // => {...grid, x: -2, y: -4});
 * ```
 */
export function moveGrid<T>(position: Position): GridTransformer<T> {
    return (grid) => createGridFromArray2D({...position, array2D: grid.array2D});
}
