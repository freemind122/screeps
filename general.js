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
                return _.filter(Game.creeps,(creep) => creep.memory.role == unit).length;
            }
        },
        environment : {
            isSpawnBlocked : function(source) {
                var terrain = source.room.lookAtArea(source.pos.y-1,source.pos.x-1,source.pos.y+1,source.pos.x+1, true);
                var plains = [];
                for (i = 0; i < terrain.length; i++) {
                    if (terrain[i].type === 'terrain' && terrain[i].terrain === 'plain') {

                        var thispos = new RoomPosition(terrain[i].x, terrain[i].y, source.room.name);
                        console.log(Game.room.lookAt(thispos));
                        plains.push(thispos);
                        //console.log('clear space at - x:' + terrain[i].x + ' y:' + terrain[i].y);
                    }
                }
                for (i = 0; i < plains.length; i++) {
                    //var thePlace = source.room.lookAt(plains[i]);
                    //console.log(thePlace.type);
                }
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
