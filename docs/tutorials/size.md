Get the size of your grid:

```javascript
import gridl from 'gridl';

const data = [
    [1,2,3],
    [4,5,6],
];
gridl(data).numColumns(); // 3
gridl(data).numRows(); // 2
gridl(data).size(); // [3,2]
```