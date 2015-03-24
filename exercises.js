function sum() {
  sum = 0;
  for(var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}
// console.log(sum(1,2,3,4));

Function.prototype.myBind = function(context) {
  var fn = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    fn.apply(context, args)
  }
}

function Cat(name) { this.name = name };
Cat.prototype.meow = function(numTimes) {
  console.log(this.name + ' meows ' + numTimes + ' times')
}
var gizmo = new Cat('gizmo')
// setTimeout(gizmo.meow.myBind (gizmo, 3), 1000)


function sumN(numArgs) {
  numbers = [];

  return  function curriedSum (number){
    numbers.push(number);
    var sum = 0;
    if (numbers.length === numArgs) {
      for(var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
      return sum;
    };

    return curriedSum;
  };
};


console.log(sumN(3)(1)(2)(3))


Function.prototype.curry = function(numArgs){
  var args =[]
  var fn = this
  return function curried(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      return fn.apply(fn, args);
    }
    return curried;
  };
};

console.log(sum.curry(4)(3)(3)(2)(1));

Function.prototype.inherits = function(parent) {
  function F () {};
  F.prototype = parent.prototype;
  this.prototype = new F();
  this.prototype.parent = parent.prototype;
};

var Animal = function(name) {
  this.name = name
}
function Dog(name, coatColor) {
  this.parent.constructor(name)
  this.coatColor = coatColor;
}

Dog.inherits(Animal);

fido = new Dog("Fido", "black");

console.log(fido.name, fido.coatColor);
