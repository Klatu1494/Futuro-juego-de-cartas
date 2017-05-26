/**
 * @fileoverview Contains the FormationEditorGrid class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A grid used by the formation editor.
 * @class
 */
class FormationEditorGrid extends Grid {
  protected _tiles: ReadonlyArray<ReadonlyArray<FormationEditorTile>>;
  /**
   * Creates a grid
   *
   * @param {IGridArguments} args An object that has
   *     information about the grid being created.
   */
  constructor(args: IGridArguments) {
    var tiles: Array<Array<FormationEditorTile>> = [];
    super(args);
    for (var i: number = 0; i < this.width; i++) {
      var array: Array<FormationEditorTile> = []
      for (var j: number = 0; j < this.height; j++)
        array.push(new FormationEditorTile({
          grid: this,
          coordinates: new TileCoordinates(i, j, this)
        }));
      tiles.push(array);
    }
    this._tiles = tiles;
    this.draw();
  }

  get tiles(): ReadonlyArray<ReadonlyArray<FormationEditorTile>> {
    return this._tiles;
  }
}