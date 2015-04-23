NewsReader.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "feedIndex",
    "feeds/new": "feedNew",
    'feeds/:id': 'feedShow'
  },

  initialize: function (options) {
    this.$el = options.$el || $('body');
    this._feeds = new NewsReader.Collections.Feeds();
    // this._feeds.fetch();
  },

  feedIndex: function () {
    this._feeds.fetch();
    var indexView = new NewsReader.Views.FeedIndex({
      collection: this._feeds
    });
    this._swapView(indexView);
  },

  feedShow: function(id) {
    var feed = this._feeds.getOrFetch(id);
    var feedView = new NewsReader.Views.Feed({
      model: feed
    });
    this._swapView(feedView);
  },

  feedNew: function () {
    var newView = new NewsReader.Views.FeedForm();
    this._swapView(newView);
  },

  _swapView: function(newView) {
    if(this._currentView) {
      this._currentView.remove();
    }
    this._currentView = newView;
    this.$el.html(newView.render().$el);
  }
});
