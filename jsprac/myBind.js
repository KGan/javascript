Object.prototype.slice = Array.prototype.slice;

Function.prototype.myBind = function(context) {
  args = arguments.slice(1);
  var fn = this;
  return function () {
    fn.apply(context, args);
  }
}

var cat = {name: "Gizmo"};
cat.meow = function(word) {
  console.log(this.name + word);
}

setTimeout(cat.meow.myBind(cat, ' hi'), 20);
