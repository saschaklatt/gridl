# TODOs

## Bugs

* no bugs reported at the moment

## Issues

* rename findPosition() to find()
* rename findPositionInArea() to findInArea()
* checkAreaFits should support anchors

## Nice to haves

* cloning
* [expressive syntax](expressive-syntax.md)
* iterator functions like map and forEach
* generating: generateArea(), generateRow(), generateColumn()
* shifting: rows, columns and areas (shift left, right, up, down)
* concatenating grids (two 3x3 grids become one 6x3 grid)
* areas: swapping, moving
* eternal mode
* [subgrid api](subrid-api.md)
* path finding

## Known issues

* Error handling should be improved, throw error when... 
    * area is not an 2d array
* position error handling is inconsistent in some cases (throwing an error vs. returning undefined)
