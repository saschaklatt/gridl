* [Single cells](#cells)
* [Rows](#rows)
* [Columns](#columns)

### <a name="cells"></a>Single cells

Move a cell from one position to another absolute position:

```javascript
import gridl from 'gridl';

const grid = [
    [ 1, 2, 3, 4, 5, 6],
    [ 7, 8, 9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
];
const from = [2,1];
const to = [3,4];
const newGrid1 = gridl(grid).moveCell(from, to).data();
const newGrid2 = gridl(grid).goto(from).moveAbs(to).data();

// grids would both look like this:
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
import gridl from 'gridl';

const grid = [
    [ 1, 2, 3, 4, 5, 6],
    [ 7, 8, 9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
];
const position = [1,2];
const direction = [3,2];
const grid = gridl(grid).goto(position).moveRel(direction).data();

// grid looks like this:
// [
//     [ 1, 2, 3, 4, 5, 6],
//     [ 7, 8, 9,10,11,12],
//     [13,15,16,17,18,19],
//     [20,21,22,23,24,25],
//     [26,27,28,29,14,30],
// ]
```

### <a name="rows"></a>Rows

Move a row from y=0 to y=2:

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3], // move this row...
    [ 4, 5, 6],
    [ 7, 8, 9], // ...to this position
    [10,11,12],
    [13,14,15],
];
const newGrid = gridl(data).moveRow(0, 2).data();

// newGrid looks like this:
// [
//     [ 4, 5, 6],
//     [ 7, 8, 9],
//     [ 1, 2, 3],
//     [10,11,12],
//     [13,14,15],
// ]
```

### <a name="columns"></a>Columns

Move a column from x=0 to x=2:

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
];
const newGrid = gridl(data).moveColumn(0, 2).data();

// newGrid looks like this:
// [
//     [ 2, 3, 1, 4],
//     [ 6, 7, 5, 8],
//     [10,11, 9,12],
// ]
```