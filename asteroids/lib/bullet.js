(function(){
  window.AS = window.AS || {}
  AS.Bullet = function(options) {
    options.radius = AS.Bullet.RADIUS;
    options.color = AS.Bullet.COLOR;
    AS.MovingObject.call(this,options)
  }

  AS.Bullet.RADIUS = 3;
  AS.Bullet.COLOR = "#CC2900"
  AS.util.inherits(AS.Bullet, AS.MovingObject)
}())
