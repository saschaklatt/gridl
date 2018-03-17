# Changelog

**v0.10.0**

* New area API
* Refactored plugin API
    * replaced `gridl.fn` with `gridl.use(key, plugin)`
* removed navigation api to simplify things
    * removed internal position in gridl
    * removed `goto()`, `walk()`, `position()`
    * removed all functions that were using the internal position
* allow importing empty data (no rows and no columns)

**v0.9.0**

* Plugin API !!!
    * You can now add custom functions to gridl and mess around with the internal state. Note: all responsibility lies with the plugin creator!
    * heavy internal refactoring (every public gridl function is now implemented via a core plugin)
    * support for namespaces: functions can be scoped with the name of the plugin
* new `fill()` method: similar to map/forEach, but returns the **current** gridl instance, not a copy
    * fill all cells with a fixed value: `gridl(data).fill('bam')`
    * fill all cells using a callback function: `gridl(data).fill((v, pos, src) => 'bam')`
* `data()` can also be used as setter now: `gridl(data).data(newData)`
* generators
    * moved generators into their own namespace `generators`
    * renamed generators
        * `gridl.make()` to `import { generators } from gridl; generators.makeGridl();`
        * `gridl.makeGrid()` to `import { generators } from gridl; generators.makeDataGrid()`
        * `gridl.makeList()` to `import { generators } from gridl; generators.makeDataList()`
* constants
    * moved constants into their own namespaces: `adjacences` and `directions`
    * `gridl.adjacences` is not supported anymore - use `import { adjacences } from 'gridl'` instead
    * `gridl.directions` is not supported anymore - use `import { directions } from 'gridl'` instead
* removed `setValue()` and `setValueAt()`, they are now fully replaced by `value()` and `valueAt()`
* renamed mirror functions
    * `mirrorX()` to `flipX()`
    * `mirrorY()` to `flipY()`
* don't throw error when `walk()` outside the grid
* integrated tutorials into JSDoc

**v0.8.7**

* added reduceArea() and reduceAreaAt() functions

**v0.8.6**

* added more predefined adjacence sets
    * adjacences.ALL_CW
    * adjacences.ALL_CCW
    * adjacences.DIAGONAL_CW
    * adjacences.DIAGONAL_CCW
    * adjacences.HORIZONTAL_CW
    * adjacences.HORIZONTAL_CCW
* made all adjacence and direction constants immutable

**v0.8.5**

* implemented reduce() method
* added a changelog :)