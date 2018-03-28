
//Import all required modules for functions
var sys = require('System'),
    Overwatch = require('Overwatch');

module.exports.loop = function () {

//Run the memory cleanup module for creeps
sys.memCleanup();

//Call the Overwatch function to spawn new units if needed
Overwatch.units();

//Call the behaviour function which governs the behaviour of all units
Overwatch.behaviour();

//import report from "consoleCommands";
//console.log(custom.variables.economy.harvestLevel('Origin') + ' - Harvest level at Origin');
//console.log(custom.variables.economy.unitBuildEnergy('Origin') + ' - Unit build energy at Origin');

try {
    console.log(Game.spawns['Origin'].room.energyAvailable)
} catch (e) {
    console.log("Didn't work.");
    console.log("Error details:");
    console.log(e.message)
}

};
