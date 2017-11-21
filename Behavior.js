/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Behavior');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
 
var harvester = require('Units');
var builder = require('Units');
var upgrader = require('Units');

var unitInfo = require('Units');

function Governor () {

    
    
//    for(var i = 0, len = Game.creeps.length; i < len; i++) {
//        var creep = Game.creeps[i];
//        eval("unitInfo." + creep.memory.role + ".role(creep)");
//    };
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        eval("unitInfo." + creep.memory.role + ".role(creep)");
    };
    
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
    
};

module.exports = Governor;
