(function () {
  window.Hanoi = window.Hanoi || {};
  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.selectedStacks = [];
    this.setupTowers();
    this.bindEvents();
  };

  View.prototype.reset = function(){
    this.$el.html('');
    this.game = new Hanoi.Game();
    this.selectedStacks = [];
    this.setupTowers();
    this.bindEvents();
  }

  View.prototype.bindEvents = function() {
    var fn = this.makeMove
    var context = this
    $('.hanoi-stack').on('click.hanoi', function(event) {
      fn.call(context, $(this));
    });
  }

  View.prototype.makeMove = function($stack) {
    this.selectedStacks.push($stack.data('stackid'));
    if(this.selectedStacks.length > 1) {
      var stacks = $('.hanoi-stack');
      $(stacks[this.selectedStacks[0]]).removeClass('selected');
      if (this.game.isValidMove.apply(this.game, this.selectedStacks)){
        this.game.move.apply(this.game, this.selectedStacks);
        var $fr = $(stacks[this.selectedStacks[0]])
        var $to = $(stacks[this.selectedStacks[1]])
        this.moveDisk($fr, $to);
        if (this.game.isWon()) {
          alert("You win!");
          stacks.off('click.hanoi')
        }
        this.selectedStacks = [];
      }
      else {
        this.flashRed(this.selectedStacks[1]);
        this.selectedStacks = [];
      }
    }
    this.render();
  }

  View.prototype.flashRed = function(idx){
    var elem = $(".hanoi-stack:nth-child("+(idx+1)+")")
    elem.css('transition', '.2s');
    elem.css('background', 'red');
    setTimeout(function(){
      elem.css('background', 'none');
      elem.css('transition', 'background 1.1s');
    },110);
  }

  View.prototype.moveDisk = function(start, end) {
    var disk_to_remove = start.children('.hanoi-disk:last-child');
    disk_to_remove.detach();
    end.append(disk_to_remove);
  }

  View.prototype.setupTowers = function () {
    var stacks = this.game.towers;
    var stackstr;
    for(var tower_idx = 0; tower_idx < stacks.length; tower_idx++) {
      stackstr = "<div class='hanoi-stack group' data-stackid='" + tower_idx +"'>";
      for(var disk_idx = 0; disk_idx < stacks[tower_idx].length; disk_idx++) {
        disc = stacks[tower_idx][disk_idx];
        stackstr += "<div class='hanoi-disk' data-disksize='"+ disc + "'></div>"
      }
      stackstr += "</div>"
      this.$el.append(stackstr);
    }
    this.render();
  }

  View.prototype.render = function() {
    var maxheight = 0;
    $(".hanoi-disk").each(function(index) {
      var $disk = $(this);
      var disk_height = 60 * $disk.data("disksize");
      if(disk_height > maxheight) {
        maxheight = disk_height
      }
      $disk.css("height", disk_height +"px");
    });

    $(".hanoi-stack").css("height", maxheight);
    if (this.selectedStacks.length){
      $($(".hanoi-stack")[this.selectedStacks[0]]).addClass("selected");
    }
  }

















})();
