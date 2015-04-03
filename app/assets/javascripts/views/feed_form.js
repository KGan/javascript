NewsReader.Views.FeedForm = Backbone.View.extend({
  template: JST.feed_form,
  tagName: 'form',
  events: {
    'submit': 'save'
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  save: function(event) {
    event.preventDefault();
    var newFeed = new NewsReader.Models.Feed();
    var data = this.$el.serializeJSON();
    newFeed.save(data, {
      success: function(){
        Backbone.history.navigate('', {trigger: true});
      }
    });
  }
});
