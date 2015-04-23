NewsReader.Collections.Feeds = Backbone.Collection.extend({
  url: 'api/feeds',
  model: NewsReader.Models.Feed,

  getOrFetch: function (id) {
    var model = this.get(id);

    if (!model) {
      model = new NewsReader.Models.Feed({ id: id });
    }
    model.fetch({
      success: function (model) {
        this.add(model, { merge: true });
      }.bind(this)
    });
    return model;
  }
});
