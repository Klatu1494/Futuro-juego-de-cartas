/**
 * @fileoverview Contains the MatchGrid class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A grid used by the match screen.
 * @class
 */
class MatchGrid extends Grid {
  protected _tiles: Array<Array<MatchTile>>;
  /**
   * Creates a grid
   *
   * @param {IGridArguments} args An object that has
   *     information about the grid being created.
   */
  constructor(args: IGridArguments) {
    var tiles: Array<Array<MatchTile>> = [];
    super(args);
    for (var i: number = 0; i < this.width; i++) {
      var array: Array<MatchTile> = []
      for (var j: number = 0; j < this.height; j++)
        array.push(new MatchTile({
          grid: this,
          coordinates: new TileCoordinates(i, j, this)
        }));
      tiles.push(array);
    }
    this._tiles = tiles;
    this.draw();
  }

  get tiles(): ReadonlyArray<ReadonlyArray<MatchTile>> {
    return this._tiles;
  }
}