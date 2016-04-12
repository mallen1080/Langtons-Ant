(function () {

var LangtonsAnt = window.LangtonsAnt = window.LangtonsAnt || {};

var colors = [
  "#333333", //lightblue
  "#ff0000", //red
  "#ff9900", //orange
  "#ffff00", //yellow
  "#009933", //green
  "#0033cc", //blue
  "#990099", //purple
  "#fff" //white
];

var Board = LangtonsAnt.Board = function (options) {
  this.numX = options.numX;
  this.numY = options.numY;
  this.cellSize = 10;
  this.borderSize = 1;
  this.ants = [];
  this.grid = [];
  this.colors = colors;
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
  that.ctx.fillStyle = "#000";
  that.ctx.fillRect(0,0, 880, 660);

  this.grid.forEach(function (row, i) {
    row.forEach(function (cell, j) {
      that.ctx.fillStyle = that.colors[that.grid[i][j]];
      that.ctx.fillRect((j * (that.cellSize + that.borderSize)),
        (i * (that.cellSize + that.borderSize)), that.cellSize, that.cellSize);
    });
  });
};

Board.prototype.addAnt = function (location) {
  var newAnt = new LangtonsAnt.Ant({location: location, board: this});
  this.ants.push(newAnt);
};

Board.prototype.step = function () {
  this.ants.forEach(function (ant) {
    ant.step();
  });
  this.draw();
};

Board.prototype.onGrid = function (pos) {
  return (pos[0] < this.numY && pos[0] >= 0) &&
    (pos[1] < this.numX && pos[1] >= 0);
};

})();
