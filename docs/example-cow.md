## Draw a cow

Let's do some serious business and draw a cow.

```javascript
const head = [
    ['(','_','_',')'],
    ['(','o','o',')'],
    ['-','\\','/',' '],
];
const back = [
    ['-','-','-','-','-','-','-'],
];
const belly = [
    ['-','-','-','-'],
];
const tail = [
    [' ', ' ', '/'],
    [' ', '/', ' '],
    ['*', ' ', ' '],
];
const hindLegs = [
    ['|',' '],
    ['|','|'],
    ['^','^'],
];
const foreLegs = [
    ['|','|'],
    ['|','|'],
    ['^','^'],
];

const cow = gridl
    .generate(13, 6, () => ' ') // generate 13x6 grid that is filled with whitespaces
    .setAreaAt([9,0], head)
    .setAreaAt([3,2], back)
    .setAreaAt([5,4], belly)
    .setAreaAt([0,2], tail)
    .setAreaAt([3,3], hindLegs)
    .setAreaAt([9,3], foreLegs)
    .addColumn(gridl.generateData(1, 6, () => '\n'), 13) // add line breaks at the very right
;

function drawTheCow(cow) {
    return cow
        .getData() // export grid data array
        .reduce((res, row) => res + row.join(''), '') // join grid to a single string
    ;
}
console.log(drawTheCow(cow));

// cow looks like this:
//
//          (__)
//          (oo)
//   /-------\/
//  / |     ||  
// *  ||----||  
//    ^^    ^^  

// mirror the cow on the y-axis
cow.mirrorY();
console.log(drawTheCow(cow));

// cow looks like this:
//
// )__(         
// )oo(         
//  /\-------/  
//   ||     | / 
//   ||----||  *
//   ^^    ^^   

// do some plastic surgery
cow.valueAt([1,0], '(');
cow.valueAt([4,0], ')');
cow.valueAt([1,1], '(');
cow.valueAt([4,1], ')');
cow.swapCells([2,2], [3,2]);
cow.valueAt([11,2], '\\');
cow.valueAt([12,3], '\\');
console.log(drawTheCow(cow));

// cow looks like this:
//
// (__)         
// (oo)         
//  \/-------\  
//   ||     | \ 
//   ||----||  *
//   ^^    ^^   

```

