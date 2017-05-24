/**
 * @fileoverview Contains the FormationEditorTile class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A tile that belongs to the formation editor grid.
 * @class
 */
class FormationEditorTile extends Tile {
  unitType: UnitType;
  /**
   * Creates a tile that will belong to the formation editor grid
   * @typedef {Object} FormationEditorTileArgs
   * @property {TileCoordinates} coordinates This tile
   *     coordinates, relative to the grid it belongs to.
   * @property {Grid} grid The grid that the tile belongs to.
   * @property {UnitType} unitType The type of the unit
   *     that the tile will contain. Defaults to null.
   * 
   * @param {FormationEditorTileArgs} args An object that has
   *     information about the tile being created.
   */
  constructor(tileArgs: TileArguments, content?: { unitType: UnitType }) {
    super(tileArgs);
    content = content || { unitType: null };
    //I should destruct args when it more parameters (if it ever happens)
    this.unitType = content.unitType;
  }
}