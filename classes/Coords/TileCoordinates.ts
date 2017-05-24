class TileCoordinates extends Coords {
  grid: Grid;

  constructor(x: number, y: number, grid: Grid) {
    super(x, y);
    if (grid instanceof Grid) {
      this.grid = grid;
    }
  }

  toScreen() {
    var grid: Grid = this.grid;
    return new Square(
      new ScreenCoordinates(
        grid.leftMargin + this.x * grid.tileSide,
        grid.topMargin + this.y * grid.tileSide
      ),
      grid.tileSide
    );
  }
}