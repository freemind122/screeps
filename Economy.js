/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('general');
 * mod.thing == 'a thing'; // true
 */

var eco = {
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
};

module.exports = eco;