module.exports = (function() {
  var Bag   = require('./bag');
  var Bone  = require('./bone');
  var Board = require('./board');
  var Player = require('./player');

  var R = require('ramda');
  var async = require('async');

  var board = Board;
  var players = [];
  var yard = Bag.bones;

  var ask = function(question, format, cb) {
    var stdin = process.stdin, stdout = process.stdout;

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function(data) {
      data = data.toString().trim();

      if (!format.test(data)) {
        stdout.write("It should match: "+ format +"\n");
        ask(question, format, cb);
      }
    });
  };

  var askLink = function(player, cb) {
    // show the possible moves
    board.linkableBones().forEach(function(bone) {
      console.log(bone.toString());
    });

    ask("What piece do you want to play off of?", /.*/, function(parentId) {
      askPiece(player, cb);
    });
  };

  var askPiece = function(player, cb) {
    player.bones.forEach(function(bone, index) {
      console.log(index+1 + ": " + bone.toString());
    });

    ask("What piece do you want to place?", /\d/, function(index) {
      var selectedBone = player.bones.slice(index-1, 1)[0];
      var score = board.place(selectedBone);
      console.log('score: ' + score);

      if (player.hasPiece(selectedBone)) {
        if (board.linkableBones.length > 1) {
          console.log("You chose to play " + selectedBone.toString() + " off of " + parent.toString() + ".");
        } else {
          console.log("You chose to play " + selectedBone.toString());
        }
        player.bones.splice(index-1, 1);
      } else {
        if (!board.hasPiece(selectedBone)) {
          console.log("The " + parent.toString() + " piece is not on the board.");
        }
        if (!player.hasPiece(selectedBone)) {
          console.log("You don't have a " + selectedBone.toString() + " piece to play.");
        }
      }
    });
  };

  var playTurn = function(player, cb) {
    if (board.head === undefined) {
      askPiece(player, cb);
    } else {
      askLink(player, cb);
    }

  };

  var addPlayer = function(name) {
    players.push(Player(name));
  };

  var dealHand = function(player) {
    R.times(function() {
      player.bones.push(yard.pop());
    }, 5);
  };

  var start = function() {
    players.forEach(function(player) {
      dealHand(player);
    });

    async.eachSeries(players, function(player, cb) {
      console.log(player.name + " it's your turn");
      playTurn(player, cb);
    }, function(err) {
      console.log(err);
    });
  };

  return {
    start: start,
    addPlayer: addPlayer,
    board: board,
    yard: yard,
    players: players,
    playTurn: playTurn
  };
}());
