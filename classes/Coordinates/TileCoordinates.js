class TileCoordinates extends Coordinates() {
  constructor(x, y, grid) {
    if (grid instanceof Grid) {
      super(x, y);
      this.grid = grid;
    }
  }

  toScreen() {
    var grid = this.grid;
    return new Square(
      new ScreenCoordinates(grid.marginLeft + this.x * grid.tileSide, grid.marginTop + this.y * grid.tileSide),
      grid.tileSide
    );
  }
}