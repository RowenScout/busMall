'use strict';

//Arrays demonstration

//arrays are ordered using indexes. Each value is assigned a unique index, begining with 0.

var names = ['Rowen', 'Rachel', 'Name', 'Name']

var rowen = names[0];

console.log(rowen)

//Will replace index 1 with 'againbutts'.
names[1]= 'againbutts';

//Adds an item to the end of an array.
names.push('butts');

//Removes the last item of an array.
names.pop();

//Adds an item to the begining of an array.
names.unshift('frontbutts');

//Splice lets us add or remove items from an array.
//names.splice(index, howmany, item, item);
//index determines where the splice happens
//howmany will remove this many values from the array at the index
//Splice will then add the items into the array at the index
names.splice(1, 1, 'Scout');

//indexOf will search the array for an index containing the data specified in the argument.
names.indexOf("Rachel");

//example: this will search the array 'name' for Rachel, then remove that item from the array.
names.splice(name.indexOf("Rachel"), 1);
