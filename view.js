(function () {

var LangtonsAnt = window.LangtonsAnt = window.LangtonsAnt || {};

var View = LangtonsAnt.View = function (board) {
  this.board = board;
  this.canvas = $("#canvas")[0];
  this.$start = $("#start");
  this.$pause = $("#pause");
  this.$reset = $("#reset");
  this.$step = $("#step");
  this.$random = $("#random");
  this.$square = $("#square");
  this.$drop = $("#drop");
  this.$border = $("#border");
  this.$radios = $("#color-radios input");
  this.$speed = $("#speed");
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  $(this.canvas).click(this.canvasClick.bind(this));
  this.$start.click(this.startBoard.bind(this));
  this.$pause.click(this.pauseBoard.bind(this));
  this.$reset.click(this.resetBoard.bind(this));
  this.$step.click(this.stepBoard.bind(this));
  this.$random.click(this.randomAnt.bind(this));
  this.$square.click(this.expandingSquare.bind(this));
  this.$drop.click(this.rainDrop.bind(this));
  this.$border.click(this.toggleBorder.bind(this));
  this.$radios.change(this.changeColors.bind(this));
  this.$speed.on("input", this.changeSpeed.bind(this));
};

View.prototype.canvasClick = function () {
  var canvasDims = this.canvas.getBoundingClientRect();
  var pixCoords = {
    x: event.clientX - canvasDims.left,
    y: event.clientY - canvasDims.top };
  var location = [
    Math.floor(pixCoords.y / (this.board.cellSize + this.board.borderSize)),
    Math.floor(pixCoords.x / (this.board.cellSize + this.board.borderSize))
  ];
  this.board.addAnt(location);
};

View.prototype.startBoard = function () {
  if (!this.board.active) {
    if (this.board.ants.length === 0) {
      this.board.addAnt([25,40]);
    }
    this.start = window.setInterval(
      this.board.step.bind(this.board),
      1000 / this.board.speed);
    this.board.active = true;
  }
};

View.prototype.pauseBoard = function () {
  if (this.board.active) {
    window.clearInterval(this.start);
    this.board.active = false;
  }
};

View.prototype.resetBoard = function () {
  this.pauseBoard();
  this.board.ants = [];
  this.board.grid = [];
  this.board.stepCount = 0;
  this.board.generateGrid();
  this.board.draw();
};

View.prototype.stepBoard = function () {
 this.pauseBoard();
 this.board.step();
};

View.prototype.randomAnt = function () {
  var x = Math.floor(Math.random() * this.board.numX);
  var y = Math.floor(Math.random() * this.board.numY);
  this.board.addAnt([y, x]);
};

View.prototype.changeColors = function (e) {
  if (e.target.value == "two") {
    this.board.numColors = 2;
  } else {
    this.board.numColors = this.board.colors.length;
  }
};

View.prototype.changeSpeed = function (e) {
  this.board.speed = Math.pow(1000, e.target.value / 1000);
  var prevState = this.board.active;
  if (prevState) {
    this.pauseBoard();
    this.startBoard();
  }
};

View.prototype.expandingSquare = function () {
  this.resetBoard();
  this.board.addAnt([25,40]);
  this.board.addAnt([25,41]);
  this.startBoard();
};

View.prototype.rainDrop = function () {
  this.resetBoard();
  this.board.addAnt([1,40]);
  this.board.addAnt([1,41]);
  this.board.addAnt([2,40]);
  this.board.addAnt([2,41]);
  this.startBoard();
};

View.prototype.toggleBorder = function () {
  if (this.board.cellSize === 10) {
    this.board.cellSize = 11;
    this.board.borderSize = 0;
  } else {
    this.board.cellSize = 10;
    this.board.borderSize = 1;
  }

  this.board.draw();
};


})();
