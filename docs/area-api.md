## Subgrid API (DRAFT)

**Note:** This code is **not** working. It's just a collection of thoughts how gridl could work in the future.

* Work with a grid inside the main grid
* Changes in the subgrid would immediately affect the main grid
* Provides a just subset of the functionality the main grid  has (reason: rotating a none-squared subgrid would be complicated for example)

```javascript
gridl(data).area(size, [position]).reduce((acc, val, pos, src) => {...})`
gridl(data).area(size, [position]).map((val, pos, src) => {...})
gridl(data).area(size, [position]).fill((val, pos, src) => {...})
gridl(data).area(size, [position]).find((val, pos, src) => {})
gridl(data).area(size, [position]).value([value])
gridl(data).area(size, [position]).valueAt([value])
gridl(data).area(size, [position]).data([areaData])
gridl(data).area(size, [position]).couldContain(otherArea, anchor)` former `areaFits(otherArea, anchor)
gridl(data).area(size, [position]).flipX()
gridl(data).area(size, [position]).flipY()
gridl(data).area(size, [position]).goto(localPos)
gridl(data).area(size, [position]).walk(localDirection)
gridl(data).area(size, [position]).column(x)
gridl(data).area(size, [position]).row(y)
gridl(data).area(size, [position]).size()
gridl(data).area(size, [position]).swapCell()
gridl(data).area(size, [position]).swapCells()
gridl(data).area(size, [position]).swapColumns()
gridl(data).area(size, [position]).swapRows()
```
