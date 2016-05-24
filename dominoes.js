(function() {
  var Bone = require('./lib/bone');

  var score = function(start) {
    var scores = [];

    start.traverse(function(bone) {
      scores.push(bone.score());
    });

    var sum = function(acc, score) { return score + acc; };

    return scores.reduce(sum, 0);

  };

  var sixSix   = new Bone(6, 6);
  var sixThree = sixSix.link(new Bone(6, 3));
  var sixTwo   = sixSix.link(new Bone(6, 2));

  var sixFive = sixSix.link(new Bone(5, 6));
 
  var zeroZero =  sixThree.link(new Bone(1, 3))
                          .link(new Bone(1, 0))
                          .link(new Bone(0, 0));

  var zeroFive = zeroZero.link(new Bone(0, 5));
  var fiveFour = sixFive.link(new Bone(5, 4));
  var zeroFour = zeroZero.link(new Bone(0, 4));
  var zeroSix = sixSix.link(new Bone(0, 6));

  console.log(score(sixSix));
}());
