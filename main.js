
var unitInfo = require('Units');

//Variables from the creep roles modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

//Function for listing out all active units of a specific type
var custom = require('general');


var Overwatch = require('Overwatch');
var Governor = require ('Behavior');

module.exports.loop = function () {

//Run the memory cleanup module for creeps
custom.functions.system.memCleanup();

//Call the Overwatch function to spawn new units if needed
Overwatch.units();

//Call the Governor function which governs the behaviour of all units
Governor();

//import report from "consoleCommands";
//console.log(custom.variables.economy.harvestLevel('Origin') + ' - Harvest level at Origin');
//console.log(custom.variables.economy.unitBuildEnergy('Origin') + ' - Unit build energy at Origin');


try {
    //hiyo peeps testing woo
    custom.variables.environment.isSpawnBlocked(Game.spawns['Origin'].room.find(FIND_SOURCES)[0])
    console.log(Game.spawns['Origin'].room.energyAvailable);
} catch (e) {
    console.log("Didn't work.");
    console.log("Error details:");
    console.log(e.message)
}

};
