var harvester = require('Units');
var builder = require('Units');
var upgrader = require('Units');

//Variables from the creep roles modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

//Function for listing out all active units of a specific type
var units = require('general');



var Overwatch = require('Overwatch');
var Governor = require ('Behavior');

module.exports.loop = function () {

//Run the memory cleanup module for creeps
units.memCleanup();

/*    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    };
*/

//Call the Overwatch function to spawn new units if needed
Overwatch();

//Call the Governor function which governs the behaviour of all units
Governor();

}
