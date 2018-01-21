# gridl

Fast, lightweight and easy to use library to handle 2d grid data.

## Installation

Using npm:

`npm i --save gridl`

## Features

**Already implemented**

* import one-dimensional arrays
* import two-dimensional arrays
* transform position to index and index to position
* serializable
* getting/setting values at position or index
* getting/setting areas at position or index
* finding values in the grid or within a certain area on the grid
* check if an area would fit into the grid at a certain position or index
* relative positions

**TODO**

* anchor/pivot points in areas
* moving cells from A to B
* generating grids 
* add/remove columns and rows from all sides
* swap columns and rows
* rotate grid
* mirror grid (x- and y-axis)
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

`gridl(data, importOptions)`

**data:** 

The grid data as one- or two-dimensional array.

**importOptions:** 

* **arrayType:** '1d' to import a one-dimensional array or '2d' to import a two-dimensional array. (default: '1d')
* **rows:** (optional) the number of rows your grid has. If you don't provide this option, gridl will try to guess it based on data structure and arrayType.
* **columns:** (optional) the number of columns your grid has. If you don't provide this option, gridl will try to guess it based on the data structure and arrayType.
 
### Examples

Converting a one-dimensional array into a two-dimensional grid:

```javascript
const data = [5, 6, 4, 2, 3, 20]; 
const array2D = gridl(data, { rows: 2 }).toArray2D();

// array2D would look like this:
// [
//     [5, 6, 4], 
//     [2, 3, 20], 
// ]

```

```javascript
const data = [1, 2, 3, 4, 5, 6, 7, 8]; 
const array2D = gridl(data, { columns: 2 }).toArray2D();

// array2D would look like this:
// [
//     [1, 2], 
//     [3, 4], 
//     [5, 6], 
//     [7, 8], 
// ]

```

Flatten a two-dimensional grid into a one-dimensional array:

```javascript
const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]; 
const array1D = gridl(data, { arrayType: '2d' }).toArray1D();

// array1D would look like this:
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Getting values at a certain position or at a certain index:

```javascript
const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]; 

const valueAtPosition = gridl(data, { arrayType: '2d' }).valueAt([1, 2]);
// valueAtPosition with position = [1, 2] would be 8

const valueAtIndex = gridl(data, { arrayType: '2d' }).valueAt(4);
// valueAtIndex with index = 4 would be 5 
// (the index is derived from the one-dimensional array gridl uses internally)
```

Setting values at a certain position or at a certain index:

```javascript
const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]; 
const newGrid = gridl(data, { arrayType: '2d' }).valueAt([1, 2], 'Hi').toArray2D();

// newGrid would look like this:
// [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 'Hi', 9],
// ];
```

Setting a whole area at a certain position:

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
const newGrid = gridl(data, { arrayType: '2d' }).setAreaAt(position, area).toArray2D();

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
const area = gridl(data, { arrayType: '2d' }).getAreaAt(position, size);

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
const position = gridl(data, { arrayType: '2d' }).findPosition(v => v === 5);

// position would be [2,1] 
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
const result = gridl(data, { arrayType: '2d' }).findPositionInArea(areaPosition, areaSize, v => v === 7);

// result would be [3,1]
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
gridl(data, { arrayType: '2d' }).checkAreaFitsAt([0,0], area); // true
gridl(data, { arrayType: '2d' }).checkAreaFitsAt([3,2], area); // true
gridl(data, { arrayType: '2d' }).checkAreaFitsAt([4,0], area); // false
gridl(data, { arrayType: '2d' }).checkAreaFitsAt([1,3], area); // false
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
const g = gridl(data, { arrayType: '2d' });
const { TOP, LEFT } = gridl.directions;
g.getRelativePosition([2,3], [-2, 1]); // [0, 4]
g.getRelativePosition([2,3], TOP);     // [2,2]
g.getRelativePosition([2,3], LEFT);    // [1,3]
```

## Related stuff

* [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
* [2d arrays vs. 1d arrays](https://rohan-paul.github.io/javascript/2016/09/09/How_to_Emulate_a_2_Dimensional_array_in_JavaScript_into_a_1_Dimensional_array/)
