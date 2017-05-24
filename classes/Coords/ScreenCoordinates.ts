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
  toGrid(grid: Grid) {
    var leftMargin: number = grid.leftMargin;
    var topMargin: number = grid.topMargin;
    var tileSide: number = grid.tileSide;
    var gridX: number = Math.floor((this.x - leftMargin) / tileSide);
    var gridY: number = Math.floor((this.y - topMargin) / tileSide);

    return new TileCoordinates(gridX, gridY, grid);
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