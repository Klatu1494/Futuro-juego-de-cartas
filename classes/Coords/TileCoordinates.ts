class TileCoordinates extends Coords {
  grid: Grid;

  constructor(x: number, y: number, grid: Grid) {
    super(x, y);
    if (grid instanceof Grid) {
      this.grid = grid;
    }
  }

  toScreen(): Square {
    var grid: Grid = this.grid;
    return new Square(
      new ScreenCoordinates(
        grid.leftMargin + grid.leftPadding + this.x * grid.tileSide,
        grid.topMargin + grid.topPadding + this.y * grid.tileSide
      ),
      grid.tileSide
    );
  }

  toCanvas(): Square {
    var grid: Grid = this.grid;
    return new Square(
      new ScreenCoordinates(
        grid.leftPadding + this.x * grid.tileSide,
        grid.topPadding + this.y * grid.tileSide
      ),
      grid.tileSide
    );
  }
}