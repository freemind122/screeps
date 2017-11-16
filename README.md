# screeps
my code for screeps

creeps:
- need file for creep data, like parts etc
- need file for behaviour with defaults
- need file to handle alert level?
- need file to handle economy level
- need file to handle expansion
- need file to handle automated building
- want to find out about multi-requires
- need to work out how to set building priorities
- units.harvester.parts not working?

- maybe use the following to construct creep info
function person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
}
var myFather = new person("John", "Doe", 50, "blue");
var myMother = new person("Sally", "Rally", 48, "green");


- this could be useful for making sure the correct information is passed around
var x1 = new Object();    // A new Object object
var x2 = new String();    // A new String object
var x3 = new Number();    // A new Number object
var x4 = new Boolean();   // A new Boolean object
var x5 = new Array();     // A new Array object
var x6 = new RegExp();    // A new RegExp object
var x7 = new Function();  // A new Function object
var x8 = new Date();      // A new Date object

- how many required units of each type should be governed by percentages, as should how many parts should be used to make each one
