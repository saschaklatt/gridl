## Cloning

Make a clone of a gridl:

```javascript
const data = [
    [1,2,3,4],
    [5,6,7,8],
];
const master = gridl(data);
const clone = master.clone();
const isTheSameInstance = master === clone; // false
const hasTheSameData = clone.getData() === master.getData(); // true
const hasTheSamePositionX = clone.position()[0] === master.position()[0]; // true
const hasTheSamePositionY = clone.position()[1] === master.position()[1]; // true
```