## Rotating

Rotating the grid:
```javascript
const data = [
    [ 1, 2, 3],
    [ 6, 7, 7],
    [10,11,12],
    [15,16,17],
    [20,21,22],
];
const newGrid = gridl(data)
    .rotate(1) // rotate 1 step, which means rotate 90 degrees one time
    .getData(); 

// newGrid looks like this:
// [
//     [20,15,10, 6, 1],
//     [21,16,11, 7, 2],
//     [22,17,12, 7, 3],
// ]
```