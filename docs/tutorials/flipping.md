* [Horizontally](#horizontal)
* [Vertically](#vertical)

### <a name="horizontal"></a>Horizontally

Flip a grid on the x-axis (centered):
```javascript
import gridl from 'gridl';

const data = [
    [ 1,  6, 11 ],
    [ 2,  7, 12 ],
    [ 3,  8, 13 ],
    [ 4,  9, 14 ],
    [ 5, 10, 15 ],
];
const newGrid = gridl(data).flipX(3).data();

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
import gridl from 'gridl';

const data = [
    [ 1,  6, 11 ],
    [ 2,  7, 12 ], // mirror axis is here
    [ 3,  8, 13 ],
    [ 4,  9, 14 ],
    [ 5, 10, 15 ],
];
const newGrid = gridl(data).flipX(3).data();

// newGrid looks like this
// [
//     [ 5, 10, 15 ],
//     [ 4,  9, 14 ],
//     [ 3,  8, 13 ],
//     [ 2,  7, 12 ],
//     [ 1,  6, 11 ],
// ]
```

### <a name="vertical"></a>Vertically

Mirror grid on the y-axis (centered):
```javascript
import gridl from 'gridl';

const data = [
    [  1,  2,  3,  4,  5],
    [  6,  7,  8,  9, 10],
    [ 11, 12, 13, 14, 15],
];
const newGrid = gridl(data).flipY().data();

// newGrid looks like this:
// [
//     [  5,  4,  3,  2,  1],
//     [ 10,  9,  8,  7,  6],
//     [ 15, 14, 13, 12, 11],
// ]
```

Mirror grid at x = 3: 
```javascript
import gridl from 'gridl';

const data = [
    [  1,  2,  3,  4,  5],
    [  6,  7,  8,  9, 10],
    [ 11, 12, 13, 14, 15],
];
const newGrid = gridl(data).flipY(3).data();

// newGrid looks like this
// [
//     [  5,  4,  3,  2,  1],
//     [ 10,  9,  8,  7,  6],
//     [ 15, 14, 13, 12, 11],
// ]                 ↑↑
//              mirror axis
```