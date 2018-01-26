# gridl

Fast, lightweight and easy to use library to handle 2d grid data.

## Installation

Using npm:

`npm i --save gridl`

## Usage

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
];
const mirroredGrid = gridl(data)
    .mirrorY()  // mirror the grid on the y-axis
    .getData(); // export the data array

// mirroredGrid looks like this:
// [
//     [ 5, 4, 3, 2, 1],
//     [10, 9, 8, 7, 6],
//     [15,14,13,12,11],
// ]
```

## Features

* [Generate grids](docs/example-generating.md)
    * specify the number of rows and columns
    * generate 2d grids with a generator callback function
* [Navigating](docs/example-navigating.md)
    * go to absolute positions
    * walk into directions
* [Dimensions](docs/example-dimensions.md)
    * get the number of columns and rows  
* [Work with cells](docs/example-cells.md)
    * get and set values at absolute or relative positions
    * move them around
    * swap them
* [Columns and rows](docs/example-columns-and-rows.md)
    * easily access columns and rows
    * remove or add new columns and rows at any position
    * move them around
    * swap them
* [Work with areas](docs/example-areas.md)
    * manipulate areas
    * use anchor points to define the center
    * check if an area would fit into a grid at a certain position
* [Finding](docs/example-finding.md)
    * find values in the grid 
    * find values within certain areas on the grid
* [Clipping](docs/example-clipping.md)
    * define an area and remove everything around
* [Swapping](docs/example-swapping.md)
    * swap columns, rows or single cells
* [Rotating](docs/example-rotating.md)
    * rotate the entire grid clockwise or counterclockwise
* [Mirroring](docs/example-mirroring.md)
    * mirror the grid on the x- or y-axis
    * specify where the axis is located
* [Iterating](docs/example-iterating.md)
    * map()
    * forEach()
* [Cloning](docs/example-cloning.md)
    * Make a clone of a gridl instance
* [Draw a cow](docs/example-cow.md)
    * just because

## Use cases

As a basis for:

* grid based games or applications
* handle table data
* tile maps
* path finding
* and many more...

