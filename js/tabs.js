$.fn.tabs = function() {
  return this.each(function() {
    new $.Tabs(this);
  });
};


$.Tabs = function(el) {
  this.$el = $(el);
  this.bindClick();
  this.init();
};

$.Tabs.DEFAULT = [
  {
    tag: "silverterrier",
    breed: "Silver Terrier",
    desc: "The Silver Terrier is a moderately-sized breed. It has retractable claws, and a friendly disposition."
  },
  {
    tag: 'ledoge',
    breed: "Le Doge",
    desc: "Le Doge is much cute and such fun. Very wow friendly."
  },
  {
    tag: 'smellydog',
    breed: 'Smelly',
    desc: "Smelly dog is smelly."
  }
];

$.extend($.Tabs.prototype, {
  init: function(){
    //this.$el.append("<ul class='tabs'></ul>");
    //this.$el.find('ul').data('content-tabs', '#content-tabs');
    //this.$el.find('.tabs').append("<div id='content-tabs'></div>");
    //var tabPanes = "<div class='tab-pane'></div>";
    //this.$el.find('div#content-tabs').append(tabPanes + tabPanes + tabPanes);
    //this.$el.find('div.tab-pane').each(function (i) {
    //  var tabPane = this;
    //  var tag = $.Tabs.DEFAULT[i].tag;
    //  $(tabPane).html("<p>" + $.Tabs.DEFAULT[i].desc + "</p>");
    //  $(tabPane).attr('id', tag);
    //  $(tabPane).parents('.tabs').prepend("<li><a href='#"+ tag + "'>" + $.Tabs.DEFAULT[i].breed + "</a></li>");
    //});
    this.$activeTab = $('.navigator li:first-child > a');
    this.$activeTab.addClass('active');
    this.switchToPane(this.$activeTab.data('elm'));
    var $activeTabPane = $('.tab-pane' + this.$activeTab.attr('href'));
    $activeTabPane.addClass('active');
  },

  bindClick: function() {
    this.$el.on('click.tabs', 'a.tablink', this.clickTab.bind(this));
  },

  clickTab: function(event) {
    if (this.$activeTab) {
      this.$activeTab.removeClass('active');
      var $activeTabPane = $(this.$activeTab.attr('href'));
      $activeTabPane.removeClass('active');
      $activeTabPane.addClass('transitioning');

      $activeTabPane.one('transitionend', function (transitionEvent) {
        $activeTabPane.removeClass('transitioning');
        var $clicked = $(event.currentTarget);

        this.$activeTab = $clicked; //actually the <a> link
        var $tabPane = $($clicked.attr('href'));
        $clicked.addClass('active');
        $tabPane.addClass('active transitioning');
        setTimeout(function () {
          $tabPane.removeClass('transitioning');
          this.switchToPane($clicked.data('elm'));
        }.bind(this), 0);
      }.bind(this));
    }
  },

  switchToPane: function(hrf) {
    //switch(hrf) {
    //  case '.carousel':
    //    $('.carousel').carousel();
    //        break;
    //  case '.thumbnails':
    //    $('.thumbnails').thumbnails();
    //        break;
    //  case '.zoomable':
    //    $('div.zoomable').zoomable(50);
    //        break;
    //}
  }





});
