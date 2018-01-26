## Compact syntax

### todo

* dimensions
    * columns() -> numColumns()
    * rows()    -> numRows()
* single cells
    * getValue()                -> value()
    * setValue(value)           -> value(value) + setValue(value)
    * getValueAt(pos)           -> at(pos)
    * setValueAt(pos)           -> at(pos, value) + setAt(pos, value)
    * getRelativePosition()     -> scrap it!
    * getRelativeValue()        -> scrap it!
    * moveCellFrom(pos, dir)    -> scrap it!
* rows/columns
    * getRow(y)                 -> row(y)
    * getColumn(x)              -> column(x)
    * addRowAt(y)               -> addRow(y)
    * addColumnAt(y)            -> addColumn(y)
    * removeRowAt(y)            -> removeRow(y)
    * removeColumnAt(x)         -> removeColumn(x)
* areas
    * checkAreaFitsAt(pos, area, anchor) -> areaFitsAt(pos, area, anchor)
    * checkAreaFits(area, anchor)        -> areaFits(area, anchor)
    * setAreaAt(pos, area, anchor)       -> areaAt(pos, area, anchor)
    * getAreaAt(pos, size, anchor)       -> areaAt(pos, size, anchor)
    * setArea(area, anchor)              -> area(area, anchor)
    * getArea(size, anchor)              -> area(size, anchor)
* exporting 
    * getData() -> data()
* generating
    * generateData(columns, rows, cb)   -> makeGrid(columns, rows, cb)  `// generate two-dimensional grid array`
    * generateList(length, cb)          -> makeList(length, cb)         `// generate one-dimensional column or row array`
    * generate(columns, rows, cb)       -> make(columns, rows, cb)      `// create a new gridl instance`

### ok

* dimensions
    * size()    -> ok
* single cells
    * moveCell(pos)         -> ok
    * moveCells(from, to)   -> ok
    * swapCell(pos)         -> ok
    * swapCells(pos1, pos2) -> ok
* rows/columns
    * moveRow()             -> ok
    * moveColumn()          -> ok
    * swapRows(y1, y2)      -> ok
    * swapColumns(x1, x2)   -> ok
* clipping
    * clipAt(pos, size) -> ok 
    * clip(size)        -> ok
* finding
    * find(cb)                  -> ok
    * findInArea(pos, size, cb) -> ok
* transformation
    * rotate(steps) -> ok
    * mirrorX(x)    -> ok
    * mirrorY(y)    -> ok
* navigation
    * goto(pos)         -> ok
    * position()        -> ok
    * walk(direction)   -> ok
* iterators
    * map(cb) -> ok
* cloning
    * clone() -> ok