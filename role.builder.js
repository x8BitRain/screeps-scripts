//builder logic
// import upgrader role logic.
let roleUpgrader = require('role.upgrader');

module.exports = {
  run: function(creep) {
    // if empty set working to false.
    if (creep.memory.working === true && creep.carry.energy === 0) {
        creep.memory.working = false;
    // if at full capacity, set working to true.
    } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
    }
    if (creep.memory.working === true) {
        // find nearest construction sites.
        let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        // if valid constuction site, move to it + start building.
        if (constructionSite != undefined) {
            if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#2BFF00'}}); //builders otw to build are green
            }
          // if there are no constuction sites, dont be lazy, go upgrade the controller
        } else {
            roleUpgrader.run(creep);
        }
    } else {
        // find nearest energy source to harvest if above not met.s
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
  }
};
//builder logic
// import upgrader role logic.
let roleUpgrader = require('role.upgrader');

module.exports = {
  run: function(creep) {
    // if empty set working to false.
    if (creep.memory.working === true && creep.carry.energy === 0) {
        creep.memory.working = false;
    // if at full capacity, set working to true.
    } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
    }
    if (creep.memory.working === true) {
        // find nearest construction sites.
        let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        // if valid constuction site, move to it + start building.
        if (constructionSite != undefined) {
            if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#2BFF00'}}); //builders otw to build are green
            }
          // if there are no constuction sites, dont be lazy, go upgrade the controller
        } else {
            roleUpgrader.run(creep);
        }
    } else {
        // find nearest energy source to harvest if above not met.s
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
  }
};
