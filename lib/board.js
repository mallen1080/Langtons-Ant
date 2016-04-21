(function () {

var LangtonsAnt = window.LangtonsAnt = window.LangtonsAnt || {};

var colors = [
  "#333333", //darkgrey
  "#ff0000", //red
  "#ff9900", //orange
  "#ffff00", //yellow
  "#009933", //green
  "#0033cc", //blue
  "#990099", //purple
  "#fff" //white
];

var Board = LangtonsAnt.Board = function (options) {
  this.ctx = options.ctx;
  this.numX = options.numX;
  this.numY = options.numY;
  this.cellSize = 10;
  this.borderSize = 1;
  this.ants = [];
  this.grid = [];
  this.colors = colors;
  this.numColors = 2;
  this.active = false;
  this.speed = 52;
  this.stepCount = 0;
  this.generateGrid();
  this.testCount = 0;
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
  that.ctx.fillRect(0,0,
    this.numX * (this.cellSize + this.borderSize),
    this.numY * (this.cellSize + this.borderSize));

  this.grid.forEach(function (row, i) {
    row.forEach(function (cell, j) {
      that.ctx.fillStyle = that.colors[that.grid[i][j]];
      that.ctx.fillRect((j * (that.cellSize + that.borderSize)),
        (i * (that.cellSize + that.borderSize)), that.cellSize, that.cellSize);
    });
  });
  $d(".count").html(this.stepCount);
};

Board.prototype.addAnt = function (location) {
  var newAnt = new LangtonsAnt.Ant({location: location, board: this});
  newAnt.step();
  this.draw();
  this.ants.push(newAnt);
};

Board.prototype.step = function () {
  var active = false;
  this.ants.forEach(function (ant) {
    if (ant.active) { active = true; }
    ant.step();
  });
  if (active) { this.stepCount += 1; }

  this.draw();
};

Board.prototype.onGrid = function (pos) {
  return (pos[0] < this.numY && pos[0] >= 0) &&
    (pos[1] < this.numX && pos[1] >= 0);
};

})();
