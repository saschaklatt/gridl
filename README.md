# gridl

Fast, lightweight and easy to use library to handle 2d grid data.

## Installation

Using npm:

`npm i --save gridl`

## Features

**Already implemented**

* importing two-dimensional arrays
* getting/setting values at a certain position
* getting/setting areas at  a certain position
* finding values in the grid or within a certain area on the grid
* check if an area would fit into the grid at a certain position
* get values relative positions
* generating grids
* moving cells from A to B
* moving columns and rows
* adding columns and rows at any position
* removing rows and columns from any position
* clipping
* swapping: cells, columns and rows

**Must haves**

* anchor/pivot points in areas
* extracting subsets
* rotating the grid
* mirror the grid (x- and y-axis)
* adding/removing multiple columns and rows

**Nice to haves**

* [fancy syntax](docs/goto-syntax.md)
* swapping areas
* moving areas
* iterating functions like map and forEach
* eternal mode
* path finding

## Use cases

As a basis for:

* grid based games or applications
* tile maps
* level generators
* path finding

## Usage

### Basic usage

`gridl(data)`

* **data:** The grid data as a two-dimensional array.
 
### Examples

#### Accessing data

Getting values at a certain position or at a certain index:

```javascript
const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

gridl(data).getValueAt([1, 2]); // would be 8
```

Setting values at a certain position:

```javascript
const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const newGrid = gridl(data).setValueAt([1, 2], 'Hi').getData();

// newGrid would look like this:
// [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 'Hi', 9],
// ];
```

Overwriting an entire area at a certain position:

```javascript
const data = [
    [ 1,  2,  3,  4,  5,  6],
    [ 7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
];
const area = [
    [4,  1,  8],
    [5,  3,  9],
];
const position = [3, 1];
const newGrid = gridl(data).setAreaAt(position, area).getData();

// newGrid would look like this:
// [
//     [ 1,  2,  3,  4,  5,  6],
//     [ 7,  8,  9,  4,  1,  8],
//     [13, 14, 15,  5,  3,  9],
//     [19, 20, 21, 22, 23, 24],
// ]
```

Extracting a subset of the grid:
```javascript
const data = [
    [ 1,  2,  3,  4,  5,  6],
    [ 7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
];
const size = [3, 2];
const position = [1, 2];
const area = gridl(data).getAreaAt(position, size);

// area would look like this:
// [
//     [14, 15, 16],
//     [20, 21, 22],
// ]
```

Find the position of the cell with value 5 in the grid (first occurrence):
```javascript
const data = [
    [1,2,3],
    [4,2,5],
    [6,5,4],
];
gridl(data).findPosition(v => v === 5); // would be [2,1] 
```

Find the position of the cell with value 7 within a given area (first occurrence):
```javascript
const data = [
    [0,7,3,2,8],
    [4,2,5,7,8],
    [6,6,6,6,7],
];
const areaPosition = [2,1];
const areaSize = [3,2];
gridl(data).findPositionInArea(areaPosition, areaSize, v => v === 7); // result would be [3,1]
```

Check if an area would fit into the grid at a certain position:
```javascript
const data = [
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
];
const area = [
    [2,2,2],
    [2,2,2],
];
gridl(data).checkAreaFitsAt([0,0], area); // true
gridl(data).checkAreaFitsAt([3,2], area); // true
gridl(data).checkAreaFitsAt([4,0], area); // false
gridl(data).checkAreaFitsAt([1,3], area); // false
```

Get a position relative to my current position:
```javascript
const data = [
    [ 1, 2, 3, 4,21],
    [ 5, 6, 7, 8,22],
    [ 9,10,11,12,23],
    [13,14,15,16,24],
    [17,18,19,20,25],
];
const g = gridl(data);
const { TOP, LEFT } = gridl.directions;
g.getRelativePosition([2,3], [-2, 1]); // [0,4]
g.getRelativePosition([2,3], TOP);     // [2,2]
g.getRelativePosition([2,3], LEFT);    // [1,3]
```

Move a cell from one position to another absolute position:
```javascript
const grid = [
    [ 1, 2, 3, 4, 5, 6],
    [ 7, 8, 9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
];
const from = [2,1];
const to = [3,4];
const newGrid = gridl(grid).moveCell(from, to).getData();

// newGrid would look like this:
// [
//     [ 1, 2, 3, 4, 5, 6],
//     [ 7, 8,10,11,12,13],
//     [14,15,16,17,18,19],
//     [20,21,22,23,24,25],
//     [26,27,28, 9,29,30],
// ]
```

Move cells from a position ([1,2]) into a certain direction (3 steps left, 2 steps down):
```javascript
const grid = [
    [ 1, 2, 3, 4, 5, 6],
    [ 7, 8, 9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
];
const position = [1,2];
const direction = [3,2];
const newGrid = gridl(grid).moveCellFrom(position, direction).getData();

// newGrid looks like this:
// [
//     [ 1, 2, 3, 4, 5, 6],
//     [ 7, 8, 9,10,11,12],
//     [13,15,16,17,18,19],
//     [20,21,22,23,24,25],
//     [26,27,28,29,14,30],
// ]
```

