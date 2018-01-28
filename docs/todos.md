# TODOs

## Bugs

* none

## Known issues

* IMPROVE THE PUBLISHING PROCESS !!!
    * make sure distribution files are generated before publishing
    * consider testing against dist/ files
    * continuous integration
* To think about: what should happen if goto() gets a position outside of the grid like [-2,1]? Error or accepting?
* Inconsistent getter/setter styles
    * style 1: value(), row(), position()
    * style 2: getAreaAt(), setAreaAt()
    * solution through [subgrid api](subgrid-api.md)
* Error handling should be improved, throw error when... 
    * area is not an 2d array
* position error handling is inconsistent in some cases (throwing an error vs. returning undefined)

## Planned features

* jsdoc
    * evaluate tutorial functionality of jsdoc
    * evaluate [jsdoc-webpack-plugin](https://www.npmjs.com/package/jsdoc-webpack-plugin)
    * integrate code coverage
* split helper functions
    * store them in separate files 
* rename "mirroring" to "flipping" 
* shifting
    * shift rows, columns and areas 
    * shift left, right, up, down
* concatenating grids (e.g. two 3x3 grids become one 6x3 grid)
* optimizations
    * evaluate if it would make more sense to store the data as a two-dimensional array internally (less conversion necessary)
    * look for better algorithms
* eternal mode

## Considering features

* [subgrid api](subgrid-api.md)
* areas: swapping, moving
* path finding
* sorting
* toString()


