(function(die) {

  'use strict';

  var Die = function(numSides) {
    this.sides = isNaN(numSides) ? 6 : numSides;
    this.roll();
    this.locked = false;
  };

  Die.prototype.roll = function() {
    if (!this.locked) {
      this.value = 1 + Math.floor(Math.random() * this.sides);
    }
  };

  Die.prototype.lock = function() {
    this.toggleLock(true);
  };

  Die.prototype.unlock = function() {
    this.toggleLock(false);
  };

  Die.prototype.toggleLock = function(state) {
    this.locked = typeof state === 'boolean' ? state : !this.locked;
  };

  die.Die = Die;

}(module.exports));