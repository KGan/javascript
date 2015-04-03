NewsReader.Models.UserFeed = Backbone.Model.extend({
  url: function() {
    return this.feed.url() + '/userfeed';
  },
  initialize: function(options) {
    this.feed = options.feed
  }
})
