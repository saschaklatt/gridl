## Draw a cow

```javascript
const cow = gridl
    // generate 13x6 grid that is filled with whitespaces
    .generate(13, 6, () => ' ')
    // draw head
    .setAreaAt([9,0], [
        ['(','_','_',')'],
        ['(','o','o',')'],
        ['-','\\','/',' '],
    ])
    // draw body
    .setAreaAt([0,2], [
        [' ',' ','/','-','-','-','-','-','-','-'],
        [' ','/',' ','|',' ',' ',' ',' ',' ','|','|'],
        ['*',' ',' ','|','|','-','-','-','-','|','|'],
        [' ',' ',' ','^','^',' ',' ',' ',' ','^','^'],
    ])
    // add line breaks at the very right
    .addColumnAt(gridl.generateData(1, 6, () => '\n'), 13)
    // export data grid
    .getData()
    // join grid to a single string
    .reduce((res, row) => res + row.join(''), '')
;
console.log(cow);

// cow looks like this:
//
//          (__)
//          (oo)
//   /-------\/
//  / |     ||  
// *  ||----||  
//    ^^    ^^  

```