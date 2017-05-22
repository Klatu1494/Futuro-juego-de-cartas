/// Represents a pair (x, y).
class Coordinates {
  constructor(x, y) {
    if (0 <= x && isFinite(x) && 0 <= y && isFinite(y)) {
      this.x = x;
      this.y = y;
    }
  }

  /// Converts screen coordinates to grid coordinates
  /// Returns Coordinates
  screenToGrid() {
    var gridX = Math.floor((this.x - leftMargin) / tileSide);
    var gridY = Math.floor((this.y - topMargin) / tileSide);

    return new Coordinates(gridX, gridY);
  }
}