/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('general');
 * mod.thing == 'a thing'; // true
 */
var unitInfo = require('Units');

var custom = {

    variables : {
        economy: {
            harvestLevel : function (spawn) {
                return Game.spawns[spawn].room.find(FIND_SOURCES).length;
            },
            buildLevel : function (spawn) {
                return Math.ceil(Game.spawns[spawn].room.find(FIND_MY_CONSTRUCTION_SITES).length / 4);
            },
            upgradeLevel : function (spawn) {
                return Game.spawns[spawn].room.controller.level;
            },
            unitBuildEnergy : function (spawn) {
                return Game.spawns[spawn].room.energyCapacityAvailable;
            }
        },
        units : {
            list : function (unit) {
                return _.filter(Game.creeps,(creep) => creep.memory.role === unit);
            },
            num : function (unit) {
                return list(unit).length;
            }
        },
        environment : {
            isSpawnBlocked : function(source) {
                var emptySpaces = 0;
                var area = source.room.lookForAtArea(LOOK_TERRAIN, source.pos.y-1,source.pos.x-1,source.pos.y+1,source.pos.x+1, true).filter(function (sources) {
                    return (
                        sources.type === 'terrain'
                    ) && (
                        sources.terrain === 'plain' ||
                        sources.terrain === 'swamp'
                    )
                });
                for (i = 0; i < area.length; i++) {
                    var tile = source.room.lookForAt(LOOK_CREEPS,area[i].x,area[i].y);
                    if (tile[0] === undefined) {
                        emptySpaces++;
                        console.log('Empty space - x:' + area[0].x + ' y:' + area[0].y);
                    }
                }
                return (emptySpaces === 0);
            }
        }
    },

    functions : {
        economy : {

        },
        units : {
            make : function (spawn,unit) {
                console.log('Atttempting to spawn new ' + unit + ' at ' + spawn);
                var newUnit = Game.spawns[spawn].createCreep(eval('unitInfo.' + unit + '.parts()'), undefined, {role: unit});
                if (newUnit < 0) {
                    return 'low energy';
                }
                else {
                    console.log('say hello to your new ' + unit + ', ' + newUnit);
                    newUnit;
                }
            }
        },
        system : {
            memCleanup : function () {
                for(var name in Memory.creeps) {
                    if(!Game.creeps[name]) {
                        delete Memory.creeps[name];
                        console.log('Clearing non-existing creep memory:', name);
                    }
                }
            }
        }
    }

};


module.exports = custom;
