import {GridWalker, WalkerFactory} from './types';

/**
 * Converts a grid index into a grid position, going from east to west and north to south (EWNS).
 *
 * @param shape - The shape to iterate over. Note that since a grid implements the Shape interface, you can just pass in the grid as well.
 * @param index - The index to be converted.
 * @returns The grid position according to the given index.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [ 2,  1, 0],
 *     [ 5,  4, 3],
 *     [ 8,  7, 6],
 *     [11, 10, 9],
 * ]);
 * walkEWNS(grid,  0); // => {x: 2, y: 0}
 * walkEWNS(grid,  1); // => {x: 1, y: 0}
 * walkEWNS(grid,  2); // => {x: 0, y: 0}
 * walkEWNS(grid,  3); // => {x: 2, y: 1}
 * walkEWNS(grid,  4); // => {x: 1, y: 1}
 * walkEWNS(grid,  5); // => {x: 0, y: 1}
 * walkEWNS(grid,  6); // => {x: 2, y: 2}
 * walkEWNS(grid,  7); // => {x: 1, y: 2}
 * walkEWNS(grid,  8); // => {x: 0, y: 2}
 * walkEWNS(grid,  9); // => {x: 2, y: 3}
 * walkEWNS(grid, 10); // => {x: 1, y: 3}
 * walkEWNS(grid, 11); // => {x: 0, y: 3}
 * ```
 */
export const walkEWNS: GridWalker = (shape, index) => {
    const {columnCount} = shape;
    const x = columnCount - index % columnCount - 1;
    const y = Math.floor(index / columnCount);
    return {x, y};
};

/**
 * Converts a grid index into a grid position, going from east to west and south to north (EWSN).
 *
 * @param shape - The grid shape to iterate. Note that since a grid implements the Shape interface, you can just provide a grid instance as well.
 * @param index - The index to be converted.
 * @returns The grid position according to the given index.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [11, 10, 9],
 *     [ 8,  7, 6],
 *     [ 5,  4, 3],
 *     [ 2,  1, 0],
 * ]);
 * walkEWSN(grid,  0); // => {x: 2, y: 3}
 * walkEWSN(grid,  1); // => {x: 1, y: 3}
 * walkEWSN(grid,  2); // => {x: 0, y: 3}
 * walkEWSN(grid,  3); // => {x: 2, y: 2}
 * walkEWSN(grid,  4); // => {x: 1, y: 2}
 * walkEWSN(grid,  5); // => {x: 0, y: 2}
 * walkEWSN(grid,  6); // => {x: 2, y: 1}
 * walkEWSN(grid,  7); // => {x: 1, y: 1}
 * walkEWSN(grid,  8); // => {x: 0, y: 1}
 * walkEWSN(grid,  9); // => {x: 2, y: 0}
 * walkEWSN(grid, 10); // => {x: 1, y: 0}
 * walkEWSN(grid, 11); // => {x: 0, y: 0}
 * ```
 */
export const walkEWSN: GridWalker = (shape, index) => {
    const {columnCount, cellCount} = shape;
    const reverseIndex = cellCount - index - 1;
    const x = reverseIndex % columnCount;
    const y = Math.floor(reverseIndex / columnCount);
    return {x, y};
};

/**
 * Converts a grid index into a grid position, going from north to south and east to west (NSEW).
 *
 * @param shape - The grid shape to iterate. Note that since a grid implements the Shape interface, you can just provide a grid instance as well.
 * @param index - The index to be converted.
 * @returns The grid position according to the given index.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [ 8, 4, 0],
 *     [ 9, 5, 1],
 *     [10, 6, 2],
 *     [11, 7, 3],
 * ]);
 * walkNSEW(grid,  0); // => {x: 2, y: 0}
 * walkNSEW(grid,  1); // => {x: 2, y: 1}
 * walkNSEW(grid,  2); // => {x: 2, y: 2}
 * walkNSEW(grid,  3); // => {x: 2, y: 3}
 * walkNSEW(grid,  4); // => {x: 1, y: 0}
 * walkNSEW(grid,  5); // => {x: 1, y: 1}
 * walkNSEW(grid,  6); // => {x: 1, y: 2}
 * walkNSEW(grid,  7); // => {x: 1, y: 3}
 * walkNSEW(grid,  8); // => {x: 0, y: 0}
 * walkNSEW(grid,  9); // => {x: 0, y: 1}
 * walkNSEW(grid, 10); // => {x: 0, y: 2}
 * walkNSEW(grid, 11); // => {x: 0, y: 3}
 * ```
 */
