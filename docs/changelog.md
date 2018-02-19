# Changelog

**v0.9.0**

* Plugin API !!!
    * You can now add custom functions to gridl and mess around with internal state. Note: all responsibility lies with the plugin creator!
    * Heavy internal refactoring (every public gridl function is now a plugin by definition)
* removed `setValue()` and `setValueAt()`
* removed `mirrorX()` and `mirrorY()`
* don't throw error when `walk()` outside the grid
* moved generators into their own namespace `generators`
* renamed generators
    * renamed `make()` to `makeGridl()`
    * renamed `makeGrid()` to `makeDataGrid()`
    * renamed `makeList()` to `makeDataList()`

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