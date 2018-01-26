## Iterator functions

**Mapping values:**

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
    return 'x';
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