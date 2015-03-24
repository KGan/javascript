(function(){
  window.AS = window.AS || {}

  var Game = AS.Game = function(xDim, yDim){
    this.DIM_X = xDim
    AS.util.config.DIM_X = xDim
    this.DIM_Y = yDim
    AS.util.config.DIM_Y = yDim
    this.reset();
  }


  AS.Game.randPos = function() {
    return [ AS.util.config.DIM_X * Math.random(), AS.util.config.DIM_Y * Math.random()]
  };

  AS.Game.prototype.addObj = function(obj) {
    if (obj instanceof AS.Asteroid) {
      this.asteroids.push(obj);
    }
    if (obj instanceof AS.Bullet) {
      console.log('pushed')
      this.bullets.push(obj)
    }
    this.allObjects.push(obj)
  }

  AS.Game.prototype.addAsteroids = function(){
    for (var i = 0; i < AS.util.config.NUM_ASTEROIDS; i ++) {
      this.addObj(new AS.Asteroid({pos: AS.Game.randPos(), game: this}));
    }
  };

  AS.Game.prototype.addBullets = function(options) {
    this.addObj(new AS.Bullet(options));
  };

  AS.Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, AS.util.config.DIM_X + 40, AS.util.config.DIM_Y + 40);
    this.allObjects.forEach(function(object) {
        object.draw(ctx);
    })
  };

  AS.Game.prototype.moveObjects = function() {
    this.allObjects.forEach(function(object){
      object.move();
    });
  }

  AS.Game.prototype.wrap = function(pos) {
    return [(pos[0] + this.DIM_X) % this.DIM_X, (pos[1] + this.DIM_Y) % this.DIM_Y]
  }

  AS.Game.prototype.step = function() {
    this.moveObjects();
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = 0; j < this.bullets.length; j++) {
        console.log(this.bullets.length)
          if (this.asteroids[i].isCollidedWith(this.bullets[j])) {
            console.log('hi');
            this.remove(this.asteroids[i]);
            this.remove(this.bullets[j]);
        }
      }
    }

  };

  AS.Game.prototype.remove = function(obj) {
    if (obj instanceof AS.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1)
    }
    if (obj instanceof AS.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1)
    }
    this.allObjects.splice(this.allObjects.indexOf(obj), 1);
    delete obj;
  }

  AS.Game.prototype.reset = function() {
    this.asteroids = [];
    this.bullets = [];
    this.allObjects = [];
    this.ship = new AS.Ship({pos: [this.DIM_X/2, this.DIM_Y/2], game: this});
    this.addAsteroids();
    this.allObjects.push(this.ship);
  }

}());
