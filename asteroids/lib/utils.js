(function (){
  window.AS = window.AS || {};
  AS.util = AS.util || {};
  AS.util.distance = function (posArr1, posArr2) {
    xDiff = (posArr1[0] - posArr2[0]);
    yDiff = (posArr1[1] - posArr2[1]);
    return Math.sqrt( (xDiff * xDiff) + (yDiff * yDiff) );
  };

  AS.util.norm = function(posArr) {
    return AS.distance([0,0], posArr);
  };

  AS.util.addVec = function(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
  };

  AS.util.scale = function(vec, scalar) {
    return [vec[0]*scalar, vec[1]*scalar];
  };

  AS.util.inherits = function(child, parent) {
    function F () {};
    F.prototype = parent.prototype;
    child.prototype = new F();
  };

  AS.util.randv = function(factor) {
    factor = factor || 1
    return [((2*Math.random()) - 1) * factor, ((2 * Math.random()) - 1) * factor]
  }
  AS.util.config = AS.util.config || {};

  AS.util.config.NUM_ASTEROIDS = 10;
}());
