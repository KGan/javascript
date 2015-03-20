'include strict';
var readline = require('readline');

function Hanoi() {
}

Hanoi.prototype = {
  play: function(fn) {
    this.stacks = [[3,2,1],[],[]];
    this.reader = readline.createInterface(process.stdin, process.stdout);
    this.run(fn);
  },
  run: function(completionCallback) {
    this.promptMove(function(from, to) {
      if (this.isValidMove(from, to)) {
        this.stacks[to].push(this.stacks[from].pop());
      } else {
        console.log('Invalid move!')
      }
      if (this.isWon()) {
        completionCallback()
      } else {
        this.run(completionCallback)
      }
    }.bind(this))

  },
  isWon: function() {
    if(this.stacks[0].length < 1) {
      if(this.stacks[1].length < 1 || this.stacks[2].length < 1) {
        return true;
      }
    }
    return false;
  },
  display: function() {
    this.stacks.forEach(function(stack) {
      for(var i = 0; i < 3; i++) {
        if (!stack[i]) {
          console.log(' ')
        } else {
          console.log(stack[i])
        }
      }
    })
  },
  promptMove: function(callback) {
    this.display();
    this.reader.question('Give me two stacks(0,1,2)', function(input){
     callback( input.slice(0,1), input.slice(1));
   });
  },
  isValidMove: function(from, target) {
    var f = this.stacks[from];
    var t = this.stacks[target];
    return (f.length > 0) && this.inBounds(from) && this.inBounds(target) &&  (t[t.length - 1] === undefined || (f[f.length - 1] < t[t.length -1]));
  },
  inBounds: function(index) {
    return index > -1 && index < 3;
  }
}

var game = new Hanoi();
game.play(function() {
  game.reader.close();
  console.log('done!');
})
