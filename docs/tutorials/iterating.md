* [forEach](#forEach)
* [map](#map)
* [reduce](#reduce)

### <a name="forEach"></a>forEach

**Iterating over values with `forEach()`**

Executes the provided callback function once for each grid element.

It's basically the equivalent of the array's [forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) function.

```javascript
import gridl from 'gridl';

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

### <a name="map"></a>map

**Mapping values with `map()`:**

It's basically the equivalent of the array's [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Map) function.

```javascript
import gridl from 'gridl';

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

const newData = copy.data();

// newData looks like this:
//
// [
//     ['x','x','x','x'],
//     ['x','x','x','x'],
//     ['x','x','x','x'],
// ]
```

### <a name="reduce"></a>reduce

**Reduce values with `reduce()`:**

It's basically the equivalent of the array's [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) function. 

```javascript
import gridl from 'gridl';

const data = [
    [1,2,3,4],
    [5,6,7,8],
    [10,11,12,13],
];
// calculate the sum of all cell values
gridl(data).reduce((accumulator, cellValue) => accumulator + cellValue, 0); // sum is 82
```
