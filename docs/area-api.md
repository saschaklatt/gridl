## Subgrid API (DRAFT)

**Note:** This code is **not** working. It's just a collection of thoughts how gridl could work in the future.

### Goals

* Work with a grid inside the main grid
* Changes in the subgrid would immediately affect the main grid
* have one data object to describe every aspect of area
    * position
    * size
    * anchor point 
* Provides a just subset of the functionality the main grid  has (reason: rotating a none-squared subgrid would be complicated for example)

### Proposal

#### Data format

```javascript
const area = [
    positionX = 0, 
    positionY = 0, 
    width = 0, 
    height = 0, 
    anchorX = 0, 
    anchorY = 0,
]
```

#### Methods

```javascript
gridl(data).area(area).reduce((acc, val, pos, src) => {...})
gridl(data).area(area).map((val, pos, src) => {...})
gridl(data).area(area).fill((val, pos, src) => {...})
gridl(data).area(area).find((val, pos, src) => {})
gridl(data).area(area).valueAt(relativePosition)
gridl(data).area(area).data([areaData]) // getter or setter
gridl(data).area(area).fitsInto(otherArea) // former: areaFits(otherArea, anchor)
gridl(data).area(area).intersectsWith(otherArea)
gridl(data).area(area).flipX()
gridl(data).area(area).flipY()
gridl(data).area(area).goto(localPos)
gridl(data).area(area).walk(localDirection)
gridl(data).area(area).column(x)
gridl(data).area(area).row(y)
gridl(data).area(area).size()
gridl(data).area(area).swapCell()
gridl(data).area(area).swapCells()
gridl(data).area(area).swapColumns()
gridl(data).area(area).swapRows()
```
