import {Grid, Position} from "../core/types";

/**
 * Callback function that is called in the find methods for each cell.
 *
 * @param cellValue The cell value of the current iteration step.
 * @param position The position of the current iteration step.
 * @param index The index of the current iteration step.
 * @param src The grid that is currently being traversed.
 * @template T The cell type.
 */
export interface FindCallback<T> {
    (cellValue: T, position: Position, index: number, src: Grid<T>): boolean;
}
