/**
 * Describes the number of rows and columns of grid.
 * @since 0.11.1
 */
export interface Shape {
    /** The number of columns of the grid. */
    columnCount: number,

    /** The number of rows of the grid. */
    rowCount: number,
}

/**
 * A Shape with an additional cellCount property.
 * @since 0.11.1
 */
export interface AdvancedShape extends Shape {
    /** The number of cells of a grid. */
    cellCount: number,
}

/**
 * A position on the grid with an x- and a y-value.
 * @since 0.11.1
 */
export interface Position {
    x: number,
    y: number,
}

/**
 * A position on the grid with optional x- and a y-value.
 * @since 0.11.1
 */
export interface OptionalPosition {
    x?: number,
    y?: number,
}

/**
 * Describes the position and shape of an area on the grid.
 * @since 0.11.1
 */
export interface Area extends Position, Shape {}

/**
 * Properties to create a grid.
 * @since 0.11.1
 */
export interface CreateGridProps<T> extends Shape {
    /** The callback function that creates to ne cell, which is called for each position of the new grid. */
    createCell: CellFactory<T>,
    /** The x-position the new grid should have. */
    x?: number,
    /** The y-position the new grid should have. */
    y?: number,
}

/**
 * Properties to create a grid from a grid array.
 * @since 0.11.1
 */
export interface CreateGridFromArray2DProps<T> {
    /** The array from which to create the new grid instance. */
    array2D: T[][],
    /** The x-position of the new grid. */
    x?: number,
    /** The y-position of the new grid. */
    y?: number,
}

/**
 * A plain grid object, which can be considered as a Grid instance without getter functions.
 * @template T The cell type.
 * @since 0.11.1
 */
export interface GridObject<T = any> extends Area, AdvancedShape {
    /** The two-dimensional grid data array that stores the cells. */
    array2D: T[][],
}

/**
 * An immutable grid object with additional getter methods.
 * @template T The cell type.
 * @since 0.11.1
 */
export type Grid<T = any> = Readonly<GridObject<T>>;

/**
 * The grid position and cell index of the current iteration.
 * @since 0.11.1
 */
export interface GridIterationResult {
    /** The position of the current iteration step. */
    readonly position: Position,

    /** The index of the current iteration step. */
    readonly index: number,
}

/**
 * Takes the shape of a grid and the current iteration step (or index) and calculates the respective position.
 * @since 0.11.1
 */
export interface GridWalker {
    /**
     * @param shape The shape of the grid to traverse.
     * @param index The current iteration step (index).
     * @returns The position for the given iteration step (index).
     */
    (shape: AdvancedShape, index: number): Position
}

/**
 * Creates a new cell value, based on the position and index.
 * @template T The type of the cell.
 * @since 0.11.1
 */
export interface CellFactory<T> {
    /**
     * @param position The position of the cell to create.
     * @param index The index of the cell to create.
     * @returns The new cell.
     */
    (position: Position, idx: number): T
}

/**
 * Creates a grid walker to iterate over a grid.
 * @since 0.11.1
 */
export interface WalkerFactory {
    /**
     * @param shape The size of the grid.
     * @param walk The walker function that calculates the positions for the iteration steps.
     * @returns A new grid iterator.
     */
    (shape: AdvancedShape, walk?: GridWalker): Generator<GridIterationResult>
}
