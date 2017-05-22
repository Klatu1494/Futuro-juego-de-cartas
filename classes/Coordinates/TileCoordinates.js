class TileCoordinates extends Coordinates {
  constructor(x, y, grid) {
    super(x, y);
    if (grid instanceof Grid) {
      this.grid = grid;
    }
  }

  toScreen() {
    var grid = this.grid;
    return new Square(
      new ScreenCoordinates(grid.leftMargin + this.x * grid.tileSide, grid.topMargin + this.y * grid.tileSide),
      grid.tileSide
    );
  }
}