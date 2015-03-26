!function () {
  window.SN = window.SN || {};

  var Snake = SN.Snake = function(start_pos) {
    this.dir = "N";
    this.segments = [new Coord(start_pos)];
  }

  Snake.prototype.move = function (eat) {
    var head = this.head();
    var dirmove = Coord.dirs[this.dir];
    var newhead = new Coord(head.plus(dirmove));
    if(eat){
      this.segments = [newhead].concat(this.segments);
    } else {
      this.segments = [newhead].concat(this.segments.slice(0, this.segments.length - 1));
    }
  }

  Snake.prototype.head = function() {
    return this.segments[0];
  }
  Snake.prototype.next = function(){
    return this.head().plus(Coord.dirs[this.dir]);
  }
  Snake.prototype.turn = function(dir) {
    if(!this.oppdir(dir)){
      this.dir = dir;
    }
  }
  Snake.prototype.oppdir = function(dir) {
    if(!this.segments[1]){
      return false;
    }
    var newnext = this.head().plus(Coord.dirs[dir]);
    if((new Coord(newnext)).eqls(this.segments[1])) {
      return true;
    }
    return false;
  }



  var Board = SN.Board = function(size) {
    this.size = size;
    this.reset();
  }

  Board.prototype.step = function () {
    var next = this.snake.next();
    if(this.isValid(next)) {
      if((new Coord(next)).eqls(this.apple)) {
        this.snake.move(true);
        this.apple = undefined;
        this.spawnApple();
      } else {
        this.snake.move();
      }
    } else {
      // this.reset();
      throw new Error('you lose!');
    }
  }

  Board.prototype.reset = function() {
    this.apple = undefined;
    this.snake = new Snake(Board.randpos(this.size));
    this.initGrid();
  }

  Board.prototype.initGrid = function() {
    this.grid = new Array(this.size);
    for(var i = 0; i < this.size; i++) {
      this.grid[i] = new Array(this.size);
    }
    this.spawnApple()
  }

  Board.randpos = function(size) {
    return [(Math.random() * size) | 0, (Math.random() * size) | 0]
  }

  Board.prototype.spawnApple = function () {
    while(!this.isValid(this.apple)) {
      this.apple = Board.randpos(this.size);

    }
  }

  Board.prototype.isValid = function (position) {
    if(!position) {
      return false;
    }
    if (position[0] > this.size - 1 || position[0] < 0 || position[1] < 0 || position[1] > this.size - 1) {
      return false;
    }
    var collPos = this.snake.segments
    var collision = false;
    collPos.forEach(function(snake_seg){
      if(snake_seg.eqls(position)) {
        collision = true;
      }
    })
    if (collision) {
      return false;
    }
    return true;

  }


  var Coord = SN.Coord = function (position) {
    this.pos = position
  }
  Coord.dirs = {
    'W': [0 , -1],
    'S': [1 ,  0],
    'E': [0 ,  1],
    'N': [-1,  0]
  }



  $.extend(Coord.prototype, {
    x: function() {
      return this.pos[0];
    },
    y: function() {
      return this.pos[1];
    },
    eqls: function(other) {
      if(other instanceof Coord){
        return ((this.pos[0] === other.pos[0]) && (this.pos[1] === other.pos[1]));
      }
      if(other instanceof Array){
        return ((this.pos[0] === other[0]) && (this.pos[1] === other[1]));
      } else {
        throw new Error('not a coordinate or an array');
      }
    },
    plus: function(dir) {
      return [this.pos[0] + dir[0], this.pos[1] + dir[1]];
    },
    move: function(dir) {
      return [this.pos[0] + dir[0], this.pos[1] + dir[1]];
    }
  })


  var View = SN.View = function(board, $el) {
    this.board = board;
    this.$el = $el;
    this.render();
  }

  View.prototype.bindKeys = function(){
    $(document).on('keydown.snake', this.handleKey.bind(this))
  }

  View.prototype.reset = function(){
    clearInterval(this.int);
    this.board.reset();
    this.render();
  }

  View.prototype.handleKey = function(event) {
    switch(event.keyCode) {
      case 37:
        event.preventDefault();
        this.board.snake.turn('W');
        break;
      case 38:
        event.preventDefault();
        this.board.snake.turn('N');
        break;
      case 39:
        event.preventDefault();
        this.board.snake.turn('E');
        break;
      case 40:
        event.preventDefault();
        this.board.snake.turn('S');
        break;
      default:
        return;
    }
  }

  View.prototype.render = function(){
    this.$el.children().remove();
    var html_string = ""
    for(var i = 0; i < this.board.size; i++) {
      for(var j = 0; j < this.board.size; j++) {
        var coord = new Coord([i,j]);
        var html_class = "snake-cell"
        if (this.board.isValid([i,j])) {
          if (coord.eqls(this.board.apple)) {
            html_class += ' apple';
          }
        }
        else {
          html_class += ' snake';
          if (this.board.snake.head().eqls([i,j])) {
            html_class += '-head';
          }
        }
        html_string += "<div class='"+ html_class + "'></div>";
      }
    }
    this.$el.append(html_string);
  }


  View.prototype.start = function(){
    this.bindKeys();
    this.int = setInterval(function(){
      try {
        this.board.step();
        this.render();
      } catch(err) {
        alert (err);
        clearInterval(this.int);
      }
    }.bind(this), 1000/10);
  }






}();
