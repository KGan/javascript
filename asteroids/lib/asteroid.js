(function(){
  window.AS = window.AS || {}

  AS.Asteroid = function(options) {
    var opts = options
    opts.radius = RAD;
    opts.color = COLOR;
    opts.vel = AS.util.randv(15);
    AS.MovingObject.call(this, opts);
  };

  var RAD = AS.Asteroid.RADIUS = 40
  var COLOR = AS.Asteroid.COLOR = '#808080'
  AS.util.inherits(AS.Asteroid, AS.MovingObject);

}())
