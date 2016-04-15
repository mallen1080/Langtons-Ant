(function () {

var LangtonsAnt = window.LangtonsAnt = window.LangtonsAnt || {};

var Ant = LangtonsAnt.Ant = function (options) {
  this.location = options.location;
  this.board = options.board;
  this.direction = [0, 1];
  this.active = true;
};

Ant.prototype.step = function () {

  if (!this.active) {return;}

  if (!this.board.onGrid(this.location)) {
    this.active = false;
    return;
  }

  var oldColor = this.board.grid[this.location[0]][this.location[1]];
  this.board.grid[this.location[0]][this.location[1]] = (oldColor + 1) %
    this.board.numColors;

    this.direction.reverse();
  if (oldColor % 2 === 0) {
    if (this.direction[0] === 0) {
      this.direction[1] *= -1;
    }
  } else {
    if (this.direction[1] === 0) {
      this.direction[0] *= -1;
    }
  }

  this.location[0] += this.direction[0];
  this.location[1] += this.direction[1];
};


})();
