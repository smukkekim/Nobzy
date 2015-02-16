(function(game) {

  'use strict';

  var Cup = require('./cup.js').YahtzeeCup;

  var cup = {};

  game.init = function() {
    cup = new Cup();

    cup.throw();

    //cup.setValues([2,3,3,4,6]);

    displayValues();
  };

  function displayValues() {
    console.log(cup.currentValues());
    console.log(cup.calculateScore());
  }

  game.cup = cup;

}(module.exports));