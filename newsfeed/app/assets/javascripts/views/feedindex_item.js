NewsReader.Views.FeedIndexItem = Backbone.View.extend({
  template: JST.feed_index_item,

  events: {
    "click button.delete-button": "delete",
    "click button.subscribe": "subscribe"
  },

  render: function(){
    var content = this.template({feed: this.model});
    this.$el.html(content);
    return this;
  },

  subscribe: function(event) {
    event.preventDefault();
    var sub = new NewsReader.Models.UserFeed({feed: this.model});
    sub.save({}, {
      success: function() {
        this.render();
      }.bind(this)
    });
  },

  delete: function() {
    this.model.destroy();
    this.remove();
  }
});
