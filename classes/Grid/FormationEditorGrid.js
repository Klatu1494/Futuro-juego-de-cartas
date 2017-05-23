/**
 * @fileoverview Contains the FormationEditorGrid class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A grid used by the formation editor.
 * @class
 */
class FormationEditorGrid extends Grid {
  /**
   * Creates a grid
   * @typedef {Object} FormationEditorGridArgs
   * @property {number} height The grid's height in tiles. It must be positive.
   * @property {number} width The grid's width in tiles. It must be positive.
   * @property {number} leftMargin The grid's left margin in pixels.
   * @property {number} topMargin The grid's top margin in pixels.
   * @property {number} tileSide The length of each of the
   *     grid's tiles' side in pixels. It must be positive.
   *
   * @param {FormationEditorGridArgs} args An object that has
   *     information about the grid being created.
   */
  constructor(args) {
    //TODO: replace arrays but the not yet implemented fixed length arrays
    args.canvas = document.getElementById('formation-editor-tiles-canvas');
    super(args);
  }

  /**
   * Adds a tile to the grid in the specified position.
   * @param {FormationEditorTile} tile An object that has
   */
  addTile(tile) {
    this.tiles[tile.coordinates.x][tile.coordinates.y] = tile;
  }
}

window.addEventListener(
  'load',
  () => FormationEditorGrid.prototype.relatedTileClass = FormationEditorTile
);