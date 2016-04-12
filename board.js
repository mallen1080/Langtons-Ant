(function () {

var LangtonsAnt = window.LangtonsAnt = window.LangtonsAnt || {};

var Board = LangtonsAnt.board = function (options) {
  this.numX = options.numX;
  this.numY = options.numY;
  this.cellSize = 10;
  this.borderSize = 1;
  this.ants = [];
  this.grid = [];
  this.colors = ["#00004d","#ccccff"];
  this.ctx = options.ctx;
  this.generateGrid();
};

Board.prototype.generateGrid = function () {
  for (var i = 0; i < this.numY; i++) {
    this.grid.push(Array(this.numX).fill(0));
  }
  this.draw();
};

Board.prototype.draw = function () {
  var that = this;
  this.grid.forEach(function (row, i) {
    row.forEach(function (cell, j) {
      that.ctx.fillStyle = that.colors[that.grid[i][j]];
      that.ctx.fillRect((j * (that.cellSize + that.borderSize)),
        (i * (that.cellSize + that.borderSize)), that.cellSize, that.cellSize);
    });
  });
};

})();
