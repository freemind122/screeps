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

var unitInfo = {
    
     harvester2 : {
        parts : function() {
            var arr = new Array();
            var enCap = Game.spawns['Origin'].room.energyAvailable
            var workParts = Math.floor((enCap / 2.5) / 100);
            var moveParts = Math.floor((enCap / 2.5) / 50);
            var carryParts = Math.floor((enCap / 5) / 50);
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
            };
        },
        role : function(creep) {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_CONTAINER
                            ) && structure.energy < structure.energyCapacity;
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
    },
    
    harvester : {
        parts : function() {
            var arr = new Array();
            var enCap = Game.spawns['Origin'].room.energyAvailable
            var workParts = Math.floor((enCap / 2.5) / 100);
            var moveParts = Math.floor((enCap / 2.5) / 50);
            var carryParts = Math.floor((enCap / 5) / 50);
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
            };
        },
        role : function(creep) {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                };
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_CONTAINER
                            ) && structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    };
                };
            };
        },
        required : 2,
    },
    
    builder : {
        parts : function() {
            var arr = new Array();
            var enCap = Game.spawns['Origin'].room.energyCapacityAvailable;
            var workParts = Math.floor((enCap / 2.5) / 100);
            var moveParts = Math.floor((enCap / 2.5) / 50);
            var carryParts = Math.floor((enCap / 5) / 50);
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
            };
        },
        role : function(creep) {
            //if the creep is in building mode and it is carrying no energy
	        if(creep.memory.building && creep.carry.energy == 0) {
	            //take the creep out of building mode
                creep.memory.building = false;
                creep.say('harvesting');
	        }
	        //if the creep is full of energy then set its building variable to true
	        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	            creep.memory.building = true;
	            creep.say('building');
	        }
            //if the creep is set to build
	        if(creep.memory.building) {
	            //set its target list to construction sites
	            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	            //if there is more than 0 building sites
                if(targets.length > 0) {
                    //and if the target is not in range
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        //then move to the target
                        creep.moveTo(targets[0]);
                    }
                }
                //if there are no building sites
                else {
                    //set the creep's target to structure types that require power
                    var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_STORAGE ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_CONTAINER
                                ) && structure.energy < structure.energyCapacity;
                        }
                    });
                    //if there are more than 0 structures requiring energy
                    if(targets.length > 0) {
                        //and if the closest structure is not in range
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            //move to the target
                            creep.moveTo(targets[0]);
                        }
                    }
                };
	        }
	        //if the creep is not set to build
	        else {
	            //set the creep's target list to sources
	            var targets = creep.room.find(FIND_SOURCES);
	            //if the closest target is not in range
                if(creep.harvest(targets[0]) == ERR_NOT_IN_RANGE) {
                    //move to the target
                    creep.moveTo(targets[0]);
                };
            };
        },
        required : 6,
    },
    
    upgrader : {
        parts : function() {
            var arr = new Array();
            var enCap = Game.spawns['Origin'].room.energyCapacityAvailable;
            var workParts = Math.floor((enCap / 2.5) / 100);
            var moveParts = Math.floor((enCap / 2.5) / 50);
            var carryParts = Math.floor((enCap / 5) / 50);
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
            };
        },
        role : function(creep) {
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('harvesting');
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('upgrading');
            }
            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        },
        required : 3,
    },
    
    mover : {
        parts : function() {
            var arr = new Array();
            var enCap = Game.spawns['Origin'].room.energyCapacityAvailable;
            var workParts = Math.floor((enCap / 2.5) / 100);
            var moveParts = Math.floor((enCap / 2.5) / 50);
            var carryParts = Math.floor((enCap / 5) / 50);
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
            };
        },
        role : function(creep) {
            if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE ||
                                    structure.structureType == STRUCTURE_CONTAINER);
                        }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        },
        required : 1,
    },
    
};





module.exports = unitInfo;

