## Cells

Getting values at a certain position or at a certain index:

```javascript
const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
gridl(data).valueAt([1, 2]);      // would be 8
gridl(data).goto([1, 2]).value(); // does the same
```

Setting values at a certain position:
```javascript
const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const newGrid1 = gridl(data).valueAt([1, 2], 'Hi').getData();
const newGrid2 = gridl(data).goto([1, 2]).value('Hi').getData(); // does the same

// the grids would look like this:
// [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 'Hi', 9],
// ];
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
const { UP, LEFT } = gridl.directions;

g.goto([2,3]).walk([-2, 1]).position(); // [0,4]
g.goto([2,3]).walk(UP).position();      // [2,2]
g.goto([2,3]).walk(LEFT).position();    // [1,3]
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
const newGrid1 = gridl(grid).moveCell(from, to).getData();
const newGrid2 = gridl(grid).goto(from).moveAbs(to).getData();

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
const grid = [
    [ 1, 2, 3, 4, 5, 6],
    [ 7, 8, 9,10,11,12],
    [13,14,15,16,17,18],
    [19,20,21,22,23,24],
    [25,26,27,28,29,30],
];
const position = [1,2];
const direction = [3,2];
const grid = gridl(grid).goto(position).moveRel(direction).getData();

// grid looks like this:
// [
//     [ 1, 2, 3, 4, 5, 6],
//     [ 7, 8, 9,10,11,12],
//     [13,15,16,17,18,19],
//     [20,21,22,23,24,25],
//     [26,27,28,29,14,30],
// ]
```

Swapping two cells:
```javascript
const data = [
    [1,2,3,4],
    [5,6,7,8],
];
const newGrid1 = gridl(data).swapCells([0,0], [2,1]).getData();
const newGrid2 = gridl(data).goto([0,0]).swapCells([2,1]).getData();

// both grids look like this:
// [
//     [7,2,3,4],
//     [5,6,1,8],
// ]
```