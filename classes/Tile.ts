/**
 * @fileoverview Contains the Tile class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * A grid tile
 * @class
 */
abstract class Tile {
  coordinates: TileCoordinates;
  grid: Grid;
  /**
   * Creates a tile.
   * 
   * @param {ITileArguments} args An object that has
   *     information about the tile being created.
   */
  constructor({ grid, coordinates }: ITileArguments) {
    this.coordinates = coordinates;
    this.grid = grid;
    this.draw();
  }

  draw() {
    var grid = this.grid;
    var ctx = grid.ctx;
    var tileSide = grid.tileSide;
    var leftMargin = grid.leftMargin;
    var topMargin = grid.topMargin;
    var boundingSquare = this.coordinates.toScreen();
    ctx.fillRect(boundingSquare.left, boundingSquare.top, boundingSquare.horizontalSize, boundingSquare.verticalSize);
    ctx.strokeRect(boundingSquare.left, boundingSquare.top, boundingSquare.horizontalSize, boundingSquare.verticalSize);
  }
}