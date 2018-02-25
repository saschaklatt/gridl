In order to interact with just a subset of the data, `gridl` provides the ability to work with so called "areas".

* [Overwriting](#overwrite)
* [Extracting](#extract)
* [Fitting](#fit)
* [Reducing](#reduce)
* [Finding](#find)

### <a name="overwrite"></a>Overwriting
 
Overwriting or setting an entire area at a certain position:

```javascript
import gridl from 'gridl';

const data = [
    [ 1,  2,  3,  4,  5,  6],
    [ 7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
];
const area = [
    [4,  1,  8],
    [5,  3,  9],
];
const position = [3, 1];
const newGrid1 = gridl(data).setAreaAt(position, area).data();
const newGrid2 = gridl(data).goto(position).setArea(area).data();

// grids both look like this:
// [
//     [ 1,  2,  3,  4,  5,  6],
//     [ 7,  8,  9,  4,  1,  8],
//     [13, 14, 15,  5,  3,  9],
//     [19, 20, 21, 22, 23, 24],
// ]
```

### <a name="extract"></a>Extracting
 
Extract a subset of the grid:

```javascript
import gridl from 'gridl';

const data = [
    [ 1,  2,  3,  4,  5,  6],
    [ 7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
];
const size = [3, 2];
const position = [1, 2];
const area1 = gridl(data).getAreaAt(position, size);
const area2 = gridl(data).goto(position).getArea(size);

// areas both look like this:
// [
//     [14, 15, 16],
//     [20, 21, 22],
// ]
```

### <a name="fit"></a>Fitting

Check if an area would **fit into** the grid at a certain position:

```javascript
import gridl from 'gridl';

const data = [
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
];
const area = [
    [2,2,2],
    [2,2,2],
];

// absolute
gridl(data).areaFitsAt([0,0], area); // true
gridl(data).areaFitsAt([3,2], area); // true
gridl(data).areaFitsAt([4,0], area); // false
gridl(data).areaFitsAt([1,3], area); // false

// with goto()
gridl(data).goto([0,0]).areaFits(area); // true
gridl(data).goto([3,2]).areaFits(area); // true
gridl(data).goto([4,0]).areaFits(area); // false
gridl(data).goto([1,3]).areaFits(area); // false
```

### <a name="reduce"></a>Reducing 

E.g. reducing an area to the sum of all its values:

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
    [13,14,15,16],
    [17,18,19,20],
];
const position = [1,2];
const size = [3,2];
gridl(data).reduceAreaAt(position, size, (res, value) => res + value, 0);       // returns 78 (10 + 11 + 12 + 14 + 15 + 16)
gridl(data).goto(position).reduceArea(size, (res, value) => res + value, 0);    // returns 78 (10 + 11 + 12 + 14 + 15 + 16)
```

### <a name="find"></a>Finding

Find the position of the cell with value 7 within a given area (first occurrence):
```javascript
import gridl from 'gridl';

const data = [
    [0,7,3,2,8],
    [4,2,5,7,8],
    [6,6,6,6,7],
];
const areaPosition = [2,1];
const areaSize = [3,2];
gridl(data).findInArea(areaPosition, areaSize, v => v === 7); // result would be [3,1]
```