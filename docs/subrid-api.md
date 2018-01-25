## Subgrid API (DRAFT)

**Note:** This code is **not** working. It's just a collection of thoughts how gridl could work in the future.

* Work with a grid inside the main grid
* Changes in the subgrid would immediately affect the main grid
* Provides a just subset of the functionality the main grid  has (reason: rotating a none-squared subgrid would be complicated for example)

```javascript
gridl(data).goto(pos).subgrid(size)
    // you're now in the subgrid API, every function is related to the subgrid
    .find()
    .mirrorX()
    .mirrorY()
    .goto()
    .walk()
    .moveAbsolute()
    .moveRelative()
    .swapCells()
    .swapColumns()
    .swapRows()
    .setValue()
    .getValue()
    .setArea()
    .getArea()          
    .getData()
    .findPosition()     // find local position in the area
    .toGlobal(position) // calculate the global position on the main grid
    .findValue()
    .subgrid() // nested subgrid inside the subgrid
```
