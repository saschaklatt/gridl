* [Extracting](#extract)
* [Adding](#add)
* [Removing](#remove)

#### <a name="extract"></a>Extracting

Extracting a row at a certain position:
```javascript
import gridl from 'gridl';

const data = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];
const g = gridl(data);
g.row(0); // returns [1,2,3]
g.row(1); // returns [4,5,6]
g.row(2); // returns [7,8,9]
```

Extracting a column at a certain position:

```javascript
import gridl from 'gridl';

const data = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];
const g = gridl(data);
g.column(0); // returns [1,4,7]
g.column(1); // returns [2,5,8]
g.column(2); // returns [3,6,9]
```

#### <a name="add"></a>Adding

Adding a row:
```javascript
import gridl from 'gridl';

const data= [
    [1,2,3],
    [4,5,6],
];
const row = [7,8,9];
const newGrid = gridl(data).addRow(row, 1).data();

// newGrid looks like this:
// [
//     [1,2,3],
//     [7,8,9],
//     [4,5,6],
// ]
```

Adding a column:
```javascript
import gridl from 'gridl';

const data= [
    [1,2,3],
    [4,5,6],
];
const column = [
    7,
    8,
];
const newGrid = gridl(data).addColumn(column, 0).data();

// newGrid looks like this:
// [
//     [7,1,2,3],
//     [8,4,5,6],
// ]
```

#### <a name="remove"></a>Removing

Removing a row:
```javascript
import gridl from 'gridl';

const data = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];
const newGrid = gridl(data).removeRow(1).data();

// newGrid looks like this:
// [
//     [1,2,3],
//     [7,8,9],
// ]);
```

Removing a column:
```javascript
import gridl from 'gridl';

const data = [
    [1,2,3],
    [4,5,6],
];
const newGrid = gridl(data).removeColumn(0).data();

// newGrid looks like this:
// [
//     [2,3],
//     [5,6],
// ]
```
