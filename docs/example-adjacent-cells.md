## Adjacent cells

Get **all** adjacent cells of a certain cell:

```javascript
const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).goto([2,2]).adjacentCells();
gridl(data).adjacentCellsAt([2,2]); 
// both return [7, 8, 9, 12, 14, 17, 18, 19]
```

Get **orthogonal** adjacent cells only:

```javascript
const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).goto([2,2]).adjacentCells(gridl.adjacences.ORTHOGONAL);
gridl(data).adjacentCellsAt([2,2], gridl.adjacences.ORTHOGONAL);
// both return [8, 12, 14, 18]
```

Get **diagonal** adjacent cells only:

```javascript
const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).goto([2,2]).adjacentCells(gridl.adjacences.DIAGONAL);
gridl(data).adjacentCellsAt([2,2], gridl.adjacences.DIAGONAL);
// both return [7, 9, 17, 19]
```