export const walkNSEW: GridWalker = (shape, index) => {
    const {columnCount, rowCount} = shape;
    const x = columnCount - Math.floor(index / rowCount) - 1;
    const y = index % rowCount;
    return {x, y};
};

/**
 * Converts a grid index into a grid position, going from north to south and west to east (NSWE).
 *
 * @param shape - The grid shape to iterate. Note that since a grid implements the Shape interface, you can just provide a grid instance as well.
 * @param index - The index to be converted.
 * @returns The grid position according to the given index.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0, 4,  8],
 *     [1, 5,  9],
 *     [2, 6, 10],
 *     [3, 7, 11],
 * ]);
 * walkNSWE(grid,  0)); // => {x: 0, y: 0}
 * walkNSWE(grid,  1)); // => {x: 0, y: 1}
 * walkNSWE(grid,  2)); // => {x: 0, y: 2}
 * walkNSWE(grid,  3)); // => {x: 0, y: 3}
 * walkNSWE(grid,  4)); // => {x: 1, y: 0}
 * walkNSWE(grid,  5)); // => {x: 1, y: 1}
 * walkNSWE(grid,  6)); // => {x: 1, y: 2}
 * walkNSWE(grid,  7)); // => {x: 1, y: 3}
 * walkNSWE(grid,  8)); // => {x: 2, y: 0}
 * walkNSWE(grid,  9)); // => {x: 2, y: 1}
 * walkNSWE(grid, 10)); // => {x: 2, y: 2}
 * walkNSWE(grid, 11)); // => {x: 2, y: 3}
 * ```
 */
export const walkNSWE: GridWalker = (shape, index) => {
    const {rowCount} = shape;
    const x = Math.floor(index / rowCount);
    const y = index % rowCount;
    return {x, y};
};

/**
 * Converts a grid index into a grid position, going from south to north and east to west (SNEW).
 *
 * @param shape - The grid shape to iterate. Note that since a grid implements the Shape interface, you can just provide a grid instance as well.
 * @param index - The index to be converted.
 * @returns The grid position according to the given index.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [11, 7, 3],
 *     [10, 6, 2],
 *     [ 9, 5, 1],
 *     [ 8, 4, 0],
 * ]);
 * walkSNEW(grid,  0); // => {x: 2, y: 3}
 * walkSNEW(grid,  1); // => {x: 2, y: 2}
 * walkSNEW(grid,  2); // => {x: 2, y: 1}
 * walkSNEW(grid,  3); // => {x: 2, y: 0}
 * walkSNEW(grid,  4); // => {x: 1, y: 3}
 * walkSNEW(grid,  5); // => {x: 1, y: 2}
 * walkSNEW(grid,  6); // => {x: 1, y: 1}
 * walkSNEW(grid,  7); // => {x: 1, y: 0}
 * walkSNEW(grid,  8); // => {x: 0, y: 3}
 * walkSNEW(grid,  9); // => {x: 0, y: 2}
 * walkSNEW(grid, 10); // => {x: 0, y: 1}
 * walkSNEW(grid, 11); // => {x: 0, y: 0}
 * ```
 */
export const walkSNEW: GridWalker = (shape, index) => {
    const {rowCount, cellCount} = shape;
    const reverseIndex = cellCount - index - 1;
    const x = Math.floor(reverseIndex / rowCount);
    const y = reverseIndex % rowCount;
    return {x, y};
};

/**
 * Converts a grid index into a grid position, going from south to north and west to east (SNWE).
 *
 * @param shape - The grid shape to iterate. Note that since a grid implements the Shape interface, you can just provide a grid instance as well.
 * @param index - The index to be converted.
 * @returns The grid position according to the given index.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [3, 7, 11],
 *     [2, 6, 10],
 *     [1, 5,  9],
 *     [0, 4,  8],
 * ]);
 * walkSNWE(grid,  0); // => {x: 0, y: 3}
 * walkSNWE(grid,  1); // => {x: 0, y: 2}
 * walkSNWE(grid,  2); // => {x: 0, y: 1}
 * walkSNWE(grid,  3); // => {x: 0, y: 0}
 * walkSNWE(grid,  4); // => {x: 1, y: 3}
 * walkSNWE(grid,  5); // => {x: 1, y: 2}
 * walkSNWE(grid,  6); // => {x: 1, y: 1}
 * walkSNWE(grid,  7); // => {x: 1, y: 0}
 * walkSNWE(grid,  8); // => {x: 2, y: 3}
 * walkSNWE(grid,  9); // => {x: 2, y: 2}
 * walkSNWE(grid, 10); // => {x: 2, y: 1}
 * walkSNWE(grid, 11); // => {x: 2, y: 0}
 * ```
 */
