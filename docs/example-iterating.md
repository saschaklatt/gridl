## Iterator functions

**Iterating over values with `forEach()`**

Executes the provided callback function once for each grid element.

```javascript
const data = [
    [1,2,3,4],
    [5,6,7,8],
    [10,11,12,13],
];
const master = gridl(data).forEach((value, pos, src) => {
    // value: the current value
    // position: the position of the current value
    // src: the same as origin (the current gridl instance, not the data array)
    
    // ...do something with the cell
});
```

**Mapping values with `map()`:**

It's basically the equivalent of the array's map() function.

```javascript
const data = [
    [1,2,3,4],
    [5,6,7,8],
    [10,11,12,13],
];
const origin = gridl(data);

const copy = origin.map((value, position, src) => {
    // value: the current value
    // position: the position of the current value
    // src: the same as origin (the current gridl instance, not the data array)
    return 'x'; // return 'x' for all cells
});

const isTheSameInstance = copy === origin; // false

const newData = copy.getData();

// newData looks like this:
//
// [
//     ['x','x','x','x'],
//     ['x','x','x','x'],
//     ['x','x','x','x'],
// ]
```