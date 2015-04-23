var fs = require('fs')

fs.readFile('maze4.txt', 'utf8', function(err, data) {
  run(data)
})



function run(file_contents) {
  var maze = new Maze(file_contents)
  maze.solve(function(){
    maze.display()
  })
}

function Maze(file_contents) {
  this.grid = new Array;
  this.width = file_contents.indexOf("\n") ;
  var mid = file_contents.split("\n")
  mid.forEach(function(row, idx) {
    this.grid[idx] = row.split('');
    for(var j = 0; j < row.length; j++) {
      if (row[j] == 'S') {
        this.start = [idx, j];
      } else if (row[j] == 'E') {
        this.end = [idx, j]
      }
    }
  }.bind(this))
  this.display();
}

Maze.DIRECTIONS = [[0,1],[1,0],[-1,0],[0,-1]];

Maze.prototype = {
  highlightPath: function(node){
    if(node === undefined || node === this.start) {
      return
    } else {
      this.grid[node[0]][node[1]] = 'X'
      this.highlightPath(this.visited[node])
    }
  },
  valid: function(position) {
    var char = this.grid[position[0]][position[1]]
    return char === " " || char === "E";
  },

  validNeighbors: function(position) {
    var vN = [];
    for (var i = 0; i < Maze.DIRECTIONS.length; i++) {
      var dir = Maze.DIRECTIONS[i];
      var x = position[0] + dir[0];
      var y = position[1] + dir[1];
      var newPos = [x,y];
      if (this.valid(newPos)) {
        vN.push(newPos);
      }
    }
    return vN;
  },

  solve: function(completedCallback) {
    var queue = [this.start];
    this.visited = {};
    while (queue.length > 0) {
      var currentNode = queue.shift();
      var neighbors = this.validNeighbors(currentNode);
      for (var i = 0; i < neighbors.length; i++) {
        child = neighbors[i]; //
        queue.push(child);
        this.grid[child[0]][child[1]] = '_' //sets node to visited
        this.visited[child] = currentNode; //sets the parent
        var arrayString1 = child.join(',');
        var arrayString2 = this.end.join(',');
        if (arrayString1 === arrayString2) {
          this.grid[child[0]][child[1]] = 'E';
          this.highlightPath(this.visited[this.end]);
          completedCallback() // callback at the end.

          return;
        }
      }
    }
  },

  display: function() {
    this.grid.forEach(function(line) {
      var row = ''
      line.forEach(function(char) {
        row += char
      })
      console.log(row)
    })
  }
}
