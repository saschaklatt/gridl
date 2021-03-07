# gridl

A functional toolbox for grid-based data.

[![NPM](https://img.shields.io/npm/v/gridl.svg)](https://www.npmjs.com/package/gridl)

## Documentation

- [Website](https://gridl.dev)
- [Changelog](https://github.com/klattiation/gridl/wiki/Changelog)

## Installation

**Using npm**

```
npm install gridl@next
```

**Using yarn**

```
yarn add gridl@next
```

**ES6 modules**

```js
import {createGrid} from "gridl/core";
```

**Nodejs**

```js
const {createGrid} = require("gridl/_umd");
```

## Usage

See the [website](https://gridl.dev) for detailed information and getting started guides.

```js
import {createGrid} from "gridl/core";

const grid = createGrid({
    columnCount: 4,
    rowCount: 3,
    createCell: (pos, idx) => pos.y < 2 ? idx : "x",
});

// creates the following data object
// => {
//     x: 0,
//     y: 0,
//     cellCount: 12,
//     columnCount: 4,
//     rowCount: 3,
//     _array2D: [
//         [  0,   1,   2,   3],
//         [  4,   5,   6,   7],
//         ["x", "x", "x", "x"],
//     ],
// }
```

## Selectors

Easily select cells, columns, rows, sub grids or neighbouring cells with selector functions. Read more about selectors in the [getting started](https://gridl.dev/getting-started/grid-selectors) section or have a look at the [API docs](https://gridl.dev/api-docs/).

```js
import {createGridFromArray2D, selectCell} from "gridl/core";

const grid = createGridFromArray2D([
    [0,  1,  2,  3],
    [4,  5,  6,  7],
    [8,  9, 10, 11],
]);

// get the cell value at position = {x: 1, y: 2}
selectCell({grid, x: 2, y: 1}); // => 6

// get the column at x = 2
selectColumn({grid, x: 2}); // => [2, 6, 10]

// get the row at y = 1
selectRow({grid, y: 1}); // => [4, 5, 6, 7];
```

## Transformers

Perform all kinds of data transformations on your grid, such as add, remove, rotate, swap, mirror and more. Read more about transformers in the [getting started](https://gridl.dev/getting-started/grid-transformers) section or have a look at the [API docs](https://gridl.dev/api-docs/#transformers).

```js
import {createGridFromArray2D} from "gridl/core";
import {addRowTop} from "gridl/transformers";

const grid = createGridFromArray2D([
    [0,  1,  2,  3],
    [4,  5,  6,  7],
    [8,  9, 10, 11],
]);
const newGrid = addRowTop(["x", "x", "x", "x"])(grid);
// resulting grid:
// {
//     x: 0,
//     y: 0,
//     cellCount: 12,
//     columnCount: 4,
//     rowCount: 4,
//     _array2D: [
//         ["x", "x", "x", "x"],
//         [  0,   1,   2,   3],
//         [  4,   5,   6,   7],
//         [  8,   9,  10,  11],
//     ],
// }
```

## Walkers

Traverse over your grid in variety of ways. Choose from a predefined set of iterators or just come up with your own one. Read more about walkers in the [getting started](https://gridl.dev/getting-started/grid-walkers) section or have a look at the [API docs](https://gridl.dev/api-docs/).

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
````



## Issues

Report issues, bugs and feature request on the [github issues page](https://github.com/klattiation/gridl/issues).

-----------------------------------------------------------------------------------------------------------

## License

MIT © [Sascha Klatt](https://github.com/klattiation)
