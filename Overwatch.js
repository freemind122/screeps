/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Overwatch');
 * mod.thing == 'a thing'; // true
 */
var custom = require ('general');

var unitInfo = require ('Units');

var Overwatch = {
    units : function() {
        if (custom.variables.units.num('harvester') < 1 * custom.variables.economy.harvestLevel('Origin')) {
            unitInfo.harvester.make('Origin');
        } else if (custom.variables.units.num('harvester2') < 1 * custom.variables.economy.harvestLevel('Origin')) {
            unitInfo.harvester2.make('Origin');
        } else if (custom.variables.units.num('builder') < 1 * custom.variables.economy.buildLevel('Origin')) {
            unitInfo.builder.make('Origin');
        } else if (custom.variables.units.num('upgrader') < 1 * custom.variables.economy.upgradeLevel('Origin')) {
            unitInfo.upgrader.make('Origin');
        } else if(custom.variables.units.num('mover') < 0) {
            unitInfo.mover.make('Origin');
        }
    }
};



module.exports = Overwatch;
