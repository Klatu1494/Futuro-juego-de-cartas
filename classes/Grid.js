/**
 * @fileoverview Contains the Grid class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * A set of tiles aligned in rows and columns.
 * @class
 */
class Grid {
  /**
   * Creates a grid
   * @typedef {Object} GridArgs
   * @property {HTMLCanvasElement} canvas The canvas
   *     element where the grid will be drawn.
   * @property {number} height The grid's height in tiles. It must be positive.
   * @property {number} width The grid's width in tiles. It must be positive.
   * @property {number} leftMargin The grid's left margin in pixels.
   * @property {number} topMargin The grid's top margin in pixels.
   * @property {number} tileSide The length of each of the
   *     grid's tiles' side in pixels. It must be positive.
   *
   * @param {GridArgs} args An object that has
   *     information about the grid being created.
   */
  constructor(args) {
    //TODO: replace arrays but the not yet implemented fixed length arrays
    var {
      width,
      height,
      canvas,
      tileSide,
      topMargin,
      leftMargin
    } = args;
    this.tiles = [];
    for (var i = 0; i < width; i++) this.tiles.push([]);
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d');
    this.tileSide = tileSide;
    this.topMargin = topMargin;
    this.leftMargin = leftMargin;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Gets a rectangle that represents the grid area
   * @return Rectangle
   */
  getGridArea() {
    var topleft = new ScreenCoordinates(this.leftMargin, this.topMargin);
    return new Rectangle(topleft, this.width * this.tileSide, this.height * this.tileSide);
  }

  /**
   * Adds a tile to the grid in the specified position.
   * @param {Tile} tile An object that has
   */
  addTile(tile) {
    this.tiles[tile.coordinates.x][tile.coordinates.y] = tile;
  }
}