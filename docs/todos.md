# TODOs

## Bugs

* none

## Known issues

* To think about: what should happen if goto() gets a position outside of the grid like [-2,1]? Error or accepting?
* Inconsistent getter/setter styles
    * style 1: columns(), rows(), position()
    * style 2: getValueAt(), getAreaAt()
* Error handling should be improved, throw error when... 
    * area is not an 2d array
* position error handling is inconsistent in some cases (throwing an error vs. returning undefined)

## Planned features

* iterator functions like map and forEach
* generating: generateArea(), generateRow(), generateColumn()
* shifting: rows, columns and areas (shift left, right, up, down)
* concatenating grids (two 3x3 grids become one 6x3 grid)
* eternal mode

## Considering features

* [subgrid api](subrid-api.md)
* areas: swapping, moving
* path finding


