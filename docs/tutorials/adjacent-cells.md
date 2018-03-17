`gridl` provides the ability to access various kinds of adjacent cells.

* [Directions](#directions)
    * [all](#directions-all)
    * [orthogonal](#directions-orthogonal)
    * [diagonal](#directions-diagonal)
* [Order](#order)
    * [clockwise](#order-cw)
    * [counterclockwise](#order-ccw)
* [Custom](#custom)
* [Inside vs. outside](#inside-outside)
    * [Include outside](#inside-outside-include)
    * [Exclude outside](#inside-outside-include)

## <a name="directions"></a>Directions

#### <a name="directions-all"></a>Get **all** adjacent cells of a certain cell:

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).adjacentCellsAt([2,2]); 
// both return [7, 8, 9, 12, 14, 17, 18, 19]
```

#### <a name="directions-orthogonal"></a>Get **orthogonal** adjacent cells only:

```javascript
import gridl, { adjacences } from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).adjacentCellsAt([2,2], adjacences.ORTHOGONAL);
// both return [8, 12, 14, 18]
```

#### <a name="directions-diagonal"></a>Get **diagonal** adjacent cells only:

```javascript
import gridl, { adjacences } from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).adjacentCellsAt([2,2], adjacences.DIAGONAL);
// both return [7, 9, 17, 19]
```

### <a name="order"></a>Order

By default adjacent cells ordered from left to right and top to bottom. You can alter the order by providing the 
`adjacence` parameter.

#### <a name="order-cw"></a>Get **orthogonal** adjacent cells in **clockwise** order:

```javascript
import gridl, { adjacences } from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).adjacentCellsAt([2,2], adjacences.ORTHOGONAL_CW);
// both return [8, 14, 18, 12]
```

#### <a name="order-ccw"></a>Get **orthogonal** adjacent cells in **counterclockwise** order:

```javascript
import gridl, { adjacences } from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).adjacentCellsAt([2,2], adjacences.ORTHOGONAL_CCW);
// both return [8, 12, 18, 14]
```

### <a name="custom"></a>Custom

You can provide your own custom set of adjacent cells. Just provide a list of directions relative to the current cell.

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
const upperNeighbours = [
    [-1,-1],
    [0,-1],
    [1,-1],
];
const currentCell = [3,2];
gridl(data).adjacentCellsAt(currentCell, upperNeighbours); // returns [8, 9, 10]
``` 

### <a name="inside-outside"></a>Inside vs. outside the grid

It can be necessary to iterate over the adjacent cells in an expected order. Cells at positions outside the grid will 
be ignored by default. You can provide the `includeOutsideValues` flag set to `true` in order to get outside values
as `undefined`.

#### <a name="inside-outside-include"></a>Include outside

Get all adjacent cells including those that would be **outside the grid** as undefined values.

```javascript
import gridl, { adjacences } from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).adjacentCellsAt([2,0], adjacences.ALL, true); 

// values that are outside the grid are returned as undefined
// both return [undefined, undefined, undefined, 2, 4, 7, 8, 9]
```

#### <a name="inside-outside-exclude"></a>Exclude outside

Get only the adjacent cells that are **inside the grid**:

```javascript
import gridl, { adjacences } from 'gridl';

const data = [
    [ 1, 2, 3, 4, 5],
    [ 6, 7, 8, 9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
];
gridl(data).adjacentCellsAt([2,0], adjacences.ALL, false); 

// both return [2, 4, 7, 8, 9]
```