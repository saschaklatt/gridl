## Swapping

Swapping two cells:
```javascript
const data = [
    [1,2,3,4],
    [5,6,7,8],
];
const newGrid1 = gridl(data).swapCells([0,0], [2,1]).getData();
const newGrid2 = gridl(data).goto([0,0]).swapCell([2,1]).getData();

// both grids look like this:
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