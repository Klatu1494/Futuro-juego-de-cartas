/**
 * @fileoverview Contains the Grid class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * A set of tiles aligned in rows and columns.
 * @class
 */
abstract class Grid {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  tileSide: number;
  topMargin: number;
  leftMargin: number;
  protected _tiles: ReadonlyArray<ReadonlyArray<Tile>>;
  relatedTileClass: Function;
  /**
   * Creates a grid
   * @param {GridArguments} args An object that has
   *     information about the grid being created.
   */
  constructor(args: IGridArguments) {
    //TODO: replace arrays but the not yet implemented fixed length arrays
    var { width, height, canvas, tileSide, leftMargin, topMargin, canvas } = args;
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
    var topleft: ScreenCoordinates = new ScreenCoordinates(this.leftMargin, this.topMargin);
    return new Rectangle(topleft, this.width * this.tileSide, this.height * this.tileSide);
  }

  get tiles(): ReadonlyArray<ReadonlyArray<Tile>> {
    return this._tiles;
  }

  draw() {
    for (var array of this.tiles) for (var tile of array) tile.draw()
  }
}