module.exports = (function() {

  var R = require('ramda');
  var shuffle = require('knuth-shuffle').knuthShuffle;

  var flatmap = require('./flatmap');
  var Bone = require('./bone');

  var digits = [0, 1, 2, 3, 4, 5, 6];

  var build = function() {
    var dups =  flatmap(digits, function(a) {
      return digits.map(function(b) {
        return new Bone(a, b);
      });
    });

    return R.uniq(dups);
  };

  return {
    bones: shuffle(build())
  };
}());
