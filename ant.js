(function () {

var LangtonsAnt = window.LangtonsAnt = window.LangtonsAnt || {};

var Ant = LangtonsAnt.Ant = function (options) {
  this.location = options.location;
  this.board = options.board;
  this.direction = [0, 1];
};

Ant.prototype.step = function () {
  var oldCell = this.board.grid[this.location[0]][this.location[1]];
  this.board.grid[this.location[0]][this.location[1]] = (oldCell + 1) %
    this.board.colors.length;

    this.location.reverse();
  if (oldCell % 2 === 0) {
    if (this.location[0] === 0) {
      this.location[1] *= -1;
    }
  } else {
    if (this.location[1] === 0) {
      this.location[0] *= -1;
    }
  }

  this.location[0] += this.direction[0];
  this.location[1] += this.direction[1];
  
};


})();
