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

* The size can never be changed (would lead to inconsistency with the main grid)
* 

### Proposal

#### Area as sub grid




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
gridl(data).area(areaDescription).reduce((acc, val, pos, src) => {...})
gridl(data).area(areaDescription).map((val, pos, src) => {...})
gridl(data).area(areaDescription).fill((val, pos, src) => {...})
gridl(data).area(areaDescription).find((val, pos, src) => {})
gridl(data).area(areaDescription).valueAt(localPosition)
gridl(data).area(areaDescription).localToGlobal(localPosition)
gridl(data).area(areaDescription).data([areaData]) // getter or setter
gridl(data).area(areaDescription).fitsInto(otherArea) // former: areaFits(otherArea, anchor)
gridl(data).area(areaDescription).intersectsWith(otherArea)
gridl(data).area(areaDescription).flipX()
gridl(data).area(areaDescription).flipY()
gridl(data).area(areaDescription).column(x)
gridl(data).area(areaDescription).row(y)
gridl(data).area(areaDescription).size()
gridl(data).area(areaDescription).swapCell()
gridl(data).area(areaDescription).swapCells()
gridl(data).area(areaDescription).swapColumns()
gridl(data).area(areaDescription).swapRows()
gridl(data).area(areaDescription).apply() // apply changes to its parent (the gridl instance)
```
