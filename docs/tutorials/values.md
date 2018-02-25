`gridl` provides an easy way to access single cells.

* [Getting values](#get)
* [Setting values](#set)


### <a name="get"></a>Getting values

Getting values at position `[1,2]`:

```javascript
import gridl from 'gridl';

const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
gridl(data).valueAt([1, 2]);      // would be 8
gridl(data).goto([1, 2]).value(); // does the same
```

### <a name="set"></a>Setting values

Setting values at position `[1,2]`:

```javascript
import gridl from 'gridl';

const data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
const newGrid1 = gridl(data).valueAt([1, 2], 'Hi').data();    // sets the content of the cell at [1,2] to 'Hi'
const newGrid2 = gridl(data).goto([1, 2]).value('Hi').data(); // does the same

// the grids would look like this:
// [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 'Hi', 9],
// ];
```
