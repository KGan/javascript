NewsReader.Views.FeedIndex = Backbone.CompositeView.extend({
  template: JST.feed_index,

  initialize: function() {
    this.listenTo(this.collection, 'sync remove', this.render);
  },


  render: function() {
    var content = this.template();
    this.$el.html(content);

    this.collection.each(function(feed) {
      var feedIndexItem = new NewsReader.Views.FeedIndexItem({model: feed});
      this.addSubview('ul.feed-index', feedIndexItem);
    }.bind(this));

    return this;
  }
});
