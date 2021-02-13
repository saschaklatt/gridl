## What are transformers?

As the name suggests, transformer functions are used to change grid instances. Since a grid instance is shallowly frozen, the data structure can't be changed. Instead, transformer functions return a new transformed instance.

For details see the [[transformers | full list of transformers]].

## Using a single transformer

```js
import {createGridFromArray2D} from "gridl/core";
import {addRowTop} from "gridl/transformers";

const grid = createGridFromArray2D([
    [0,  1,  2,  3],
    [4,  5,  6,  7],
    [8,  9, 10, 11],
]);
const newGrid = addRowTop(["x", "x", "x", "x"])(grid);
// resulting grid:
// {
//     x: 0,
//     y: 0,
//     cellCount: 12,
//     columnCount: 4,
//     rowCount: 4,
//     _array2D: [
//         ["x", "x", "x", "x"],
//         [  0,   1,   2,   3],
//         [  4,   5,   6,   7],
//         [  8,   9,  10,  11],
//     ],
// }
```

## Composing transformers

To combine multiple transfomers, use the [[transform]] function.

```js
const oldGrid = createGridFromArray2D([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]);

const newGrid = transform(
    map((_cell, pos) => pos.x < 2 ? 1 : 2), // 1. apply map transformer
    setCell({x: 2, y: 1}, 666),             // 2. apply setCell transformer
    rotate90(1),                            // 3. apply rotate90 transformer
    removeRow(1),                           // 4. apply removeRow transformer
)(oldGrid);

// => resulting grid
// {
//     x: 0,
//     y: 0,
//     cellCount: 9,
//     columnCount: 3,
//     rowCount: 3,
//     _array2D: [
//         [1, 1, 1],
//         [2, 666, 2],
//         [2, 2, 2],
//     ],
// }
```

## Custom transformers

If you can't find an existing transformer that suits your needs, you can easily write your own one.

```js
// custom transformer
// removes odd rows and fills the remaining cells with a given fillValue
const removeOddRowsAndFillWith = (fillValue) => {
    return (grid) => {
        const array2D = [];
        grid._array2D.forEach((row, y)) => {
            if (y % 2 === 0) {
                const filledRow = row.map(() => fillValue);
                array2D.push(filledRow);
            }
        };
        return createGridFromArray2D({x: grid.x, y: grid.y, array2D});
    };
};

const grid = createGridFromArray2D([
    [0,  1,  2,  3],
    [4,  5,  6,  7],
    [8,  9, 10, 11],
]);

// apply your custom transformer to the grid
removeOddRowsAndFillWith(7)(grid);

// or alternatively, apply your custom transformer with transform()
transform(removeOddRowsAndFillWith(7))(grid);

// => resulting grid
// {
//     x: 0,
//     y: 0,
//     cellCount: 8,
//     columnCount: 4,
//     rowCount: 2,
//     _array2D: [
//         [7, 7, 7, 7],
//         [7, 7, 7, 7],
//     ],
// }
```

Note that `removeOddRows()` in the example is a transformer creator function, which means that it must return a [[GridTransformer]] - another function, that takes the orginal grid as single parameter and returns the new transformed grid instance. This general transformer pattern is necessary, so that the transformer can be used together with the [[transform]] function.
