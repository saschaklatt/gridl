## Mirroring

Mirror a grid on the x-axis (centered):
```javascript
const data = [
    [ 1,  6, 11 ],
    [ 2,  7, 12 ],
    [ 3,  8, 13 ],
    [ 4,  9, 14 ],
    [ 5, 10, 15 ],
];
const newGrid = gridl(data).mirrorX(3).data();

// newGrid looks like this:
// [
//     [ 5, 10, 15 ],
//     [ 4,  9, 14 ],
//     [ 3,  8, 13 ],
//     [ 2,  7, 12 ],
//     [ 1,  6, 11 ],
// ]
```

Mirror a grid at y = 3: 
```javascript
const data = [
    [ 1,  6, 11 ],
    [ 2,  7, 12 ], // mirror axis is here
    [ 3,  8, 13 ],
    [ 4,  9, 14 ],
    [ 5, 10, 15 ],
];
const newGrid = gridl(data).mirrorX(3).data();

// newGrid looks like this
// [
//     [ 5, 10, 15 ],
//     [ 4,  9, 14 ],
//     [ 3,  8, 13 ],
//     [ 2,  7, 12 ],
//     [ 1,  6, 11 ],
// ]
```

Mirror grid on the y-axis (centered):
```javascript
const data = [
    [  1,  2,  3,  4,  5],
    [  6,  7,  8,  9, 10],
    [ 11, 12, 13, 14, 15],
];
const newGrid = gridl(data).mirrorY().data();

// newGrid looks like this:
// [
//     [  5,  4,  3,  2,  1],
//     [ 10,  9,  8,  7,  6],
//     [ 15, 14, 13, 12, 11],
// ]
```

Mirror grid at x = 3: 
```javascript
const data = [
    [  1,  2,  3,  4,  5],
    [  6,  7,  8,  9, 10],
    [ 11, 12, 13, 14, 15],
];
const newGrid = gridl(data).mirrorY(3).data();

// newGrid looks like this
// [
//     [  5,  4,  3,  2,  1],
//     [ 10,  9,  8,  7,  6],
//     [ 15, 14, 13, 12, 11],
// ]                 ↑↑
//              mirror axis
```