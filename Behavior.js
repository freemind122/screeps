/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Behavior');
 * mod.thing == 'a thing'; // true
 */

var unitInfo = require('Units');

function Governor () {
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        eval("unitInfo." + creep.memory.role + ".role(creep)");
    }
    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES).filter(function (structure) {
            return (
                structure.hits < structure.hitsMax
            )
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
}

module.exports = Governor;
