/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Overwatch');
 * mod.thing == 'a thing'; // true
 */
var units = require ('general');

var harvester = require ('Units')
var builder = require ('Units')
var upgrader = require ('Units')


function Overwatch () {
    if (units.num('harvester') < 2) {
        units.make('Spawn1','harvester');
    }
    else {
        if (units.num('builder') < 3) {
            units.make('Spawn1','builder');
        }
        else {
            if (units.num('upgrader') < 1) {
                units.make('Spawn1','upgrader');
            }
        }
    }
};


module.exports = Overwatch;
