import {Area} from "../core/types";
import {GridTransformer} from "./types";
import {crop} from "./crop";
import {getIntersectingArea} from "../core/utils";

/**
 * Cuts out the intersecting grid of two grids.
 *
 * @param area The other grid to intersect with.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [ 0,  1,  2,  3,  4],
 *     [ 5,  6,  7,  8,  9],
 *     [10, 11, 12, 13, 14],
 *     [15, 16, 17, 18, 19],
 *     [20, 21, 22, 23, 24],
 * ]);
 * const area = {columnCount: 3, rowCount: 3, x: 2, y: 1};
 * const newGrid = cropIntersection(area)(grid);
 * // => {
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     x: 2,
 * //     y: 1,
 * //     array2D: [
 * //         [ 7,  8,  9],
 * //         [12, 13, 14],
 * //         [17, 18, 19],
 * //     ],
 * // }
 * ```
 */
export function cropIntersection<T>(area: Area): GridTransformer<T> {
    return (grid) => crop<T>(getIntersectingArea(grid, area))(grid);
}
