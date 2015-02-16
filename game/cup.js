(function (cup) {

  'use strict';

  var Die = require('./die.js').Die;

  var Cup = function() {
    var i;
    this.dice = [];
    for (i = 0; i < 5; i++) {
      this.dice.push(new Die(6));
    }
    this.score = {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
      sixes: 0,
      pair: 0,
      twoPair: 0,
      threeOfAKind: 0,
      fourOfAKind: 0,
      smallStraight: 0,
      largeStraight: 0,
      fullHouse: 0,
      chance: 0,
      yahtzee: 0
    };
  };

  Cup.prototype.currentValues = function() {
    var values = [];
    for (var i = 0; i < 5; i++) {
      values.push(this.dice[i].value);
    }
    return values;
  };

  Cup.prototype.throw = function() {
    for (var i = 0; i < this.dice.length; i++) {
      if (!this.dice[i].locked) {
        this.dice[i].roll();
      }
    }
  };

  Cup.prototype.setValues = function(values) {
    if (!Array.isArray(values)) {
      values = [values,values,values,values,values];
    }
    for (var i = 0; i < 5; i++) {
      if (typeof values[i] !== 'undefined' && !isNaN(values[i]) && values[i] <= 6 && values[i] >= 1) {
        this.dice[i].value = values[i];
      }
    }
  };

  Cup.prototype.calculateScore = function() {
    var valueCount = new Array(7).join(1).split('').map(function() { return 0; }),
        i,
        pairIndex,
        maxOfAKind = 0,
        maxOfAKindValue = 0;
    for (i = 0; i < 5; i++) {
      var value = this.dice[i].value,
          index = value - 1;
      valueCount[index] += 1;
      if (valueCount[index] > maxOfAKind || (value > maxOfAKindValue && valueCount[index] === maxOfAKind)) {
        maxOfAKind = valueCount[index];
        maxOfAKindValue = index + 1;
      }
    }
    this.score.ones = valueCount[0];
    this.score.twos = valueCount[1] * 2;
    this.score.threes = valueCount[2] * 3;
    this.score.fours = valueCount[3] * 4;
    this.score.fives = valueCount[4] * 5;
    this.score.sixes = valueCount[5] * 6;
    for (i = 0; i < 6; i++) {
      this.score.chance += (i + 1) * valueCount[i];
    }
    this.score.yahtzee = maxOfAKind === 5 ? maxOfAKindValue === 1 ? 100 : 5 * maxOfAKindValue : 0;
    this.score.fourOfAKind = maxOfAKind >= 4 ? 4 * maxOfAKindValue : 0;
    this.score.threeOfAKind = maxOfAKind >= 3 ? 3 * maxOfAKindValue : 0;
    this.score.smallStraight = maxOfAKind === 1 && valueCount[5] === 0 ? 15 : 0;
    this.score.largeStraight = maxOfAKind === 1 && valueCount[0] === 0 ? 20 : 0;
    if (maxOfAKind === 3) {
      pairIndex = valueCount.indexOf(2);
      if (pairIndex > -1) {
        this.score.fullHouse = this.score.threeOfAKind + (2 * (pairIndex + 1));
      }
    }
    if (maxOfAKind >= 2) {
      if (maxOfAKind > 3) {
        this.score.pair = 2 * maxOfAKindValue;
      } else {
        pairIndex = maxOfAKind === 3 ? valueCount.indexOf(3) : valueCount.indexOf(2);
        this.score.pair = pairIndex + 1;
        pairIndex = valueCount.indexOf(2, maxOfAKind === 3 ? 0 : pairIndex + 1);
        if (pairIndex > -1) {
          this.score.twoPair = (this.score.pair * 2) + ((pairIndex + 1) * 2);
          this.score.pair = Math.max(this.score.pair, pairIndex + 1) * 2;
        }
      }
    }

    return this.score;
  };

  cup.YahtzeeCup = Cup;

}(module.exports));