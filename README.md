# gridl

Fast, lightweight, extendable and easy to use library to handle 2d grid data.

## Installation

Using npm:

`npm i --save gridl`

**node.js**

```javascript
var gridl = require("gridl");
```

**ES6**

```javascript
import gridl from "gridl";
```

**In a browser**

```html
<script src="gridl.min.js"></script>
```

**Usage**

```javascript
const data = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15]
];
const flippedGrid = gridl(data)
  .flipY() // mirror the grid on the y-axis
  .data(); // export the data array

// flippedGrid looks like this:
// [
//     [ 5, 4, 3, 2, 1],
//     [10, 9, 8, 7, 6],
//     [15,14,13,12,11],
// ]
```

## Attention!

- The new version (v0.10.x) comes with a lot of api breaks - see the [changelog](https://github.com/klattiation/gridl/wiki/Changelog) for further information

## Documentation

- You can find the API reference and tutorials in our documentation: [latest](https://klattiation.github.io/gridl/gridl/latest/index.html)
- See the [changelog](https://github.com/klattiation/gridl/wiki/Changelog) for updates in each version

## Features

- [Generate grids](docs/tutorials/generating.md)
  - specify the number of rows and columns
  - generate 2d grids with a generator callback function
- [Accessing data](docs/tutorials/data.md)
  - export data as two-dimensional grid array
  - export data as one-dimensional list array
- [Dimensions](docs/tutorials/size.md)
  - get the number of columns and rows
- [Working with cells](docs/tutorials/values.md)
  - get and set values at absolute or relative positions
  - move them around
  - swap them
- [Columns and rows](docs/tutorials/columns-and-rows.md)
  - easily access columns and rows
  - remove or add new columns and rows at any position
  - move them around
- [Finding](docs/tutorials/finding.md)
  - find values in the grid
- [Iterating](docs/tutorials/iterating.md)
  - map()
  - reduce()
  - forEach()
- [Working with areas](docs/tutorials/areas.md)
  - manipulate areas
  - check for intersection with other areas
  - iterate over areas by using map() and reduce()
  - find values limited by the area boundaries
  - use anchor points to position areas with an offset
- [Adjacent cells](docs/tutorials/adjacent-cells.md)
  - find the adjacent cells of a certain cell
  - get orthogonal, diagonal or all cells
- [Clipping](docs/tutorials/clipping.md)
  - define an area and remove everything around
- [Swapping](docs/tutorials/swapping.md)
  - swap columns, rows or single cells
- [Rotating](docs/tutorials/rotating.md)
  - rotate the entire grid clockwise or counterclockwise
- [Flipping](docs/tutorials/flipping.md)
  - flip the grid on the x- or y-axis
- [Cloning](docs/tutorials/cloning.md)
  - Make a clone of a gridl instance
- [Plugins](docs/tutorials/plugins.md)
  - Extend gridl to your needs by writing your own plugins

## Use cases

As a basis for:

- grid based games or applications
- handle table data
- tile maps
- path finding
- and many more...
