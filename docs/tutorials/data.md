* [Exporting as a grid](#export-grid)
* [Exporting as a list](#export-list)
* [Importing](#import)

### <a name="export-grid"></a>Export as grid

Exporting the data as a two-dimensional array:

```javascript
import gridl from 'gridl';

const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const result = gridl(data)
    .valueAt([1, 2], 10)    // change the value at x=1, y=2 from 8 to 10
    .data();                // export the data as two-dimensional array

// result looks like this:
// [
    // [1, 2, 3],
    // [4, 5, 6],
    // [7, 10, 9],
// ]
```

### <a name="export-list"></a>Export as list

Exporting the data as a one-dimensional array:

```javascript
import gridl from 'gridl';

const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const result = gridl(data)
    .valueAt([1, 2], 10)    // change the value at x=1, y=2 from 8 to 10
    .list();                // export the data as one-dimensional array
    
// result looks like this:
// [1, 2, 3, 4, 5, 6, 7, 10, 9] 
```

### <a name="import"></a>Importing

Importing a new data set:

```javascript
import gridl from 'gridl';

const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const g = gridl(data);

// import a new data set
g.data([
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1],
]);

// export the current data set
const result = g.data();

// result looks like this:
// [
//     [9, 8, 7],
//     [6, 5, 4],
//     [3, 2, 1],
// ]
```