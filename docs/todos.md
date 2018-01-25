# TODOs

## Bugs

* none

## Issues

* none

## Planned features

* [expressive syntax](expressive-syntax.md)
* cloning
* iterator functions like map and forEach
* generating: generateArea(), generateRow(), generateColumn()
* shifting: rows, columns and areas (shift left, right, up, down)
* concatenating grids (two 3x3 grids become one 6x3 grid)
* areas: swapping, moving
* eternal mode
* [subgrid api](subrid-api.md)
* path finding

## Known issues

* To think about: what should happen if goto() gets a position outside of the grid like [-2,1]? Error or accepting?
* Inconsistent getter/setter styles
    * style 1: columns(), rows(), position()
    * style 2: getValueAt(), getAreaAt()
* Error handling should be improved, throw error when... 
    * area is not an 2d array
* position error handling is inconsistent in some cases (throwing an error vs. returning undefined)
