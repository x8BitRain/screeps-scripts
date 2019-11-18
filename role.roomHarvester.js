// last change:
// harvester logic
module.exports = {
  run: function(creep) {
    let sourceNum =  _.sum(Game.creeps, (c) => c.memory.role == 'roomHarvester' && c.memory.target == 'W46S21');
    console.log(creep.memory.source);
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false;
    } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }
    if (creep.memory.working == true) {
      if (creep.room.name == creep.memory.home) {
   let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => s.energy < s.energyCapacity
      });

        if (structure != undefined) {
          if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure, {visualizePathStyle: {stroke: '#FFFFFF'}});
          }
        }
      } else {
        var exit = creep.room.findExitTo(creep.memory.home);
        creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#FFFFFF'}});
      }
    } else {
      if (creep.room.name == creep.memory.target) {
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source, {visualizePathStyle: {stroke: '#FFFFFF'}});
        }
      } else {
        var exit = creep.room.findExitTo(creep.memory.target);

        creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#FFFFFF'}});
      }
    }
  }
};
