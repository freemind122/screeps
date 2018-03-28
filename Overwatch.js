/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Overwatch');
 * mod.thing == 'a thing'; // true
 */
var eco = require ('Economy'),
    unitInfo = require ('Units'),
    Overwatch = {
    units : function() {
        if (unitInfo.harvester.count() < 1 * eco.harvestLevel('Origin')) {
            unitInfo.harvester.make('Origin');
        } else if (unitInfo.harvester2.count() < 1 * eco.harvestLevel('Origin')) {
            unitInfo.harvester2.make('Origin');
        } else if (unitInfo.builder.count() < 1 * eco.buildLevel('Origin')) {
            unitInfo.builder.make('Origin');
        } else if (unitInfo.upgrader.count() < 1 * eco.upgradeLevel('Origin')) {
            unitInfo.upgrader.make('Origin');
        } else if(unitInfo.mover.count() < 0) {
            unitInfo.mover.make('Origin');
        }
    },
    behaviour : function() {
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
};



module.exports = Overwatch;
