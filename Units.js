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

var env = require('Environment'),
    unitInfo = {

    harvester2 : {
        list : function () {
            return _.filter(Game.creeps).filter(function (creep) {
                return (
                    creep.memory.role === 'harvester2'
                )
            })
        },
        count : function () {
            return this.list().length;
        },
        parts : function() {
            var arr = [],
                enCap = Game.spawns['Origin'].room.energyAvailable,
                workParts = Math.floor((enCap / 2.5) / 100),
                moveParts = Math.floor((enCap / 2.5) / 50),
                carryParts = Math.floor((enCap / 5) / 50);
            while (workParts > 0) {
                arr.push(WORK);
                workParts--;
            }
            while (carryParts > 0) {
                arr.push(CARRY);
                carryParts--;
            }
            while (moveParts > 0) {
                arr.push(MOVE);
                moveParts--;
            }
            if (arr.length >= 3) {
                return arr;
            }
        },
        make : function (spawn) {
            console.log('Attempting to spawn new harvester2 at ' + spawn);
            var newUnit = Game.spawns[spawn].createCreep(this.parts(), undefined, {role: 'harvester2'});
            if (newUnit < 0) {
                return 'low energy';
            }
            else {
                console.log('say hello to your new harvester2, ' + newUnit);
                newUnit;
            }
        },
        role : function(creep) {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) === ERR_NOT_IN_RANGE && !env.isBlocked(sources[1])) {
                    creep.moveTo(sources[1]);
                } else {
                    creep.moveTo(Game.flags.Rally)
                }
            } else {
                var targets = creep.room.find(FIND_STRUCTURES).filter(function(structure) {
                    return (
                        structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER ||
                        structure.structureType === STRUCTURE_CONTAINER
                    ) && structure.energy < structure.energyCapacity
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    creep.moveTo(Game.flags.Rally)
                }
            }
        },
        required : 2
    },

    harvester : {
        list : function () {
            return _.filter(Game.creeps).filter(function (creep) {
                return (
                    creep.memory.role === 'harvester'
                )
            })
        },
        count : function () {
            return this.list().length;
        },
        parts : function() {
            var arr = [],
                enCap = Game.spawns['Origin'].room.energyAvailable,
                workParts = Math.floor((enCap / 2.5) / 100),
                moveParts = Math.floor((enCap / 2.5) / 50),
                carryParts = Math.floor((enCap / 5) / 50);
            while (workParts > 0) {
                arr.push(WORK);
                workParts--;
            }
            while (carryParts > 0) {
                arr.push(CARRY);
                carryParts--;
            }
            while (moveParts > 0) {
                arr.push(MOVE);
                moveParts--;
            }
            if (arr.length >= 3) {
                return arr;
            }
        },
        make : function (spawn) {
            console.log('Attempting to spawn new harvester at ' + spawn);
            var newUnit = Game.spawns[spawn].createCreep(this.parts(), undefined, {role: 'harvester'});
            if (newUnit < 0) {
                return 'low energy';
            }
            else {
                console.log('say hello to your new harvester, ' + newUnit);
                newUnit;
            }
        },
        role : function(creep) {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE && !env.isBlocked(sources[0])) {
                    creep.moveTo(sources[0]);
                } else {
                    creep.moveTo(Game.flags.Rally)
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES).filter(function(structure) {
                    return (
                        structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER ||
                        structure.structureType === STRUCTURE_CONTAINER
                    ) && structure.energy < structure.energyCapacity;
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    creep.moveTo(Game.flags.Rally)
                }
            }
        },
        required : 2
    },

    builder : {
        list : function () {
            return _.filter(Game.creeps).filter(function (creep) {
                return (
                    creep.memory.role === 'builder'
                )
            })
        },
        count : function () {
            return this.list().length;
        },
        parts : function() {
            var arr = [],
                enCap = Game.spawns['Origin'].room.energyAvailable,
                workParts = Math.floor((enCap / 2.5) / 100),
                moveParts = Math.floor((enCap / 2.5) / 50),
                carryParts = Math.floor((enCap / 5) / 50);
            while (workParts > 0) {
                arr.push(WORK);
                workParts--;
            }
            while (carryParts > 0) {
                arr.push(CARRY);
                carryParts--;
            }
            while (moveParts > 0) {
                arr.push(MOVE);
                moveParts--;
            }
            if (arr.length >= 3) {
                return arr;
            }
        },
        make : function (spawn) {
            console.log('Attempting to spawn new builder at ' + spawn);
            var newUnit = Game.spawns[spawn].createCreep(this.parts(), undefined, {role: 'builder'});
            if (newUnit < 0) {
                return 'low energy';
            }
            else {
                console.log('say hello to your new builder, ' + newUnit);
                newUnit;
            }
        },
        role : function(creep) {
            //if the creep is in building mode and it is carrying no energy
            if(creep.memory.building && creep.carry.energy === 0) {
                //take the creep out of building mode
                creep.memory.building = false;
                creep.say('harvesting');
            }
            //if the creep is full of energy then set its building variable to true
            if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('building');
            }
            //if the creep is set to build
            if(creep.memory.building) {
                //set its target list to construction sites
                targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                //if there is more than 0 building sites
                if(targets.length > 0) {
                    //and if the target is not in range
                    if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                        //then move to the target
                        creep.moveTo(targets[0]);
                    }
                }
                //if there are no building sites
                else {
                    //set the creep's target to structure types that require power
                    targets = creep.room.find(FIND_STRUCTURES).filter(function(structure) {
                        return (
                            structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_STORAGE ||
                            structure.structureType === STRUCTURE_TOWER ||
                            structure.structureType === STRUCTURE_CONTAINER
                        ) && structure.energy < structure.energyCapacity;
                    });
                    //if there are more than 0 structures requiring energy
                    if(targets.length > 0) {
                        //and if the closest structure is not in range
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            //move to the target
                            creep.moveTo(targets[0]);
                        }
                    } else {
                        creep.moveTo(Game.flags.Rally)
                    }
                }
            }
            //if the creep is not set to build
            else {
                //set the creep's target list to sources
                var targets = creep.room.find(FIND_SOURCES);
                //if the closest target is not in range
                if(creep.harvest(targets[0]) === ERR_NOT_IN_RANGE && !env.isBlocked(targets[0])) {
                    //move to the target
                    creep.moveTo(targets[0]);
                }else {
                    creep.moveTo(Game.flags.Rally)
                }
            }
        },
        required : 6
    },

    upgrader : {
        list : function () {
            return _.filter(Game.creeps).filter(function (creep) {
                return (
                    creep.memory.role === 'upgrader'
                )
            })
        },
        count : function () {
            return this.list().length;
        },
        parts : function() {
            var arr = [],
                enCap = Game.spawns['Origin'].room.energyAvailable,
                workParts = Math.floor((enCap / 2.5) / 100),
                moveParts = Math.floor((enCap / 2.5) / 50),
                carryParts = Math.floor((enCap / 5) / 50);
            while (workParts > 0) {
                arr.push(WORK);
                workParts--;
            }
            while (carryParts > 0) {
                arr.push(CARRY);
                carryParts--;
            }
            while (moveParts > 0) {
                arr.push(MOVE);
                moveParts--;
            }
            if (arr.length >= 3) {
                return arr;
            }
        },
        make : function (spawn) {
            console.log('Attempting to spawn new upgrader at ' + spawn);
            var newUnit = Game.spawns[spawn].createCreep(this.parts(), undefined, {role: 'upgrader'});
            if (newUnit < 0) {
                return 'low energy';
            }
            else {
                console.log('say hello to your new upgrader, ' + newUnit);
                newUnit;
            }
        },
        role : function(creep) {
            if(creep.memory.upgrading && creep.carry.energy === 0) {
                creep.memory.upgrading = false;
                creep.say('harvesting');
            }
            if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('upgrading');
            }
            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        },
        required : 3
    },

    mover : {
        list : function () {
            return _.filter(Game.creeps).filter(function (creep) {
                return (
                    creep.memory.role === 'mover'
                )
            })
        },
        count : function () {
            return this.list().length;
        },
        parts : function() {
            var arr = [],
                enCap = Game.spawns['Origin'].room.energyAvailable,
                workParts = Math.floor((enCap / 2.5) / 100),
                moveParts = Math.floor((enCap / 2.5) / 50),
                carryParts = Math.floor((enCap / 5) / 50);
            while (workParts > 0) {
                arr.push(WORK);
                workParts--;
            }
            while (carryParts > 0) {
                arr.push(CARRY);
                carryParts--;
            }
            while (moveParts > 0) {
                arr.push(MOVE);
                moveParts--;
            }
            if (arr.length >= 3) {
                return arr;
            }
        },
        make : function (spawn) {
            console.log('Attempting to spawn new mover at ' + spawn);
            var newUnit = Game.spawns[spawn].createCreep(this.parts(), undefined, {role: 'mover'});
            if (newUnit < 0) {
                return 'low energy';
            }
            else {
                console.log('say hello to your new mover, ' + newUnit);
                newUnit;
            }
        },
        role : function(creep) {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) === ERR_NOT_IN_RANGE && !env.isBlocked(sources[1])) {
                    creep.moveTo(sources[1]);
                } else {
                    creep.moveTo(Game.flags.Rally)
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES).filter(function(structure) {
                    return (
                        structure.structureType === STRUCTURE_STORAGE ||
                        structure.structureType === STRUCTURE_CONTAINER);
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    creep.moveTo(Game.flags.Rally)
                }
            }
        },
        required : 1
    },

    tower : {
        list : function () {
            return _.filter(Game.structures).filter(function (structure) {
                return (
                    structure.structureType === STRUCTURE_TOWER
                )
            })
        },
        count : function () {
            return this.list().length;
        },
        role : function(tower) {
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





module.exports = unitInfo;

