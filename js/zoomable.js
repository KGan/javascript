$.fn.zoomable = function (size) {
  return this.each(function () {
    new $.Zoomable(this, size);
  });
};

$.Zoomable = function (el, size) {
  this.$el = $(el);
  this.$img = $('img.zoomabled');
  this.focusSize = size;
  this.bindMouse();
};
$.extend($.Zoomable.prototype, {
  bindMouse: function () {
    this.$el.on('mouseleave', this.removeFocusBox.bind(this));
    this.$el.on('mousemove', this.showFocusBox.bind(this));
  },
  showFocusBox: function (e) {
    if (!this.mousedOver) {
      this.mousedOver = true;
      this.$focusBox = $("<div class='focus-box'></div>");
      this.$focusBox.css({'width': '' + this.focusSize , 'height': '' + this.focusSize});
      this.$el.append(this.$focusBox);


      this.offset = this.$el.offset();
    }
    var topset = e.pageY - this.offset.top - this.focusSize / 2;
    if(topset < 0) {
      topset = 0;
    } if(topset >= (this.$img.innerHeight() - this.focusSize)) {
      topset = (this.$img.innerHeight() - this.focusSize)
    }
      this.$focusBox.css('top', topset);

    var leftset = e.pageX - this.offset.left - this.focusSize / 2;
    if (leftset < 0) {
      leftset = 0;
    } if (leftset >= (this.$img.innerWidth() - this.focusSize)) {
      leftset = (this.$img.innerWidth() - this.focusSize);
    }
    this.$focusBox.css('left', leftset);
    this.showZoom(leftset, topset);
  },

  showZoom: function(left, top) {
    if(!this.zoom) {
      console.log('toplel');
      this.zoom = true;
      this.wh = $(window).height();
      var scale = (this.$img.innerWidth() / this.focusSize) * 100;
      this.$zoom = $('<div class="zoomed-img"></div>');
      this.$zoom.css('background-image', 'url(' + this.$img.attr('src') + ')').css({'width': this.wh, 'height': this.wh}).css('background-size', scale+'%');

      $('.zoomable').parent().append(this.$zoom);
    }

    var posratio = this.wh / this.focusSize;
    this.$zoom.css('background-position', '-'+ left*posratio + 'px -' + top*posratio + 'px');
  },

  removeFocusBox: function (e) {
    this.$focusBox.remove();
    this.mousedOver = false;

    this.zoom = false;
    this.$zoom.remove();
  }
});