export const walkSNWE: GridWalker = (shape, index) => {
    const {columnCount, rowCount, cellCount} = shape;
    const reverseIndex = cellCount - index - 1;
    const x = columnCount - Math.floor(reverseIndex / rowCount) - 1;
    const y = reverseIndex % rowCount;
    return {x, y};
};

/**
 * Converts an index to a grid position, going from west to east and north to south (WENS).
 *
 * @param shape - The grid shape to iterate. Note that since a grid implements the Shape interface, you can just provide a grid instance as well.
 * @param index - The index to be converted.
 * @returns The grid position according to the given index.
 */
export const walkWENS: GridWalker = (shape, index) => {
    const {columnCount} = shape;
    const x = index % columnCount;
    const y = Math.floor(index / columnCount);
    return {x, y};
};

/**
 * Converts a grid index into a grid position, going from west to east and south to north (WESN).
 *
 * @param shape - The grid shape to iterate. Note that since a grid implements the Shape interface, you can just provide a grid instance as well.
 * @param index - The index to be converted.
 * @returns The grid position according to the given index.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [9, 10, 11],
 *     [6,  7,  8],
 *     [3,  4,  5],
 *     [0,  1,  2],
 * ]);
 * walkWESN(grid,  0)); // => {x: 0, y: 3}
 * walkWESN(grid,  1)); // => {x: 1, y: 3}
 * walkWESN(grid,  2)); // => {x: 2, y: 3}
 * walkWESN(grid,  3)); // => {x: 0, y: 2}
 * walkWESN(grid,  4)); // => {x: 1, y: 2}
 * walkWESN(grid,  5)); // => {x: 2, y: 2}
 * walkWESN(grid,  6)); // => {x: 0, y: 1}
 * walkWESN(grid,  7)); // => {x: 1, y: 1}
 * walkWESN(grid,  8)); // => {x: 2, y: 1}
 * walkWESN(grid,  9)); // => {x: 0, y: 0}
 * walkWESN(grid, 10)); // => {x: 1, y: 0}
 * walkWESN(grid, 11)); // => {x: 2, y: 0}
 * ```
 */
export const walkWESN: GridWalker = (shape, index) => {
    const {columnCount, cellCount} = shape;
    const reverseIndex = cellCount - index - 1;
    const x = columnCount - reverseIndex % columnCount - 1;
    const y = Math.floor(reverseIndex / columnCount);
    return {x, y};
};

/**
 * Alias of walkWENS
 */
export const walkDefault: GridWalker = walkWENS;

/**
 * Creates a walker that iterates over all cells with an index starting from `0` to `cellCount - 1`.
 *
 * @param shape The shape of the grid that is traversed.
 * @param walk Function that converts the iteration index into a grid position and thus determines the order in which the iterator traverses the cells. If the function is omitted the default walker walkDefault is used.
 *
 * @example ```js
 * const shape = {columnCount: 3, rowCount: 2, cellCount: 6};
 * const walker = createWalker(shape);
 *
 * walker.next(); // => {value: {index: 0, position: {x: 0, y: 0}}, done: false}
 * walker.next(); // => {value: {index: 1, position: {x: 1, y: 0}}, done: false}
 * walker.next(); // => {value: {index: 2, position: {x: 2, y: 0}}, done: false}
 * walker.next(); // => {value: {index: 3, position: {x: 0, y: 1}}, done: false}
 * walker.next(); // => {value: {index: 4, position: {x: 1, y: 1}}, done: false}
 * walker.next(); // => {value: {index: 5, position: {x: 2, y: 1}}, done: false}
 * walker.next(); // => {value: undefined, done: true}
 * ```
 */
export const createWalker: WalkerFactory = function* (shape, walk = walkDefault) {
    for (let index = 0; index < shape.cellCount; index++) {
        yield {index, position: walk(shape, index)};
    }
};
