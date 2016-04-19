(function () {

var LangtonsAnt = window.LangtonsAnt = window.LangtonsAnt || {};

var Events = LangtonsAnt.Events = function (board) {
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

Events.prototype.bindEvents = function () {
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

Events.prototype.canvasClick = function () {
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

Events.prototype.startBoard = function () {
  if (!this.board.active) {
    if (this.board.ants.length === 0) {
      this.board.addAnt([25,40]);
    }
    this.start = window.setInterval(
      this.board.step.bind(this.board),
      this.board.speed);

    this.board.active = true;
    this.$start.attr("id", "selected");
  }
};

Events.prototype.pauseBoard = function () {
  if (this.board.active) {
    window.clearInterval(this.start);
    this.board.active = false;
    this.$start.attr("id", "start");
  }
};

Events.prototype.resetBoard = function () {
  this.pauseBoard();
  this.board.ants = [];
  this.board.grid = [];
  this.board.stepCount = 0;
  this.board.generateGrid();
  this.board.draw();
  this.$start.attr("id", "start");
};

Events.prototype.stepBoard = function () {
 this.pauseBoard();
 this.board.step();
 this.$start.attr("id", "start");
};

Events.prototype.randomAnt = function () {
  var x = Math.floor(Math.random() * this.board.numX);
  var y = Math.floor(Math.random() * this.board.numY);
  this.board.addAnt([y, x]);
};

Events.prototype.changeColors = function (e) {
  if (e.target.value == "two") {
    this.board.numColors = 2;
  } else {
    this.board.numColors = this.board.colors.length;
  }
};

Events.prototype.changeSpeed = function (e) {
  this.setSpeed(e.target.value);

  if (this.board.active) {
    this.pauseBoard();
    this.startBoard();
  }
};

Events.prototype.setSpeed = function (speed) {
  this.board.speed = (1000 / Math.pow(1000, speed / 1000)) + 20;
};

Events.prototype.expandingSquare = function () {
  this.resetBoard();
  this.board.addAnt([25,40]);
  this.board.addAnt([25,41]);
  this.startBoard();
};

Events.prototype.rainDrop = function () {
  this.resetBoard();
  this.board.addAnt([1,40]);
  this.board.addAnt([1,41]);
  this.board.addAnt([2,40]);
  this.board.addAnt([2,41]);
  this.startBoard();
};

Events.prototype.toggleBorder = function () {
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
