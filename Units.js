/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Units');
 * mod.thing == 'a thing'; // true
 */

//Function to return a list of operational units of a certain type when the unit type is passed into it as a string
//Must be called on in the following format: run: List([Unit Type]);


var harvester = {
    parts : [WORK,CARRY,MOVE],
    role : function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    },
    required : 2,
};

var builder = {
    parts : 'WORK,CARRY,MOVE',
    role : 'builder',
    required : 6,
};

var upgrader = {
    parts : 'WORK,CARRY,MOVE',
    role : 'upgrader',
    required : 3,
};




module.exports = harvester;
module.exports = builder;
module.exports = upgrader;
