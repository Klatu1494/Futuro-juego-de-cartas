/**
 * @fileoverview Contains the MatchTile class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A class.
 * @class
 */
class MatchTile extends Tile {
  /**
   * Creates a tile that will belong to the formation editor grid
   * @typedef {Object} FormationEditorTileArgs
   * @property {TileCoordinates} coordinates This tile
   *     coordinates, relative to the grid it belongs to.
   * @property {Grid} grid The grid that the tile belongs to.
   * @property {Unit} unit The unit that the 
   *     tile is containing. Defaults to null.
   * 
   * @param {FormationEditorTileArgs} args An object that has
   *     information about the tile being created.
   */
  constructor(args) {
    if (grid instanceof Grid && (unit === null || unit instanceof UnitType)) {
      //TODO: implement terrain/building features
      super(args);
      //I should destruct args when it more parameters
      this.unit = args.unit;
      this.draw();
    } else throw new Error();
  }
}