## Columns and rows

Getting a column at a certain position:
```javascript
const data = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];
const g = gridl(data);
g.column(0); // returns [1,4,7]
g.column(1); // returns [2,5,8]
g.column(2); // returns [3,6,9]
```

Getting a row at a certain position:
```javascript
const data = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];
const g = gridl(data);
g.row(0); // returns [1,2,3]
g.row(1); // returns [4,5,6]
g.row(2); // returns [7,8,9]
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