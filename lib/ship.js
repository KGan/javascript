(function(){
   window.AS = window.AS || {}
   AS.Ship = function(options) {
     var opts = options
     opts.color = AS.Ship.COLOR;
     opts.radius = AS.Ship.RADIUS;
     opts.vel = [0,0]
     AS.MovingObject.call(this, opts)
   }
   AS.util.inherits(AS.Ship, AS.MovingObject)
   AS.Ship.COLOR = "#000099"
   AS.Ship.RADIUS = 8

   AS.Ship.prototype.thrust = function(impulse) {
     this.vel = AS.util.addVec(this.vel, impulse)
   }

   AS.Ship.prototype.fire = function() {
     this.game.addBullets({pos: this.pos, vel: AS.util.scale(this.vel, 1.5), game: this.game})
   }

}())
