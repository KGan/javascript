$.fn.thumbnails = function() {
  return this.each(function() {
    new $.Thumbnail(this);
  });
};

$.Thumbnail = function(el) {
  this.$el = $(el);
  this.$activeImg = $('.gutter-images img:first-child');
  this.$gutterIdx = 0;
  this.$images = $('.gutter-images img');
  this.activate(this.$activeImg);
  this.bindEvents();
  this.fillGutterImgs();
};

$.extend($.Thumbnail.prototype, {
  activate: function($img) {
    var bigImg = $img.clone();
    $('div.activeimg').html(bigImg);
  },
  bindEvents: function(){
    $('.gutter-images img').on('click.thumb', this.click.bind(this));
    $('.gutter-images img').on('mouseenter.thumb', this.hoverEnter.bind(this));
    $('.gutter-images img').on('mouseleave.thumb', this.hoverLeave.bind(this));
    $('a.nav').on('click.arrow', this.navGutter.bind(this));
  },
  click: function(e) {
    var $smallClicked = $(e.currentTarget);
    this.$activeImg = $smallClicked;
    this.activate($smallClicked);
  },
  fillGutterImgs: function(){
    $('.gutter-images img').detach();
    for(var i = this.$gutterIdx; i < this.$gutterIdx + 5; i++) {
      var index = (i + this.$images.length) % this.$images.length;
      $('.gutter-images').append(this.$images.eq(index));
    }
  },
  hoverEnter: function(e) {
    var $smallHover = $(e.currentTarget);
    this.activate($smallHover);
  },
  hoverLeave: function(e) {
    this.activate(this.$activeImg);
  },
  navGutter: function(e) {
    var dir = $(e.currentTarget).text();
    (dir === '<') ? this.$gutterIdx++ : this.$gutterIdx--;
    this.fillGutterImgs();
  }

});
