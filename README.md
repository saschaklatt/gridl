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

* clean up
    * scrap arrayType
    * stop importing 1d arrays (deserialize only)
    * stop exporting array1D
    * remove options {rows, columns} - should always be derived from data structure
    * validate data is a valid 2d grid array
    * stop exposing index-related stuff, go for position only
    * stop exposing helper functions
* deserializable
* generating grids 
* anchor/pivot points in areas
* moving cells from A to B
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

`gridl(data)`

* **data:** The grid data as a two-dimensional array.
 
### Examples

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

## Related stuff

* [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
* [2d arrays vs. 1d arrays](https://rohan-paul.github.io/javascript/2016/09/09/How_to_Emulate_a_2_Dimensional_array_in_JavaScript_into_a_1_Dimensional_array/)
