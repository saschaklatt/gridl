* [Wrinting plugins](#write)
    * [Single functions](#write-single-function)
    * [Multiple functions](#write-multiple-functions)
    * [Namespaces](#write-namespaces)
* [Internal state](#state)
    * [state.data](#state-data)
    * [state.rows / state.columns](#state-rows-columns)
    * [state.position](#state-position)

You can extend `gridl` with you own functionality using plugins.

**Attention**: Note that when writing plugins you're working with the [internal state](#state) of gridl. You can easily 
break the functionality of other gridl functions by not using the [internal state](#state) properly. All responsibility 
lies with the plugin creator. 

### <a name="write"></a>Writing plugins

Plugins are registered via the static `gridl.fn` object. 

```javascript
gridl.fn.myAwesomePlugin = (gridlInstance, state) => {
    // every plugin starts with a plugin factory function like this
    
    // Parameters:
    // - gridlInstance: is a reference to the current gridl instance
    // - state: is the internal state object that you can manipulate
    
    // ...plugin implementation goes here
}
```

#### <a name="write-single-function"></a>Single functions

To add a single function simply return the function implementation within the plugin factory function. 

```javascript
import gridl from 'gridl';

// register the plugin function "setFirstCell" that simply sets the first cell to a given value.
gridl.fn.setFirstCell = function(gridlInstance, state) {
    
    // the plugin factory function
    
    // return the actual plugin function directly 
    return function(value) {
        
        // the plugin function
        
        // set the first cell in the grid to a given value by manipulating the internal state object
        state.data[0] = value; 
        
        // return the current gridl instance to allow method chaining
        return gridlInstance;
    };
};

// usage

const data = [
    [6,6,6],
    [6,6,6],
];
const result = gridl(data)
    .setFirstCell(1)        // use the new plugin function and pass in 1 as value
    .valueAt([0,0]);        // use the data() function via method chaining in order to get the updated grid data

// result looks like this
// [
//     [1,6,6],
//     [6,6,6],
// ]
```

#### <a name="write-multiple-functions"></a>Multiple functions

In order to provide multiple functions within a plugin you can simply bundle all your plugin functions in an object that
contains a `methods` field. This approach is useful if you want to share functionality throughout your functions.

```javascript
import gridl, { utils } from 'gridl';

const data = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [10,11,12],
    [13,14,15],
];
gridl.fn.oddEvenPlugin = function(instance, state) {

    // the filter functions to either filter odd or even rows
    const evenFilter = (row, index) => index % 2;
    const oddFilter = (row, index) => !evenFilter(row, index);

    // commonly used function to manipulate the internal state
    function filter(filterMethod) {
        const grid = utils.unflatten(state.data, state.columns, state.rows);    // get the internal state and convert it into a two dimensional grid array
        const filteredData = grid.filter(filterMethod);             // filter the rows with the given filter method
        state.rows = filteredData.length;                           // update the new number of rows
        state.data = utils.flatten(filteredData);                   // update the internal data, flatten it to a one-dimensional grid 
        return instance;                                            // return the gridl instance to allow method chaining
    }

    // return the plugin as object, all public functions are bundled in the methods fields
    return {
        methods: {
            filterOddRows: filter.bind(this, oddFilter),    // filter function with oddFilter
            filterEvenRows: filter.bind(this, evenFilter),  // filter function with evenFilter
        },
    };
};

const theOddRows = gridl(data).filterOddRows().data();
// theOddRows looks like this
// [
//     [1,2,3],
//     [7,8,9],
//     [13,14,15],
// ]

const theEvenRows = gridl(data).filterEvenRows().data();
// theEvenRows looks like this
// [
//     [4,5,6],
//     [10,11,12],
// ]
```

#### <a name="write-namespaces"></a>Namespaces

You can scope your plugins methods by using a namespace. You achieve this by also returning a `namespace` field set to 
`true` in the plugin factory function.

```javascript
import gridl, { utils } from 'gridl';

// same example as above but with the `oddEven` namespace
const data = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [10,11,12],
    [13,14,15],
];

// the namespace is always named after the plugin, here `oddEven`
gridl.fn.oddEven = function(instance, state) {

    const evenFilter = (row, index) => index % 2;
    const oddFilter = (row, index) => !evenFilter(row, index);

    function filter(filterMethod) {
        const grid = utils.unflatten(state.data, state.columns, state.rows);
        const filteredData = grid.filter(filterMethod);
        state.rows = filteredData.length;
        state.data = utils.flatten(filteredData);
        return instance;
    }

    return {
        namespace: true, // enable namespace
        methods: {
            filterOddRows: filter.bind(this, oddFilter),
            filterEvenRows: filter.bind(this, evenFilter),
        },
    };
};

const theEvenRows = gridl(data).oddEven.filterOddRows().data(); // you now need to use the `oddEven` namespace in front of your function 
// theEvenRows looks like this
//[
//    [1,2,3],
//    [7,8,9],
//    [13,14,15],
//]

const theOddRows = gridl(data).oddEven.filterEvenRows().data(); // you now need to use the `oddEven` namespace in front of your function
// theOddRows looks like this
//[
//    [4,5,6],
//    [10,11,12],
//]
```

### <a name="state"></a>Internal state

With plugins you are able manipulate the internal state. The internal state is an object with the following structure:

```javascript
{
    rows,       // the number of rows
    columns,    // the number of columns
    data,       // the grid data as flat one-dimensional array
    position,   // the current position
}
```

#### <a name="state-data"></a>state.data

The data is stored as one-dimensional array `state.data`. That means two-dimensional grid data is flattened to a 
one-dimensional array. You can use the `utils.flatten()` function to convert a two-dimensional array into a 
one-dimensional array.

#### <a name="state-rows-columns"></a>state.rows / state.columns

The number of rows and columns. When manipulating `state.data` you have to make sure `state.rows` and `state.columns`
are updated accordingly.

#### <a name="state-position"></a>state.position

The internal position that is used for navigating with `goto()` and `walk()`.