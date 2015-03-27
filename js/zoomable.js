$.fn.zoomable = function (size) {
  return this.each(function () {
    new $.Zoomable(this, size);
  });
};

$.Zoomable = function (el, size) {
  this.$el = $(el);
  this.focusSize = size;
  this.bindMouse();
  this.$focusBox = $("<div class='focus-box'></div>");
  this.$focusBox.css({'width': '' + size , 'height': '' + size});
  this.$el.append(this.$focusBox);
};

$.extend($.Zoomable.prototype, {
  bindMouse: function () {
    $('img').on('mouseenter', this.showFocusBox.bind(this));
    $('img').on('mouseleave', this.hideFocusBox.bind(this));
    $('img').on('mousemove', this.moveFocusBox.bind(this));
  },

  showFocusBox: function (e) {
    
  },

  hideFocusBox: function (e) {

  },
  moveFocusBox: function (e) {

  }
});
