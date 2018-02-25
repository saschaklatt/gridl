* [gridl instance](#gridl)
* [Grid array](#grid)
* [List array](#list)

### <a name="gridl"></a>gridl instance

Generating a gridl instance and perform operations on it

```javascript
import { makeGridl } from 'gridl';

// create a gridl instance
const columns = 4;
const rows = 3;
const grid = makeGridl(columns, rows, ({ column, row }) => `${column},${row}`);

// perform gridl operations
const data = grid.valueAt([2,1], 'bam').data();

// data looks like this:
// [
//     ['0,0', '1,0', '2,0', '3,0'],
//     ['0,1', '1,1', 'bam', '3,1'],
//     ['0,2', '1,2', '2,2', '3,2'],
// ]
```

### <a name="grid"></a>Grid array

Generating a grid data array (two-dimensional array)

```javascript
import { makeDataGrid } from 'gridl';

const columns = 4;
const rows = 3;
const data = makeDataGrid(columns, rows, ({ column, row }) => `${column},${row}`);

// data looks like this:
// [
//     ['0,0', '1,0', '2,0', '3,0'],
//     ['0,1', '1,1', '2,1', '3,1'],
//     ['0,2', '1,2', '2,2', '3,2'],
// ]
```

### <a name="list"></a>List array

Generating a list data array (one-dimensional array)

```javascript
import { makeDataList }  from 'gridl';

const length = 4;
makeDataList(length, (index) => `${index}`); // ['0', '1', '2', '3']
```

