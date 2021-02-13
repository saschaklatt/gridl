import {SurroundingDirections} from "./directions";
import {createGridFromArray2D} from "./grid";
import {Area, Grid, Position} from "./types";
import {addPositions, clamp, createArray, cropArray2D, isOutOfShape, isOutOfRange, getColumnCount, getRowCount} from "./utils";

/**
 * Props for {@link selectCell}.
 * @template T The cell type.
 */
interface SelectCellProps<T> extends Position {
    /** The grid that contains the cell value. */
    grid: Grid<T>,
}

/**
 * Returns the cell value at the given position.
 * @param props The properties.
 * @template T The cell type.
 */
export const selectCell = <T>(props: SelectCellProps<T>) => {
    const {x, y, grid} = props;
    return isOutOfShape(props, grid) ? undefined : grid._array2D[y][x];
};

/**
 * Properties for {@link selectRow}.
 * @template T The cell type.
 */
interface SelectRowProps<T> {
    /** The y-position of the row to select. */
    y: number,

    /** The grid. */
    grid: Grid<T>,
}

/**
 * Returns the row at the given y-position or undefined if the row doesn't exist.
 * @param props The properties.
 * @template T The cell type.
 */
export const selectRow = <T>(props: SelectRowProps<T>) => {
    const {grid, y} = props;
    return grid && grid._array2D && grid._array2D[y] && [...grid._array2D[y]] || undefined;
};

/**
 * Properties for {@link selectColumn}.
 * @template T The cell type.
 */
interface SelectColumnProps<T> {
    /** The x-position of the column to select. */
    x: number,

    /** The grid. */
    grid: Grid<T>,
}

/**
 * Returns the column at the given x-position or undefined if the column doesn't exist.
 * @param props The properties.
 * @template T The cell type.
 */
export const selectColumn = <T>(props: SelectColumnProps<T>) => {
    const {x, grid} = props;
    const maxX = getColumnCount(grid._array2D);
    return isOutOfRange(x, maxX)
        ? undefined
        : createArray(getRowCount(grid._array2D), (y) => selectCell({x, y, grid}) as T);
};

/**
 * Properties for {@link selectSubGrid}.
 * @template T The cell type.
 */
interface SelectSubGridProps<T> {
    /** The grid. */
    grid: Grid<T>,

    /** The x-position of the column to select. */
    area: Area,
}

/**
 * Returns a subset of the grid defined by given coordinates.
 * @param props The properties.
 * @template T The cell type.
 */
export const selectSubGrid = <T>(props: SelectSubGridProps<T>) => {
    const {grid, area} = props;
    const xMin = clamp(0, grid.columnCount, area.x);
    const yMin = clamp(0, grid.rowCount, area.y);
    const xMax = clamp(0, grid.columnCount, area.x + area.columnCount);
    const yMax = clamp(0, grid.rowCount, area.y + area.rowCount);
    const array2D = cropArray2D<T>(xMin, yMin, xMax, yMax)(grid._array2D);
    return createGridFromArray2D({array2D, x: xMin, y: yMin});
};

/**
 * Properties for {@link selectNeighbours}.
 * @template T The cell type.
 */
export interface SelectNeighboursProps<T> {
    /** The positions of the cell you are particularly interested in, relative to the given cell. This can be any position relative to the given position. Duplicate positions are possible as well. */
    positions?: readonly Position[],

    /** If `true`, no entry for neighbour cells that are outside the grid is returned, if `false`, `undefined` is returned instead of the cell's value. */
    skipOutsiders?: boolean,

    /** The grid. */
    grid: Grid<T>,

    /** The origin position from which to select the neighbours. */
    origin: Position,
}

/**
 * A neighbour cell and its position on the grid.
 * @template T The cell type.
 */
export interface SelectNeighboursResult<T> {
    /** The position of the neighbour cell. */
    position: Position,

    /** The neighbour cell. */
    cell: T,
}

/**
 * Returns the neighbouring cells of the given origin with the grid.
 * @param grid The grid.
 * @param origin The position of the cell whose neighbours you want to have.
 * @param options Further options.
 * @template T The cell type.
 */
export const selectNeighbours = <T>(props: SelectNeighboursProps<T>): SelectNeighboursResult<T | undefined>[] => {
    const {grid, origin} = props;
    const positions = props.positions || SurroundingDirections;
    const skipOutsiders = props && props.skipOutsiders || false;
    return positions.reduce((acc, relPos) => {
        const absPos = addPositions(origin, relPos);
        const cell = selectCell({...absPos, grid});
        const neighbour = {position: absPos, cell};
        return (skipOutsiders && isOutOfShape(absPos, grid)) ? acc : [...acc, neighbour];
    }, [] as SelectNeighboursResult<T | undefined>[]);
};
