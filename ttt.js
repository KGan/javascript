var readline = require('readline');

var reader = readline.createInterface(process.stdin, process.stdout);

function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}


function TTT(player1, player2) {
  this.players = [player1, player2];
}

TTT.WIN_CONDITIONS = [
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [6,4,2]
]

TTT.prototype = {

  isOver: function() {
    for (var i = 0; i < 8; i++) {
      var player = this.grid[TTT.WIN_CONDITIONS[i][0]];
      var count = 0;
      if (!!player) {
        count++;
      }
      for (var j = 1; j < 3; j++) {
        if (this.grid[TTT.WIN_CONDITIONS[i][j]] == player) {
          count++;
        }
      }
      if (count == 3) {
        return true;
      }
    }
    return false;
  },

  valid_move: function(move) {
      if (move < 9 && move > -1 && !this.grid[move]) {
      return true;
    }
    return false;
  },

  place_mark: function(move) {
    if (this.valid_move(move)) {
      this.grid[move] = this.players[this.turn_counter % 2]
      return true
    } else {
      console.log('invalid move:' + move)
      return false
    }
  },

  promptMove: function(callback) {
    this.display();
    reader.question('Give me a position(0 - 8)', function(input){
      callback( input.slice(0,1) )
    });
  },

  reset: function(){
    this.grid = new Array(9)
    this.turn_counter = 0
  },
  run: function(completionCallback) {
    this.promptMove(function(move){
      if(this.place_mark(move)) {
        if(this.isOver()) {
          this.display();
          console.log(this.players[(this.turn_counter + 1) % 2].name + ' loses!');
          completionCallback();
        }else{
          this.turn_counter++;
          this.run(completionCallback)
        }

      } else {
        this.run(completionCallback)
      }
    }.bind(this))
  },

  display: function() {
    var string = "Player 1:" + this.players[0].name + ' ' + this.players[0].mark + "\n";
    string += "Player 2:" + this.players[1].name + ' ' + this.players[1].mark + "\n";
    for (var i = 0; i < this.grid.length; i++) {
      if (!!this.grid[i]) {
        string += this.grid[i].mark;
      } else {
        string += " ";
      }
      if ((i + 1) % 3 === 0) {
        string += "\n";
      }
    }
    console.log(string);
  }
}

var player1 = new Player ('Alex', 'X');
var player2 = new Player ('Ned', 'O');
var game = new TTT (player1, player2);
game.reset();
game.run(function(){
  reader.close();
});
