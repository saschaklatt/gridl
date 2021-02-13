## What is a grid?

In gridl, a grid is an immutable grid-based data structure that has the following properties, which should be self-explanatory.

```js
{
    x: 2,
    y: 1,                       
    cellCount: 12,
    columnCount: 4,
    rowCount: 3,
    _array2D: [
        [  0,   1,   2,   3],
        [  4,   5,   6,   7],
        ["x", "x", "x", "x"],
    ],
}
```

### The _array2D data array

The `_array2D` data array is a two-dimensional array that contains the actual cells. The coordinate system starts at the upper left corner at `{x: 0, y: 0}` and ends at the bottom right corner, which would be `{x: 3, y: 2}` in the previous example. It can contain any values like primitive strings, numbers or booleans or complex objects. In most cases you don't need to access it directly. Instead you can use one of gridl's  <a href="#selectors">selector functions</a>.

## Creating a grid

gridl provides some factory functions to create a grid instance. To create a new grid from scratch use [[createGrid]]:

```js
import {createGrid} from "gridl/core";

const grid = createGrid({
    columnCount: 4,
    rowCount: 3,
    createCell: (pos, idx) => pos.y < 2 ? idx : "x",
});
// {
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

To create a grid instance from an existing data array, use [[createGridFromArray2D]]:

```js
import {createGridFromArray2D} from "gridl/core";

const grid = createGridFromArray2D([
    [0,  1,  2,  3],
    [4,  5,  6,  7],
    [8,  9, 10, 11],
]);
```

## <a name="selectors"></a> Selecting data

To select data from a grid instance, gridl provides some selector function, which allow you to access data like cell values, columns, rows, subgrids or neighbouring cells.

```js
// get the cell value at position = {x: 1, y: 2}
selectCell({grid, x: 2, y: 1}); // => 6

// get the column at x = 2
selectColumn({grid, x: 2}); // => [2, 6, "x"]

// get the row at y = 1
selectRow({grid, y: 1}); // => [4, 5, 6, 7]

selectSubGrid({grid, x: 1, y: 1, columnCount: 2, rowCount: 2});
// returned subgrid (which is a new grid instance):
// {
//     x: 1,
//     y: 1,
//     cellCount: 4,
//     columnCount: 2,
//     rowCount: 2,
//     _array2D: [
//         [  5,   6],
//         ["x", "x"],
//     ],
// }

// get all neighbouring cells around the origin at position {x: 2, y: 9}
selectNeighbours({grid, origin: {x: 2, y: 9}});
```

## Changing a grid

Since a grid instance is immutable it cannot be changed. Instead you have to create a new instance. To do so gridl provides a bunch of [[transformers | transformer]] functions. Read more about it in the transformers guide.