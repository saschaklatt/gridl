Every `gridl` instance stores an internal position. You can change this position by going to an absolute position via
`goto(position)` or by walking into a direction relative to the current position via `walk(direction)`.

* [Absolute positions](#abs)
* [Relative positions](#rel)
* [Get the current position](#position)

### <a name="abs"></a>Absolute positions

Go to an absolute position:

```javascript
import gridl from 'gridl';

const data = [
    [1,2,3],
    [4,5,6],
];
gridl(data).goto([2,1]); // go to position (x=2, y=1) on the grid
```

### <a name="rel"></a>Relative positions

Walk in a direction (= going to positions relative to the current position):

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
];
gridl(data)
    .goto([3,1])   // go to position (x=3, y=1)
    .walk([-2,1]); // go two steps left and one step down, position is now [1,2]
```

### <a name="position"></a>Get the current position

You can get the current position with `position()`:

```javascript
import gridl, { directions } from 'gridl';

const { UP } = directions; 
const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
];
const instance = gridl(data);
instance.position(); // the position is set to [0,0] initially
instance
    .goto([3,1])   // go to position [3,1]
    .walk([-2,1])  // go two steps left and one step down, position is now [1,2]
    .walk(UP)      // go one steps up, position is now [1,1]
    .position();   // position is now [1,1]
```
