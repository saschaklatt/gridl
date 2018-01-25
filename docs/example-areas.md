## Areas

Overwriting an entire area at a certain position:
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
const newGrid1 = gridl(data).setAreaAt(position, area).getData();
const newGrid2 = gridl(data).goto(position).setAreaAt(area).getData();

// grids both look like this:
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
const area1 = gridl(data).getAreaAt(position, size);
const area2 = gridl(data).goto(position).getAreaAt(size);

// areas both look like this:
// [
//     [14, 15, 16],
//     [20, 21, 22],
// ]
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