Move a row from y=0 to y=2:
```javascript
const data = [
    [ 1, 2, 3], // move this row...
    [ 4, 5, 6],
    [ 7, 8, 9], // ...to this position
    [10,11,12],
    [13,14,15],
];
const newGrid = gridl(data).moveRow(0, 2).getData()

// newGrid looks like this:
// [
//     [ 4, 5, 6],
//     [ 7, 8, 9],
//     [ 1, 2, 3],
//     [10,11,12],
//     [13,14,15],
// ]
```

Move a column from x=0 to x=2:
```javascript
const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
];
const newGrid = gridl(data).moveColumn(0, 2).getData();

// newGrid looks like this:
// [
//     [ 2, 3, 1, 4],
//     [ 6, 7, 5, 8],
//     [10,11, 9,12],
// ]
```

Adding a row:
```javascript
const data= [
    [1,2,3],
    [4,5,6],
];
const row = [7,8,9];
const newGrid = gridl(data).addRowAt(row, 1).getData();

// newGrid looks like this:
// [
//     [1,2,3],
//     [7,8,9],
//     [4,5,6],
// ]
```

Adding a column:
```javascript
const data= [
    [1,2,3],
    [4,5,6],
];
const column = [
    7,
    8,
];
const newGrid = gridl(data).addColumnAt(column, 0).getData();

// newGrid looks like this:
// [
//     [7,1,2,3],
//     [8,4,5,6],
// ]
```

Removing a row:
```javascript
const data = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];
const newGrid = gridl(data).removeRowAt(1).getData();

// newGrid looks like this:
// [
//     [1,2,3],
//     [7,8,9],
// ]);
```

Removing a column:
```javascript
const data = [
    [1,2,3],
    [4,5,6],
];
const newGrid = gridl(data).removeColumnAt(0).getData();

// newGrid looks like this:
// [
//     [2,3],
//     [5,6],
// ]
```

Clip out an area:
```javascript
const data = [
   [ 1, 2, 3, 4, 5, 6, 7, 8, 9,10],
   [11,12,13,14,15,16,17,18,19,20],
   [21,22,23,24,25,26,27,28,29,30],
   [31,32,33,34,35,36,37,38,39,40],
   [41,42,43,44,45,46,47,48,49,50],
   [51,52,53,54,55,56,57,58,59,60],
];
const position = [4,1];
const size = [3,2];
const newGrid = gridl(data).clip(position, size).getData();

// newGrid looks like this:
// [
//    [15,16,17],
//    [25,26,27],
// ]
``` 

Swapping two cells:
```javascript
const data = [
    [1,2,3,4],
    [5,6,7,8],
];
const newGrid = gridl(data).swapCells([0,0], [2,1]).getData();

// newGrid looks like this:
// [
//     [7,2,3,4],
//     [5,6,1,8],
// ]
```

Swapping two rows:
```javascript
const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8], // swap this
    [ 9,10,11,12],
    [13,14,15,16], // and this
];
const newGrid = gridl(data).swapRows(1,3).getData();

// newGrid looks like this:
// [
//     [ 1, 2, 3, 4],
//     [13,14,15,16],
//     [ 9,10,11,12],
//     [ 5, 6, 7, 8],
// ]);
```

Swapping two columns:
```javascript
const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
    [13,14,15,16],
];
const newGrid = gridl(data).swapColumns(1,3).getData();

// newGrid looks like this:
// [
//     [ 1, 4, 3, 2],
//     [ 5, 8, 7, 6],
//     [ 9,12,11,10],
//     [13,16,15,14],
// ]
```

#### Generating data

Generating a data array
```javascript
const columns = 4;
const rows = 3;
const data = gridl.generateData(columns, rows, ({ column, row }) => `${column},${row}`);

// data looks like this:
// [
//     ['0,0', '1,0', '2,0', '3,0'],
//     ['0,1', '1,1', '2,1', '3,1'],
//     ['0,2', '1,2', '2,2', '3,2'],
// ]
```

Generating a gridl instance and perform operations on it
```javascript

// create a gridl instance
const columns = 4;
const rows = 3;
const grid = gridl.generate(columns, rows, ({ column, row }) => `${column},${row}`);

// perform gridl operations
const data = grid.setValueAt([2,1], 'bam').getData();

// data looks like this:
// [
//     ['0,0', '1,0', '2,0', '3,0'],
//     ['0,1', '1,1', 'bam', '3,1'],
//     ['0,2', '1,2', '2,2', '3,2'],
// ]
```

## Related stuff

* [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
* [2d arrays vs. 1d arrays](https://rohan-paul.github.io/javascript/2016/09/09/How_to_Emulate_a_2_Dimensional_array_in_JavaScript_into_a_1_Dimensional_array/)
