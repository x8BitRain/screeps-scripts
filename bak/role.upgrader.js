// upgrader logic
module.exports = {
  run: function(creep) {
    // If creep is transferring energy but is empty, set work state to false.
    if (creep.memory.working === true && creep.carry.energy === 0) {
        creep.memory.working = false;
    }
    // Set creep state to working if carrying full capacity.
    else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
    }
    // Move creep closer to controller to upgrade.
    if (creep.memory.working === true) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    // once above is satisfied, find nearest energy source and repeat harvesting
    else {
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#53FF00'}});
       }
    }
  }
};

