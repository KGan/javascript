NewsReader.Views.Feed = Backbone.CompositeView.extend({
  template: JST.feed,

  events: {
    "click button.refresh-button": "refresh"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    this.model.entries().each(function(entry){
      var entryIndexItem = new NewsReader.Views.EntryIndexItem({model: entry});
      this.addSubview('ul.feed-entries', entryIndexItem);
    }.bind(this));
    return this;
  },

  refresh: function (event) {
    event.preventDefault();
    this.model.fetch();
  }
});
