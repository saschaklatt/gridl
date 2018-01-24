## Generating data

Generating a data array
```javascript
const columns = 4;
const rows = 3;
const data = gridl.generateData(columns, rows, ({ column, row }) => `${column},${row}`);

// data looks like this:
// [
//     ['0,0', '1,0', '2,0', '3,0'],
//     ['0,1', '1,1', '2,1', '3,1'],
//     ['0,2', '1,2', '2,2', '3,2'],
// ]
```

Generating a gridl instance and perform operations on it
```javascript

// create a gridl instance
const columns = 4;
const rows = 3;
const grid = gridl.generate(columns, rows, ({ column, row }) => `${column},${row}`);

// perform gridl operations
const data = grid.setValueAt([2,1], 'bam').getData();

// data looks like this:
// [
//     ['0,0', '1,0', '2,0', '3,0'],
//     ['0,1', '1,1', 'bam', '3,1'],
//     ['0,2', '1,2', '2,2', '3,2'],
// ]
```