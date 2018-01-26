## Navigating

Go to an absolute position:
```javascript
const data = [
    [1,2,3],
    [4,5,6],
];
gridl(data)
    .goto([2,1]) // go to position (x=2, y=1) on the grid
    .position(); // returns [2,1]
```

Walk in a direction (= going to positions relative to the current position):

```javascript
const { UP } = gridl.directions;
const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
];
gridl(data)
    .goto([3,1])   // go to position (x=3, y=1)
    .walk([-2,1])  // go two steps left and one step down, position is now [1,2]
    .walk(UP)      // go one steps up, position is now [1,1]
    .position();   // returns [1,1]
```
