## Finding

Find the position of the cell with value 5 in the grid (first occurrence):
```javascript
const data = [
    [1,2,3],
    [4,2,5],
    [6,5,4],
];
gridl(data).findPosition(v => v === 5); // would be [2,1] 
```

Find the position of the cell with value 7 within a given area (first occurrence):
```javascript
const data = [
    [0,7,3,2,8],
    [4,2,5,7,8],
    [6,6,6,6,7],
];
const areaPosition = [2,1];
const areaSize = [3,2];
gridl(data).findPositionInArea(areaPosition, areaSize, v => v === 7); // result would be [3,1]
```