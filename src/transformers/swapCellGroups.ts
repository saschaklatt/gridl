import {Position, Shape} from "../core";
import {selectCell, selectSubGrid} from "../core/selectors";
import {addPositions, isWithinArea, subtractPositions} from "../core/utils";
import {map} from "./map";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that swaps two cell groups.
 * If cells of a group are outside the grid, the swapped cell value will be undefined.
 * Watch out when swapping overlapping cell groups: Overlapping cells are duplicated and replace other cells.
 *
 * @param shape The shape of the groups to swap.
 * @param positionA The position of the top left corner of the first group to be swapped.
 * @param positionB The position of the top left corner of the second group to be swapped.
 * @template T The cell type.
 * @since 0.11.7
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [ 0,  1,  2,  3],
 *     [ 4,  5,  6,  7],
 *     [ 8,  9, 10, 11],
 * ]);
 * const shape = {columnCount: 2, rowCount: 2};
 * const positionA = {x: 0, y: 0};
 * const positionB = {x: 2, y: 2};
 * const newGrid = swapCellGroups(shape, positionA, positionB)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [ 6,  7,  2,  3],
 * //         [10, 11,  0,  1],
 * //         [ 8,  9,  4,  5],
 * //     ],
 * // }
 * ```
 */
export function swapCellGroups<T>(shape: Shape, positionA: Position, positionB: Position): GridTransformer<T | undefined> {
    return (grid) => {
        const subgridA = selectSubGrid({grid, area: {...shape, ...positionA}, includeOutsideValues: true});
        const subgridB = selectSubGrid({grid, area: {...shape, ...positionB}, includeOutsideValues: true});

        return map<T | undefined>((cellValue, globalPos) => {
            if (isWithinArea(globalPos, subgridA)) {
                const localPos = subtractPositions(globalPos, subgridA);
                return selectCell({grid, ...addPositions(subgridB, localPos)});
            }
            if (isWithinArea(globalPos, subgridB)) {
                const localPos = subtractPositions(globalPos, subgridB);
                return selectCell({grid, ...addPositions(subgridA, localPos)});
            }
            return cellValue;
        })(grid);
    };
}
