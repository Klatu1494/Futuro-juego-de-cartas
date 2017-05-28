/**
 * Represents coordinates based on the screen
 */
class ScreenCoordinates extends Coords {
  constructor(x: number, y: number) {
    super(x, y);
  }

  /**
   * Converts screen coordinates to grid coordinates.
   * @param {Grid} grid Grid used to transform the coordinates.
   * @return {TileCoordinates}
   */
  toTileCoordinates(grid: Grid) {
    var gridX: number = grid.leftMargin + grid.leftPadding;
    var gridY: number = grid.topMargin + grid.topPadding;
    var tileSide: number = grid.tileSide;
    return new TileCoordinates(
      Math.floor((this.x - gridX) / tileSide),
      Math.floor((this.y - gridY) / tileSide),
      grid
    );
  }

  /**
   * Determines whether this point allows a transformation to a TileCoordinates.
   * @param {Grid} grid Grid used to transform the coordinates.
   * @return {bool} true whenever this point can be assiged to a tile of the specified grid.
   */
  isInsideGridArea(grid: Grid) {
    return grid.getGridArea().containsProper(this);
  }
}