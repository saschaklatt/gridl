# gridl

A functional toolbox for grid-based data.

[![NPM](https://img.shields.io/npm/v/gridl.svg)](https://www.npmjs.com/package/gridl)

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

## Documentation

- [Docs latest](https://klattiation.github.io/gridl/gridl/latest/index.html)
- [Docs legacy (v0.10.5)](https://klattiation.github.io/gridl/gridl/0.10.5/index.html)
- [Changelog](https://github.com/klattiation/gridl/wiki/Changelog)

## Usage

A quick overview. See the [docs](https://klattiation.github.io/gridl/gridl/latest/index.html) for more details.

```js
import {createGrid} from "gridl/core/grid";
import {DiagonalDirections} from "gridl/core/directions";
import {walkEWNS, walkNSWE} from "gridl/core/walker";
import {selectCell, selectColumn, selectRow, selectSubGrid, selectNeighbours} from "gridl/core/selectors";
import {addColumnLeft, mirrorX, removeRow, rotate90, transform, transformArea} from "gridl/transformers";
import {forEachCell} from "gridl/sideEffects";
import {reduce} from "gridl/reducers";
import {findCells, findPositions} from "gridl/search";
import {getNeighbourCells, getNeighbourPositions} from "gridl/neighbours";

// create a new grid
const grid = createGrid({
    columnCount: 12,
    rowCount: 30,
    createCell: (pos, idx) => pos.y < 2 ? idx : 2
});

// access data with properties
grid.columnCount; // => 12
grid.rowCount;    // => 30
grid.cellCount;   // => 360
grid.x;           // => 0
grid.y;           // => 0

// access data with selectors
selectCell({grid, x: 2, y: 1});
selectColumn({grid, x: 2});
selectRow({grid, y: 1});
selectSubGrid({grid, x: 1, y: 1, columnCount: 2, rowCount: 2});
selectNeighbours({grid, origin: {x: 2, y: 9}});

// apply simple transformations
const rotatedGrid = rotate90(1)(grid);

// apply complex transformations
const transformedGrid = transform(
    addColumnLeft(),
    rotate90(1),
    mirrorX(),
    removeRow(2),
    transformArea({x: 1, y: 2, columnCount: 10, rowCount: 6}, [
        mirrorX(),
        rotate90(2),
    ])
)(grid);

// search
findCell(grid, (value) => value > 2);
findPosition(grid, (value) => value > 2);

// reducers
const sum = reduceGrid(grid, (acc, cellValue) => acc + cellValue, 0);

// sideEffects
forEachCell(grid, (cell, position, index, src) => {
    console.log(cell, position, index);
});

// traverse in different directions
const forEachCellCallback = (cell, position, index, src) => {
    console.log(cell, position, index);
}
forEachCell(grid, forEachCellCallback, walkEWNS); // EWNS: east -> west, north -> south
forEachCell(grid, forEachCellCallback, walkNSWE); // NSWE: north -> south, west -> east
findCell(grid, (value) => value > 2, walkNSWE);
reduceGrid(grid, (acc, cellValue) => acc + cellValue, 0, walkNSWE);
```

## Issues

Issues, bugs and feature request at [github issues page](https://github.com/klattiation/gridl/issues)

-----------------------------------------------------------------------------------------------------------

## License

MIT © [klattiation](https://github.com/klattiation)
