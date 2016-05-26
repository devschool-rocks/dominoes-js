module.exports = (function() {
  var head;

  var hasPiece = function(piece) {
    var found = false;
    if (head === undefined) { return false; }
    head.traverse(function(bone) {
      if (piece.matches(bone)) { found = true; }
    });
    return found;
  };

  var linkableBones = function() {
    if(head === undefined) { return []; }
    var bones = [];
    head.traverse(function(bone) {
      bones.push(bone);
    });

    return bones;
  };

  var place = function(newBone, oldBone) {
    if (head === undefined) {
      head = newBone;
    } else {
      oldBone.link(newBone);
    }

    return score();
  };

  var score = function() {
    var scores = [];

    console.log(head);
    head.traverse(function(bone) {
      scores.push(bone.score());
    });

    var sumFn = function(acc, score) { return score + acc; };
    var sum   = scores.reduce(sumFn, 0);

    var isScorable = function() {
      return sum % 5 === 0;
    };

    if (isScorable()) {
      return sum;
    }

    return 0;
  };

  return {
    head: head,
    place: place,
    score: score,
    hasPiece: hasPiece,
    linkableBones: linkableBones
  };
}());
