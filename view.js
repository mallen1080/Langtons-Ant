(function () {

var LangtonsAnt = window.LangtonsAnt = window.LangtonsAnt || {};

var View = LangtonsAnt.View = function (board) {
  this.canvas = $("#canvas")[0];
  this.board = board;
  this.bindClickEvent();
};

View.prototype.bindClickEvent = function () {
  $(this.canvas).click(this.handleClick.bind(this));
};

View.prototype.handleClick = function () {
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



})();
