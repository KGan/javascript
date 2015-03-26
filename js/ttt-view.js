(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var fn = this.makeMove
    var context = this
    $('.ttt-cell').on('click.ttt', function(event) {
      fn.call(context,$(this))
    });
  };

  View.prototype.reset = function() {
    this.$el.html('');
    this.game = new TTT.Game();
    this.setupBoard();
    this.bindEvents();
  }

  View.prototype.makeMove = function ($square) {
    var playerMark = this.game.currentPlayer
    try {
      this.game.playMove([$square.data("row"), $square.data("col")]);
      $square.addClass('selected');
      $square.append("<div class='ttt-symbol'>" + playerMark +"</div>");
      if (this.game.isOver()){
        alert(this.game.winner() + ' Wins!');
        $('.ttt-cell').off('click.ttt');
      }
    }
    catch(err) {
      alert(err);
    }
  };

  View.prototype.setupBoard = function () {
    // var _grid = this.game.board
    var board_string = "";
    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
        board_string += "<div class='ttt-cell' data-row='" + row + "' data-col='" + col + "'></div>"
      }
    }
    this.$el.append(board_string);
  };
})();
