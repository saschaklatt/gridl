### <a name="grid"></a>Finding

Find the position of the cell with value 5 in the grid (first occurrence):

```javascript
import gridl from 'gridl';

const data = [
    [1,2,3],
    [4,2,5],
    [6,5,4],
];

// searching for a plain value
gridl(data).find(5); // would be [2,1]

// search by using a callback function that is executed on each cell
gridl(data).find(v => v === 5); // would be [2,1]
```