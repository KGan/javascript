NewsReader.Views.EntryIndexItem = Backbone.View.extend({
  template: JST.entry_item,
  tagName: 'li',

  render: function () {
    var content = this.template({ entry: this.model });
    this.$el.html(content);
    return this;
  }
});
