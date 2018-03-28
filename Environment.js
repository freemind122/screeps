/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('general');
 * mod.thing == 'a thing'; // true
 */

var env = {
    isBlocked : function(source) {
        var emptySpaces = 0,
            area = source.room.lookForAtArea(LOOK_TERRAIN, source.pos.y-1,source.pos.x-1,source.pos.y+1,source.pos.x+1, true).filter(function (sources) {
            return (
                sources.type === 'terrain'
            ) && (
                sources.terrain === 'plain' ||
                sources.terrain === 'swamp'
            )
        });
        for (var i = 0; i < area.length; i++) {
            var tile = source.room.lookForAt(LOOK_CREEPS,area[i].x,area[i].y);
            if (tile[0] === undefined) {
                emptySpaces++;
            }
        }
        return (emptySpaces === 0);
    }
};




module.exports = env;