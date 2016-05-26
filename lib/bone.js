module.exports = (function() {
  var R = require('ramda');

  var Bone = function(a, b) {
    this.a = R.min(a, b);
    this.b = R.max(a, b);
    this.parent   = undefined;
    this.children = [];

    return this;
  };

  Bone.prototype.toString = function() {
    return ['[', this.a, '|', this.b + ']'].join('');
  };

  Bone.prototype.matches = function(bone) {
    return this.a == bone.a && this.b == bone.b;
  };

  Bone.prototype.link = function(bone) {

    this.children.push(bone);
    bone.parent = this;

    return bone;
  };

  Bone.prototype.isSpinner = function() {
    return this.a === this.b;
  };

  Bone.prototype.isNormal = function() {
    return !this.isSpinner();
  };

  Bone.prototype.isValidSpinner = function() {
    return this.children.length < 2;
  };

  Bone.prototype.isValidNormal = function() {
    return this.children.length < 1;
  };

  Bone.prototype.isScorableSpinner = function() {
    return (this.isSpinner() && this.isValidSpinner());
  };

  Bone.prototype.isScorableNormal = function() {
    return (this.isNormal() && this.isValidNormal());
  };

  Bone.prototype.score = function() {
    if (this.isScorableSpinner()) {
      return (this.a + this.b);
    }
    if (this.isScorableNormal()) {
      return (this.parent && this.parent.a == this.a ? this.b : this.a);
    }
    return 0;
  };

  Bone.prototype.traverse = function(fnWePassedIn) {
    (function walk(currentBone) {
      for (var i = 0, length = currentBone.children.length; i < length; i++) {
        walk(currentBone.children[i]);
      }

      fnWePassedIn(currentBone);
    }(this));
  };

  return Bone;

}());
