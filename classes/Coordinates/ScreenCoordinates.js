class ScreenCoordinates extends Coordinates {
  constructor(x, y) {
    super(x, y);
  }

  /// Converts screen coordinates to grid coordinates
  /// Returns Coordinates
  toGrid(grid) {
    var leftMargin = grid.leftMargin;
    var topMargin = grid.topMargin;
    var tileSide = grid.tileSide;
    var gridX = Math.floor((this.x - leftMargin) / tileSide);
    var gridY = Math.floor((this.y - topMargin) / tileSide);

    return new TileCoordinates(gridX, gridY, grid);
  }
}