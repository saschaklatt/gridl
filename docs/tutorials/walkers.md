A grid can be traversed with a walker. A walker is a [generator function](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Generator) that iterates from one cell to the next by calling the walker's `next()` method. 

```js
import {createWalker} from "gridl/core";

const grid = createGridFromArray2D([
    [1, 1, 1],
    [1, 1, 1],
]);
const walker = createWalker(grid);
walker.next(); // => {value: {index: 0, position: {x: 0, y: 0}}, done: false}
walker.next(); // => {value: {index: 1, position: {x: 1, y: 0}}, done: false}
walker.next(); // => {value: {index: 2, position: {x: 2, y: 0}}, done: false}
walker.next(); // => {value: {index: 3, position: {x: 0, y: 1}}, done: false}
walker.next(); // => {value: {index: 4, position: {x: 1, y: 1}}, done: false}
walker.next(); // => {value: {index: 5, position: {x: 2, y: 1}}, done: false}
walker.next(); // => {value: undefined, done: true}
```

The order in which the walker traverses the grid is determined by the specified `walk` function, which by default is [[walkWENS | walkWENS()]]. `WENS` stands for "West", "East", "North", "South", which means that the grid is traversed from West to East and from North to South. A `walk` function takes a cell index (positive integer between 0 and the number of cells minus 1) and calculates the associated position on the grid.

```js
import {createWalker, walkSNWE} from "gridl/core";

const grid = createGridFromArray2D([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11]
]);
const walker = createWalker(grid, walkSNWE);

// traversing order using walkSNWE would be:
// [
//     [3, 7, 11],
//     [2, 6, 10],
//     [1, 5,  9],
//     [0, 4,  8],
// ]
```

Walkers are used by all iterating functions such as [[forEachCell]], [[reduceGrid]], [[findCell]], [[findPosition]], etc. This allows you to walk the grid in a very flexible way. gridl offers walk functions for all cardinal directions, whereby the walker always moves from one cell to an immediate neighbouring cell. However, you can also define your own walkers and walk functions that iterate in a completely different way.

```js
import {createWalker, walkSNWE} from "gridl/core";
import {forEachCell} from "gridl/sideEffects";

const grid = createGridFromArray2D([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11]
]);
const arr = [];

forEachCell(grid, (cellValue) => {
    arr.push(cellValue);
}, walkSNWE);

// => arr is: [9, 6, 3, 0, 10, 7, 4, 1, 11, 8, 5, 2]
```