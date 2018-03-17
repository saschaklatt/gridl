* [Description](#description)
* [Sizing](#size)
* [Reading and writing data](#access)
* [Mapping](#map)
* [Reducing](#reduce)
* [Filling](#fill)
* [Finding](#find)
* [Intersection](#intersection)

### <a name="description"></a>Description

In order to interact with just a subset of the data, `gridl` provides so called "areas". Areas can be accessed by 
calling the `area()` function. The function accepts an array that describes the size and position of the area.

```javascript
import gridl from 'gridl';

// areaDescription describes the area
const areaDescription = [
    5, // the width or number of columns (default: 0)
    6, // the height or number of rows   (default: 0)
    1, // the x position on the grid     (default: 0)
    2, // the y position on the grid     (default: 0)
    1, // the x position of the anchor   (default: 0)
    1, // the y position of the anchor   (default: 0)
];

// the area() function provides the area object which provides a separate area api
const area = gridl(data).area(areaDescription);
```

### <a name="size"></a>Sizing
 
You can get the number of rows and columns as well as a size array 

```javascript
import gridl from 'gridl';

const data = [
    [ 1,  2,  3,  4,  5,  6],
    [ 7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
];
const area = gridl(data).area([3,2]);
area.numColumns(); // 3
area.numRows(); // 2
area.size(); // [3,2]
```

### <a name="access"></a>Reading and writing data

#### using .data(newData)

Extract a subset of the grid:

```javascript
import gridl from 'gridl';

const data = [
    [ 1,  2,  3,  4,  5,  6],
    [ 7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
];

gridl(data).area([3,2]).data();
// result would be:
// [
//     [14, 15, 16],
//     [20, 21, 22],
// ]

gridl(data).area([2,2,3,1]).data();
// the data of the area with a size of [2,2] at position [3,1] 
// [
//     [10, 11],
//     [16, 17],
// ]

gridl(data).area([2,2,3,1,2,1]).data();
// the data of the area with a size of [2,2] at position [3,1] and anchor point at [2,1]
// [
//     [2, 3],
//     [8, 9],
// ]
```

Using data(values) as a setter function to overwrite the data of the entire area.

```javascript
import gridl from 'gridl';

const data = [
    [0,7,3,2,8,4,8],
    [4,2,5,7,8,4,8],
    [6,6,6,6,7,4,8],
    [6,6,6,6,7,4,8],
    [6,5,1,6,9,2,7],
];

// get the area
const mainGrid = gridl(data);
const area = mainGrid.area([2,3,1,2]);

// set the data
area.data([
    [1,1],
    [2,2],
    [3,3],
]);

// apply the changed area data to the main grid
area.apply();

const newData = mainGrid.data();

// newData
// [
//     [0,7,3,2,8,4,8],
//     [4,2,5,7,8,4,8],
//     [6,1,1,6,7,4,8],
//     [6,2,2,6,7,4,8],
//     [6,3,3,6,9,2,7],
// ]
```

Or simplified by using method chaining:

```javascript
import gridl from 'gridl';

const data = [
    [0,7,3,2,8,4,8],
    [4,2,5,7,8,4,8],
    [6,6,6,6,7,4,8],
    [6,6,6,6,7,4,8],
    [6,5,1,6,9,2,7],
];

const newData = gridl(data)
    .area([2,3,1,2])
    .data([
        [1,1],
        [2,2],
        [3,3],
    ])
    .apply()
    .data();

// newData
// [
//     [0,7,3,2,8,4,8],
//     [4,2,5,7,8,4,8],
//     [6,1,1,6,7,4,8],
//     [6,2,2,6,7,4,8],
//     [6,3,3,6,9,2,7],
// ]
```

#### Using .valueAt(position, newValue) 

Areas also provide the `valueAt(position, newValue)` function as getter or setter.

Get the value at a certain position:

```javascript
import gridl from 'gridl';

const data = [
    [ 1,  2,  3,  4,  5,  6],
    [ 7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
];

const area = gridl(data).area([3,2,1,1]); // get area with size of [3,2] at position [1,1]
area.valueAt([2,1]); // returns 16 (value at position [2,1] inside the area)
```

Set the value at a certain position:

```javascript
import gridl from 'gridl';

const data = [
    [ 1,  2,  3,  4,  5,  6],
    [ 7,  8,  9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
];

const area = gridl(data).area([3,2,1,1]); // get area with size of [3,2] at position [1,1]
area.valueAt([2,1]); // returns 16 (value at position [2,1] inside the area)
area.apply(); // apply the changes that were made in the area only to the main grid
```

### <a name="map"></a>Mapping 

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
    [13,14,15,16],
    [17,18,19,20],
];

const areaData = gridl(data)
    .area([3,2,1,2])            // get area with size of [3,2] at position [1,2] 
    .map(value => value + 1)    // increase the value of each cell by 1
    .data();                    // export the data of the area

// areaData
// [
//     [11,12,13],
//     [15,16,17],
// ]
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
gridl(data).area([3,2,1,2]).reduce((res, value) => res + value, 0); // returns 78 (10 + 11 + 12 + 14 + 15 + 16)
```

### <a name="fill"></a>Filling

Fill the entire grid with a single value or a by using a callback function

```javascript
import gridl from 'gridl';

const data = [
    [ 1, 2, 3, 4],
    [ 5, 6, 7, 8],
    [ 9,10,11,12],
    [13,14,15,16],
    [17,18,19,20],
];

const result = gridl(data)
    .area([4,3])    // get area with size [4,3] at position [0,0]
    .fill('x')      // fill each cell with value 'x'
    .data();        // get the data of the area

// result
// [
//     ['x','x','x','x'],
//     ['x','x','x','x'],
//     ['x','x','x','x'],
// ]
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
gridl(data).area([3,2,2,1]).find(7); // returns [3,1]
gridl(data).area([3,2,2,1]).find(v => v === 7); // returns [3,1]
```

### <a name="intersection"></a>Intersection

#### isInside(otherArea)

Check if the area is completely inside another area.

```javascript
import gridl from 'gridl';

const data = [
    [0,7,3,2,8,4,8],
    [4,2,5,7,8,4,8],
    [6,6,6,6,7,4,8],
    [6,6,6,6,7,4,8],
    [6,5,1,6,9,2,7],
];
gridl(data).area([2,3,3,2]).isInside([2,3,3,2]); // true (is inside the same area)
gridl(data).area([2,3,3,2]).isInside([4,4,3,2]); // true (is inside a bigger area)
gridl(data).area([2,3,1,1]).isInside([2,3,1,0]); // false (is not completely inside)
```

#### contains(otherArea)

Check if the area completely contains another area.

```javascript
import gridl from 'gridl';

const data = [
    [0,7,3,2,8,4,8],
    [4,2,5,7,8,4,8],
    [6,6,6,6,7,4,8],
    [6,6,6,6,7,4,8],
    [6,5,1,6,9,2,7],
];
gridl(data).area([2,3,3,2]).contains([2,3,3,2]); // true (contains the same area)
gridl(data).area([4,4,3,2]).contains([2,3,3,2]); // true (contains a smaller area)
gridl(data).area([2,3,1,0]).contains([2,3,1,1]); // false (other area is not completely inside)
```

#### intersectsWith(otherArea)

Check if two areas intersect with each other.

```javascript
import gridl from 'gridl';

const data = [
    [0,7,3,2,8,4,8],
    [4,2,5,7,8,4,8],
    [6,6,6,6,7,4,8],
    [6,6,6,6,7,4,8],
    [6,5,1,6,9,2,7],
];
gridl(data).area([2,3,3,2]).intersectsWith([2,3,3,2]); // true (intersects the same area)
gridl(data).area([3,2,1,1]).intersectsWith([4,3,2,2]); // true (partly intersecting)
gridl(data).area([5,4,0,0]).intersectsWith([3,2,1,1]); // true (one area is inside the other area)
gridl(data).area([3,2,0,0]).intersectsWith([2,2,4,4]); // false (no intersection)
```
