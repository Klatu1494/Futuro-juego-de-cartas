class Tile {
  constructor(args) {
    var {
      grid,
      unit = null,
      x,
      y,
    } = args;
    if (grid instanceof Grid && (unit === null || unit instanceof Unit)) {
      this.unit = unit;
      this.x = x;
      this.y = y;
      this.grid = grid;
      this.draw();
    } else throw new Error();
  }

  draw() {
    var grid = this.grid;
    var ctx = grid.ctx;
    var tileSide = grid.tileSide;
    var leftMargin = grid.leftMargin;
    var topMargin = grid.topMargin;
    var x = this.x;
    var y = this.y;
    ctx.fillRect(leftMargin + tileSide * x, topMargin + tileSide * y, tileSide, tileSide);
    ctx.strokeRect(leftMargin + tileSide * x, topMargin + tileSide * y, tileSide, tileSide);
  }
}