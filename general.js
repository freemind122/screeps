/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('general');
 * mod.thing == 'a thing'; // true
 */
var harvester = require ('Units')
var builder = require ('Units')
var upgrader = require ('Units')

var harvesterparts = harvester.parts
var builderparts = builder.parts
var upgraderparts = upgrader.parts

var units = {
    list : function (unit) {
        return _.filter(Game.creeps,(creep) => creep.memory.role == unit);
    },
    num : function (unit) {
        return _.filter(Game.creeps,(creep) => creep.memory.role == unit).length;
    },
    make : function (spawn,unit) {
        //console.log('Atttempting to spawn new ' + unit + ' at ' + spawn);
        var newUnit = Game.spawns[spawn].createCreep(/*([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])*/([WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE]), undefined, {role: unit});
        if (newUnit < 0) {
            return 'low energy';
        }
        else {
            console.log('say hello to your new ' + unit + ', ' + newUnit);
            newUnit;
        };
    },
    memCleanup : function () {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            };
        };
    },
};


module.exports = units;
