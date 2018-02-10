## Accessing data

Exporting the data as a two-dimensional array:

```javascript
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

Exporting the data as a one-dimensional array:

```javascript
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