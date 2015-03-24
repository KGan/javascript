(function(){
  window.AS = window.AS || {}
  var GV = AS.GameView = function(xDim, yDim) {
    this.game = new AS.Game(xDim, yDim);
  }

  GV.prototype.start = function(canvas) {
    var ctx = canvas.getContext("2d");
    this.bindKeyHandlers();
    window.setInterval((function(){
      this.game.step();
      this.game.draw(ctx);
    }).bind(this), 1000/60);
  }

  GV.prototype.bindKeyHandlers = function(){
    key('up', function(){
      this.game.ship.thrust([0,-1])
    }.bind(this));

    key('down', function(){
      this.game.ship.thrust([0,1])
    }.bind(this));

    key('left', function(){
      this.game.ship.thrust([-1,0])
    }.bind(this));

    key('right', function(){
      this.game.ship.thrust([1,0])
    }.bind(this));

    key('space', function(){
      this.game.ship.fire()
    }.bind(this));

    key('f1', function(){
      this.game.reset()
    }.bind(this))

  }

}())
