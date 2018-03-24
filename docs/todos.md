# TODOs

## Known bugs

* BUG: plugins can't be used across multiple files // is this still an issue? -> investigate

## Known issues
 
* `.data(array2D)` function behaves differently on area and gridl instance - confusing, should be unified
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
* error handling should be improved
    * throw error when area is not a 2d array
    * position error handling is inconsistent in some cases (throwing an error vs. returning undefined)

## Planned features

### v0.10
 
* implement [area api](area-api.md) (subset of gridl api for inner areas)
* ~~fix plugins api~~
* ~~remove navigation api~~
* ~~importing empty data (no rows or columns)~~

## v0.10.x

* rename `intersectsWith()` to `overlapsWith()` and deprecate `intersectsWith()`
* further area functions
* webpack 4
* ~~jsdoc for area api~~

### v0.11

* add a function to remove plugins? such as: `gridl.remove(pluginName)`
* hasSameSize helper function `.hasSameSize(dataOrGridOrArea)`


### pre release

* jsdoc
    * evaluate [jsdoc-webpack-plugin](https://www.npmjs.com/package/jsdoc-webpack-plugin)
* eternal mode
    * positions outside the grid will be mapped to position within the grid
    * e.g. position `[5,0]` will be mapped to `[0,0]` on a grid with 4 columns (starts from the left)
* optimizations
    * look for better algorithms

## Considering features

* areas: swapping, moving
* path finding
* sorting
* toString()
* get random cells: from the entire grid or a specific area
* valueAt(index): support accessing values at an index in addition to a position
* shifting
    * shift rows, columns and areas 
    * shift left, right, up, down
* concatenation
    * `concat.horizontal(otherGrid)`: concatenate grids (e.g. two 3x3 grids become one 6x3 grid)
    * `concat.vertical(otherGrid)`: concatenate grids (e.g. two 3x3 grids become one 3x6 grid)

## Other TODOs

* website
    * use gh_pages branch to deploy static content (https://gist.github.com/chrisjacob/825950/133aae5c3fd6e49cb145c7a59c6fb098db4013c4)
    * come up with a custom theme
    * style JSDoc output according to theme
    * integrate code coverage
    * setup Google Analytics to analyze which functions are looked up the most
* optimizations
    * check if it would make more sense to store the data as a two-dimensional array internally 
        * less conversion necessary
        * derive number of rows and columns from data structure instead of storing it in the state
* tests
    * split tests into separate files (e.g. plugin-wise)