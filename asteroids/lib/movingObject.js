!function(){
  window.AS = window.AS || {};
  AS.MovingObject = function (options) {
    this.pos = options.pos || [0,0]
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game
  };

  AS.MovingObject.prototype = {
    draw: function(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(
        (this.x()),
        (this.y()),
        this.radius,
        0,
        2*Math.PI,
        false

      );
      ctx.fill();
    },

    x: function(){
      return this.pos[0];
    },

    y: function(){
      return this.pos[1];
    },

    move: function(amount){
      amount = amount || 1
      this.pos = AS.util.addVec(this.pos, AS.util.scale(this.vel, amount));
      this.pos = this.game.wrap(this.pos);
    },


    turn: function(angle) {
      this.xVel = this.xVel * Math.cos(angle)
      this.yVel = this.yVel * Math.sin(angle)
    },

    isCollidedWith: function(other) {
      return (AS.util.distance(this.pos, other.pos) < (this.radius + other.radius))
    }
  }
}();
