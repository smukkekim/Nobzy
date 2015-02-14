(function(game) {

  'use strict';

  var Cup = require('./cup.js').YahtzeeCup;

  var cup = {};

  game.init = function() {
    var i;
    cup = new Cup();

    cup.throw();
    displayValues();
  };

  function displayValues() {
    console.log(cup.currentValues());
    console.log(cup.calculateScore());
  }

  game.cup = cup;

}(module.exports));