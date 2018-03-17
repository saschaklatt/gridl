Clipping means cutting of all cells that are outside a given area at a given position.

* [Absolute position - clipAt()](#abs)
* [Relative position - clip()](#rel)

### <a name="abs"></a>Absolute position

Use `clipAt(position, size)` to clip an area at an absolute position. 

```javascript
import gridl from 'gridl';

const data = [
   [ 1, 2, 3, 4, 5, 6, 7, 8, 9,10],
   [11,12,13,14,15,16,17,18,19,20],
   [21,22,23,24,25,26,27,28,29,30],
   [31,32,33,34,35,36,37,38,39,40],
   [41,42,43,44,45,46,47,48,49,50],
   [51,52,53,54,55,56,57,58,59,60],
];
const position = [4,1];
const size = [3,2];

const grid = gridl(data).clipAt(position, size);
grid.numColumns(); // now returns 2
grid.numRows(); // now returns 3
const gridData = grid.data();

// gridData looks like this:
// [
//    [15,16,17],
//    [25,26,27],
// ]
``` 

### <a name="rel"></a>Relative position

Use `clip(size)` to clip an area at the current position.

```javascript
import gridl from 'gridl';

const data = [
   [ 1, 2, 3, 4, 5, 6, 7, 8, 9,10],
   [11,12,13,14,15,16,17,18,19,20],
   [21,22,23,24,25,26,27,28,29,30],
   [31,32,33,34,35,36,37,38,39,40],
   [41,42,43,44,45,46,47,48,49,50],
   [51,52,53,54,55,56,57,58,59,60],
];
const position = [4,1];
const size = [3,2];

const grid = gridl(data).clipAt(position, size);
grid.numColumns(); // now returns 2
grid.numRows(); // now returns 3

// export data as array
const gridData = grid.data();

// gridData looks like this:
// [
//    [15,16,17],
//    [25,26,27],
// ]
``` 