/**
 * @fileoverview Contains the MatchGrid class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A grid used by the match screen.
 * @class
 */
class MatchGrid extends Grid {
  /**
   * Creates a grid
   * @typedef {Object} MatchGridArgs
   * @property {number} height The grid's height in tiles. It must be positive.
   * @property {number} width The grid's width in tiles. It must be positive.
   * @property {number} leftMargin The grid's left margin in pixels.
   * @property {number} topMargin The grid's top margin in pixels.
   * @property {number} tileSide The length of each of the
   *     grid's tiles' side in pixels. It must be positive.
   *
   * @param {MatchGridArgs} args An object that has
   *     information about the grid being created.
   */
  constructor(args: NoCanvasGridArguments) {
    var completeArgs: GridArguments = args.setCanvas(<HTMLCanvasElement>document.getElementById('formation-editor-tiles-canvas'));
    super(completeArgs);
  }

  /**
   * Adds a tile to the grid in the specified position.
   * @param {MatchTile} tile An object that has
   */
  addTile(tile: MatchTile) {
    this.tiles[tile.coordinates.x][tile.coordinates.y] = tile;
  }
}