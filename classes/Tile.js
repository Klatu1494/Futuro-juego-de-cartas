/**
 * @fileoverview Contains the Tile class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * A grid tile
 * @class
 */
class Tile {
  /**
   * Creates a tile
   * @typedef {Object} TileArgs
   * @property {TileCoordinates} coordinates This tile
   *     coordinates, relative to the grid it belongs to.
   * @property {Grid} grid The grid that the tile belongs to.
   * @property {Unit} unit The unit that the 
   *     tile is containing. Defaults to null.
   * 
   * @param {TileArgs} args An object that has
   *     information about the tile being created.
   */
  constructor(args) {
    var {
      grid,
      unit = null,
      coordinates
    } = args;
    if (grid instanceof Grid && (unit === null || unit instanceof Unit)) {
      this.unit = unit;
      this.coordinates = coordinates;
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
    var boundingSquare = this.coordinates.toScreen();
    ctx.fillRect(boundingSquare.left, boundingSquare.top, boundingSquare.horizontalSize, boundingSquare.verticalSize);
    ctx.strokeRect(boundingSquare.left, boundingSquare.top, boundingSquare.horizontalSize, boundingSquare.verticalSize);
  }
}