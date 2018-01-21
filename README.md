# gridl

Fast, lightweight and easy to use library to handle 2d grid data.

## Installation

Using npm:

`npm i --save gridl`

## Features

**Already implemented**

* import one-dimensional arrays
* import two-dimensional arrays
* calculate position from index
* calculate index from position
* serializable
* get/set values at position or index

**TODO**

* get/set area at position or index
* add/remove columns and rows
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

```
const data = [5, 6, 4, 2, 3, 20]; 
const array2D = gridl(data, { rows: 2 }).toArray2D();

// array2D would look like this:
// [
//     [5, 6, 4], 
//     [2, 3, 20], 
// ]

```

```
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

```
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

```
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

```
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

## Related stuff

* [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
* [2d arrays vs. 1d arrays](https://rohan-paul.github.io/javascript/2016/09/09/How_to_Emulate_a_2_Dimensional_array_in_JavaScript_into_a_1_Dimensional_array/)
