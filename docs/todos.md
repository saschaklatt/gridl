# TODOs

## Known bugs

* none

## Known issues
 
* adjust examples
* split tests into separate files
* publishing process should be improved
    * make sure distribution files are generated before publishing
    * consider testing against dist/ files
    * continuous integration
    * manual steps at the moment
        * npm run build
        * update version in package.json
        * npm run doc
        * update changelog
        * update README (link to docs)
        * git add
        * git commit
        * git tag <version number>
        * git push origin master --tags
        * npm publish
* inconsistent getter/setter styles
    * style 1: value(), row(), position()
    * style 2: getAreaAt(), setAreaAt()
    * solution through [subgrid api](subgrid-api.md)
* error handling should be improved
    * throw error when area is not a 2d array
    * position error handling is inconsistent in some cases (throwing an error vs. returning undefined)

## Planned features

* additional area iterators
    * `areaMap()`
    * `areaForEach()`
    * rename `reduceArea()` to `areaReduce()` 
* new fill() method: similar to map/forEach, returns the current gridl instance
    * `gridl(data).forEach((v, pos, src) => src.valueAt(pos, 'bam'))`
    * `gridl(data).fill((v, pos, src) => 'bam')`
* concat(): concatenate grids (e.g. two 3x3 grids become one 6x3 grid)
* jsdoc
    * evaluate tutorial functionality of jsdoc
    * evaluate [jsdoc-webpack-plugin](https://www.npmjs.com/package/jsdoc-webpack-plugin)
    * integrate code coverage
    * remove from version control -> host it somewhere instead
* eternal mode
    * positions outside the grid will be mapped to position within the grid
    * e.g. position `[5,0]` will be mapped to `[0,0]` on a grid with 4 columns (starts from the left) 

## Considering features

* [subgrid api](subgrid-api.md)
* areas: swapping, moving
* path finding
* sorting
* toString()
* get random cells: from the entire grid or a specific area
* valueAt(index): support accessing values at an index in addition to a position
* shifting
    * shift rows, columns and areas 
    * shift left, right, up, down
* optimizations
    * evaluate if it would make more sense to store the data as a two-dimensional array internally (less conversion necessary)
    * look for better algorithms
