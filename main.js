// import role logic
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');

module.exports.loop = function () {
  // Delete memory of dead creeps first.
    for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name];
        }
    }

    // Execute logic for each creep role
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }

    // Minumum Creep count values // 10 harvesters, then upgraders if 10 harvesters
    let minimumNumberOfHarvesters = 10;
    let minimumNumberOfUpgraders = 1;
    let minimumNumberOfBuilders = 1;
    let numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
    let numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    let numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

    let name = undefined;

    if (numberOfHarvesters < minimumNumberOfHarvesters) { // if harvesters less than min harvesters
        // try to spawn one
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false});
    } else if (numberOfUpgraders < minimumNumberOfUpgraders) { // if upgraders less than min upgraders
        // try to spawn one
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    } else if (numberOfBuilders < minimumNumberOfBuilders) { // if builders less than min builders
        // try to spawn one
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'builder', working: false});
    } else {
        // else try to spawn a builder
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'builder', working: false});
    }

    // console log each new creep
    if (!(name < 0)) {
        console.log("Spawned creep: " + name);
    }
};
