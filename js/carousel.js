$.fn.carousel = function() {
  return this.each(function() {
    new $.Carousel(this);
  });
};

$.Carousel = function(el) {
  this.$el = $(el);
  this.activeIndex = 0;
  this.transitioning = false;
  this.bindClick();
};

$.extend($.Carousel.prototype, {
  animate: function($new, $old) {
    setTimeout(function(){
      $new.removeClass('left right');
    }, 0);
    $old.one('transitionend', function() {
      $old.removeClass('active left right');
      this.transitioning = false;
    }.bind(this));
  },
  bindClick: function() {
    this.$el.on('click.dir', 'a', this.click.bind(this));
  },
  click: function(event) {
    var $dir = $(event.currentTarget);
    if($dir.hasClass('slide-right')) {
      this.slideRight();
    } else {
      this.slideLeft();
    }
  },

  slide: function(dir) {
    if(this.transitioning) {
      return;
    }
    this.transitioning = true;
    var $oldImg = $('.items img').eq(this.activeIndex);
    var numImgs = $('.items img').length;
    this.activeIndex = (numImgs + this.activeIndex + dir) % (numImgs);
    var $newImg = $('.items img').eq(this.activeIndex);
    $newImg.addClass('active');
    if(dir === 1) {
      $newImg.addClass('left');
      $oldImg.addClass('right');
    } else {
      $newImg.addClass('right');
      $oldImg.addClass('left');
    }

    this.animate($newImg, $oldImg);

  },
  slideRight: function() {
    this.slide(1);
  },
  slideLeft: function(){
    this.slide(-1);
  }
});
