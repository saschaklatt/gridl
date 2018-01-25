## Expressive syntax (DRAFT)

I'm thinking of a more expressive way to use gridl.

**Note:** This code is **not** working. It's just a collection of thoughts how gridl could work in the future.

### Navigation API

#### Navigating

```javascript
gridl(data)
    .goto(pos) // go to an absolute position within the grid (initial position is 0,0)
    .walk(direction) // move from the current position in a given direction
    .getPosition() // returns the current position
```

#### Single cells

```javascript
gridl(data).goto(pos).getValue();
gridl(data).goto(pos).setValue(value);
```

#### Moving cells

```javascript
gridl(data).goto(pos).moveAbs(newPosition); // move a single cell to an absolute position
gridl(data).goto(pos).moveRel(direction);   // move a single cell in an given direction
```

#### Areas

Overwriting an entire area at a certain position:
```javascript
gridl(data).goto(position).setArea(area);
gridl(data).setAreaAt(position, area);
```

Extracting a subset of the grid:
```javascript
gridl(data).goto(position).getArea(size);
gridl(data).getAreaAt(position, size);
```

Check if an area would fit into the grid at a certain position:
```javascript
gridl(data).goto(position).checkAreaFits(area);
gridl(data).checkAreaFitsAt(position, area);
```

#### Clipping

Clip out an area:
```javascript
gridl(data).goto(position).clip(size);
```

### Swapping

Swapping two cells:
```javascript
gridl(data).goto([0,0]).swapCell([2,1]); // goto form
gridl(data).swapCells([0,0], [2,1]); // absolute form
gridl(data).swapRows(1,3);
gridl(data).swapColumns(1,3);
```

### Progress

#### Done

* goto(pos)
* walk(dir)
* position()
* getValue()
* setValue(value)
* moveAbs(pos)
* moveRel(dir)

#### TODO

* setArea(area)
* getArea(size)
* checkAreaFits
* clip(pos, size) -> clipAt(pos, size)
* clip(size)
* swapCell



