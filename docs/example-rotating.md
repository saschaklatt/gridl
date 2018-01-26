## Rotating

Rotating the grid:
```javascript
const data = [
    [ 1, 2, 3],
    [ 6, 7, 8],
    [10,11,12],
    [15,16,17],
    [20,21,22],
];
const grid90 = gridl(data).rotate(1).data(); // rotate 1 step clockwise, which means rotate 90 degrees

// grid90_cw looks like this:
// [
//     [20,15,10, 6, 1],
//     [21,16,11, 7, 2],
//     [22,17,12, 8, 3],
// ]

const grid180 = gridl(data).rotate(2).data(); // rotate 2 steps clockwise, which means rotate 180 degrees

// grid180 looks like this:
// [
//     [20, 21, 22],
//     [15, 16, 17],
//     [10, 11, 12],
//     [ 6,  7,  8],
//     [ 1,  2,  3],
// ]

const grid270 = gridl(data).rotate(3).data(); // rotate 3 steps clockwise, which means rotate 270 degrees

// grid270 looks like this:
// [
//     [ 3, 8,12,17,22],
//     [ 2, 7,11,16,21],
//     [ 1, 6,10,15,20],
// ]

const grid90_ccw = gridl(data).rotate(-1).data(); // rotate 3 steps clockwise, which means rotate -90 degrees

// grid90_ccw looks like this:
// [
//     [ 3, 8,12,17,22],
//     [ 2, 7,11,16,21],
//     [ 1, 6,10,15,20],
// ]

const grid180_ccw = gridl(data).rotate(-2).data(); // rotate 2 steps counterclockwise, which means rotate -180 degrees

// grid180_ccw looks like this:
// [
//     [20, 21, 22],
//     [15, 16, 17],
//     [10, 11, 12],
//     [ 6,  7,  8],
//     [ 1,  2,  3],
// ]

const grid270_ccw = gridl(data).rotate(-3).data(); // rotate 1 step clockwise, which means rotate 270 degrees

// grid270_cw looks like this:
// [
//     [20,15,10, 6, 1],
//     [21,16,11, 7, 2],
//     [22,17,12, 8, 3],
// ]
```