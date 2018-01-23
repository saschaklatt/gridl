# Goto syntax

I'm thinking of a more expressive way to use gridl:

**Getting / setting values**

```javascript
// getting value at a certain position
gridl(data).goto(pos).value.get(); // long form, no real benefit, just for consistency
gridl(data).goto(pos).value(); // short form

// setting a value at a certain position
gridl(data).goto(pos).value.set(value); // long form (enables you to set values to undefined)
gridl(data).goto(pos).value(value); // short form
```

**Moving a cell**

```javascript
// move a single cell to an absolute position
gridl(data).goto(pos).move([0,0]).position(destination);
gridl(data).goto(pos).move().position(destination); // short form for cell at current position

// move a single cell in an certain direction
gridl(data).goto(pos).move([0,0]).direction(destination);
gridl(data).goto(pos).move().direction(direction); // short form for cell at current position
```

**Moving an area**

```javascript
// move an area to an absolute position
gridl(data).goto(pos).move(area).position(destination);

// move an area in a certain direction
gridl(data).goto(pos).move(area).direction(direction);
```

**Finding within the entire grid**

```javascript
// find a position, search in the entire grid
gridl(data).find(callback).position();

// find a value, search in the entire grid
gridl(data).find(callback).value();
```

**Finding within an area**

```javascript
// finding in a certain area
gridl(data).goto(pos).area(area).find(callback).position(); // global position on the grid
gridl(data).goto(pos).area(area).find(callback).localPosition(); // local position within the area
gridl(data).goto(pos).area(area).find(callback).value();
```

**Checking if an area would fit at a certain position**

```javascript
// check if area fits at a certain position
gridl(data).goto(pos).checkAreaFits(area);
```

**Extracting a gridl subset**

```javascript
// create a gridl instance to handle a subset of the main grid
const main = gridl(data);
const subset = main.goto(pos).subGridl(size);

// do all the fancy gridl operations on the subset
subset.columns();
subset.gotoPos(pos).move().direction(direction);

// merge changes back into the main gridl
main.setAreaAt(pos, subset.getData());
```
