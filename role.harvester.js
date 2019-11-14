// harvester logic
module.exports = {
  run: function(creep) {
    // if empty set working to false
    if (creep.memory.working === true && creep.carry.energy == 0) {
        creep.memory.working = false;
    // if at full capacity, set working to true
    } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
    }
    // if full capacity, go back to spawn and transfer energy.
    if (creep.memory.working === true) {
        if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Spawn1, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    } else {
        // else find nearest source to continue harvesting.
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#FF0000'}});
      }
    }
  }
};
