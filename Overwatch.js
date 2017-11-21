/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Overwatch');
 * mod.thing == 'a thing'; // true
 */
var custom = require ('general');

var harvester = require ('Units')
var builder = require ('Units')
var upgrader = require ('Units')

var Overwatch = {
    units : function() {
        if (custom.variables.units.num('harvester') < 1 * custom.variables.economy.harvestLevel('Origin')) {
            custom.functions.units.make('Origin','harvester');
        }
        else {
            if(custom.variables.units.num('harvester2') < 1 * custom.variables.economy.harvestLevel('Origin')) {
                custom.functions.units.make('Origin','harvester2');
            }
            else {
                if (custom.variables.units.num('builder') < 1 * custom.variables.economy.buildLevel('Origin')) {
                    custom.functions.units.make('Origin','builder');
                }
                else {
                    if (custom.variables.units.num('upgrader') < 1 * custom.variables.economy.upgradeLevel('Origin')) {
                        custom.functions.units.make('Origin','upgrader');
                    }
                    else {
                        if(custom.variables.units.num('mover') < 0) {
                            custom.functions.units.make('Origin','mover');
                        }
                    }
                }
            }
        }
    }
}



module.exports = Overwatch;
