## Subgrid API (DRAFT)

**Note:** This code is **not** working. It's just a collection of thoughts how gridl could work in the future.

### Goals

* Work with a grid inside the main grid 
* Changes in the subgrid can be applied to the main grid
* Properties
    * size (number of columns and rows)
    * position on the main grid
    * anchor (center of the area)
* Intersection
    * Check if a position is inside an area
    * Check if two areas intersect
* Iteration
    * traversing all entries in a certain order
    * reducing all values to another value
    * mapping all elements
* Extraction
    * flat list (to apply Array.filter)
    * data array (2d grid array)

Optional:

* Rotating (square only)
* Flipping
* Swapping rows, columns, cells
* Convert local to global positions and vice versa
* Moving the subgrid within the main grid

### Restrictions

* The size of an area can never be changed (would lead to inconsistency with the main grid)

### Proposal

#### Area description

Describes:

* the size (width, height)
* center point (anchor)
* where the area is located on the grid (position)

```javascript
const areaDescription = [
    width = 0,
    height = 0,
    positionX = 0,
    positionY = 0,
    anchorX = 0,
    anchorY = 0,
]
```

The area description should be derived from area data:

```javascript
import { makeAreaDescription } from 'gridl';
const areaData = [
    [1, 1, 1],
    [1, 1, 1],
];
const areaPosition = [1, 4];
const areaAnchor = [0, 0];
makeAreaDescription(areaData, areaPosition, areaAnchor); // returns [2,3,1,4,0,0]
``` 

#### Methods

```javascript
√ gridl(data).area(areaDescription).numRows()
√ gridl(data).area(areaDescription).numColumns()
√ gridl(data).area(areaDescription).size()
√ gridl(data).area(areaDescription).position()
√ gridl(data).area(areaDescription).anchor()
√ gridl(data).area(areaDescription).valueAt(localPosition)
√ gridl(data).area(areaDescription).localToGlobal(localPosition)
√ gridl(data).area(areaDescription).data([areaData])
√ gridl(data).area(areaDescription).apply()
√ gridl(data).area(areaDescription).parent()
√ gridl(data).area(areaDescription).reduce((acc, val, pos, src) => {...})
√ gridl(data).area(areaDescription).map((val, pos, src) => {...})
√ gridl(data).area(areaDescription).fill((val, pos, src) => {...})
√ gridl(data).area(areaDescription).find((val, pos, src) => {})
√ gridl(data).area(areaDescription).description()
√ gridl(data).area(areaDescription).isInside(areaDesc)
√ gridl(data).area(areaDescription).contains(areaDesc)
√ gridl(data).area(areaDescription).intersectsWith(otherArea)
------ v0.10.0 -------
√ gridl(data).area(areaDescription).forEach((val, pos, src) => {...})
√ gridl(data).area(areaDescription).globalToLocal(globalPosition)
------ v0.10.1 -------
  gridl(data).area(areaDescription).column(x)
  gridl(data).area(areaDescription).row(y)
  gridl(data).area(areaDescription).clone()
  gridl(data).area(areaDescription).flipX()
  gridl(data).area(areaDescription).flipY()
  gridl(data).area(areaDescription).swapCell()
  gridl(data).area(areaDescription).swapCells()
  gridl(data).area(areaDescription).swapColumns()
  gridl(data).area(areaDescription).swapRows()
  gridl(data).area(areaDescription).list()
  gridl(data).area(areaDescription).overlapsArea(areaDesc)
  gridl(data).area(areaDescription).containsPosition(globalPosition) // already possible by using contains(areaDesc), calculations could be simplified when checking just a point instead of an area
  gridl(data).area(areaDescription).moveTo(position)
```
