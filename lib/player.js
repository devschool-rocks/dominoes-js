var _Player = function(name) {
  this.name = name;
  this.scores = [];
  this.bones = [];

  this.hasPiece = function(piece) {
    return this.bones.filter(function(bone) {
      return bone.matches(piece);
    }).length > 0;
  };

  return this;
};

module.exports = function(name) {
  return new _Player(name);
};

