## Clipping

Clip out an area:
```javascript
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

// absolute syntax
const grid1 = gridl(data).clip(position, size);
grid1.numColumns(); // now returns 2
grid1.numRows(); // now returns 3

// alternatively relative syntax
const grid2 = gridl(data).goto(position).clip(size);
grid2.numColumns(); // now returns 2
grid2.numRows(); // now returns 3

// export data as array
const gridData1 = grid1.data();
const gridData2 = grid2.data();

// gridData1 and gridData2 both look like this:
// [
//    [15,16,17],
//    [25,26,27],
// ]
``` 