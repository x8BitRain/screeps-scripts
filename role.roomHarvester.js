// last change:
// harvester logic
module.exports = {
  run: function(creep) {
    let source = 0; // initial variable for each east screep's energy source target.
    //console.log("sourceNumber = " + creep.memory.source);
    //console.log("source = " + source);
    // if empty set working to false
    if (creep.memory.working === true && creep.carry.energy === 0) {
        creep.memory.working = false;
      // if at full capacity, set working to true
    } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
    }
    // if full capacity, go back to spawn and transfer energy.
    if (creep.memory.working === true) {
      if (creep.room.name === creep.memory.home) {
      //define a structure (extension) by whether it contains energy or not
      let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => s.energy < s.energyCapacity
      });
        // if structures (extension) exists move to and transfer energy.
        if (structure != undefined) {
          if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structure, {visualizePathStyle: {stroke: '#FFFFFF'}});
          }
        }
      } else {  // when outside the home spawn room, find the exit towards home and leave.
        let exit = creep.room.findExitTo(creep.memory.home);
        creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#FFFFFF'}});
      }
    } else { // if creep is in target room
      if (creep.room.name === creep.memory.target) {
        if (creep.memory.target === 'W46S21') {                           // if creep is in room to the east,
            source = creep.room.find(FIND_SOURCES)[creep.memory.source];  // set target energy source based on
          } else if (creep.memory.target === 'W47S22') {                  // creep.memory.source which is set in main.js.
            source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);    // If in south room, just fine nearest source.
          }
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, {visualizePathStyle: {stroke: '#FFFFFF'}}); // move to target energy source and harvest
        }
      } else { // find exit and go home at end of sequence.
        let exit = creep.room.findExitTo(creep.memory.target);
        creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#FFFFFF'}});
      }
    }
  }
};
