## Get all surrounding neighbours

The following example gives you all surrounding neighbours of the cell at position `{x: 2, y: 1}`.

```js
import {createGridFromArray2D, selectNeighbours} from "gridl/core";

const grid = createGridFromArray2D([
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
]);
selectNeighbours({grid, x: 2, y: 1});
// => [
//     {cell: 3,  position: {x: 2, y: 0}},
//     {cell: 4,  position: {x: 3, y: 0}},
//     {cell: 9,  position: {x: 3, y: 1}},
//     {cell: 14, position: {x: 3, y: 2}},
//     {cell: 13, position: {x: 2, y: 2}},
//     {cell: 12, position: {x: 1, y: 2}},
//     {cell: 7,  position: {x: 1, y: 1}},
//     {cell: 2,  position: {x: 1, y: 0}},
// ]
```

## Get just some neighbours

You can also specify which neighbouring cells you're particularly interested in with the `positions` option.

```js
import {createGridFromArray2D, selectNeighbours, OrthogonalDirections, DiagonalDirections, North, NorthEast, NorthWest} from "gridl/core";

const grid = createGridFromArray2D([
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
]);
const origin = {x: 2, y: 1}

// get only orthogonal neighbours (north, east, south, west)
selectNeighbours({grid, origin, positions: OrthogonalDirections});

// get only diagonal neighbours (north-east, north-west, south-west, south-east)
selectNeighbours({grid, origin, positions: DiagonalDirections});

// get neighbours from above (north-east, north, north-west)
selectNeighbours({grid, origin, positions: [NorthEast, North, NorthWest]});

// get neighbours two cells west and two cells east
const twoWest = {x: -2, y: 0};
const twoEast = {x: 2, y: 0};
selectNeighbours({grid, origin, positions: [twoWest, twoEast]});
```
