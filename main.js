// import role logic
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRoomHarvester = require('role.roomHarvester');

const HOME = 'W47S21'; // main room with spawn
const EAST = 'W46S21'; // room to the right of spawn room
const SOUTH = 'W47S22'; // room underneath of spawn room

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
        else if (creep.memory.role === 'roomHarvester') {
            roleRoomHarvester.run(creep);
        }
    }

    // Minumum Creep count values // 8 harvesters, then upgraders if 8 harvesters,
    // 2 Room Harvesters that go east and 1 that goes south.
    let minimumNumberOfHarvesters = 8;
    let minimumNumberOfUpgraders = 1;
    let minimumNumberOfBuilders = 1;
    let minimumNumberOfRoomHarvestersEAST = 2;
    let minimumNumberOfRoomHarvestersSOUTH = 1;
    let numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
    let numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    let numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    let numberOfRoomHarvestersEAST = _.sum(Game.creeps, (c) => c.memory.target === 'W46S21');
    let numberOfRoomHarvestersSOUTH = _.sum(Game.creeps, (c) =>
        c.memory.role === 'roomHarvester' && c.memory.target === SOUTH);
    let sourceState = _.sum(Game.creeps, (c) => c.memory.target === 'W46S21' && c.memory.source === 1);
    let name = undefined;

    console.log("EAST " + numberOfRoomHarvestersEAST);
    console.log("south " + numberOfRoomHarvestersSOUTH);
    if (numberOfHarvesters < minimumNumberOfHarvesters) { // if harvesters less than min harvesters
        // try to spawn a harvester
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'harvester', working: false});
    } else if (numberOfUpgraders < minimumNumberOfUpgraders) { // if upgraders less than min upgraders
        // try to spawn an upgrader
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined,
            { role: 'upgrader', working: false});
    } else if (numberOfBuilders < minimumNumberOfBuilders) { // if builders less than min builders
        // try to spawn a builder
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE, MOVE], undefined,
            { role: 'builder', working: false});
    } else if (numberOfRoomHarvestersEAST < minimumNumberOfRoomHarvestersEAST) { // if not enough EAST roomHarvesters
        // try to spawn a room harvester that goes to the east room
        let sourceNumber = (sourceState === 1) ? 0 : 1; // Alternates the energy source index number between each RoomHarvesterEach creep
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'roomHarvester', working: false, home: HOME, target: EAST, source: sourceNumber});
    } else if (numberOfRoomHarvestersSOUTH < minimumNumberOfRoomHarvestersSOUTH) { // if not enough SOUTH roomHarvesters
        // try to spawn a room harvester that goes to the south room
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'roomHarvester', working: false, home: HOME, target: SOUTH});
    } else {
        // if all above conditions are not met default spawning a builder
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
            { role: 'builder', working: false});
    }

    // console log each new creep
    if (!(name < 0)) {
        console.log("Spawned creep: " + name);
    }
};
