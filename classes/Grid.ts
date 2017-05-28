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
  private _topPadding: number;
  private _leftPadding: number;
  private _canvas: HTMLCanvasElement;
  protected _tiles: ReadonlyArray<ReadonlyArray<Tile>>;
  /**
   * Creates a grid
   * @param {GridArguments} args An object that has
   *     information about the grid being created.
   */
  constructor({ width, height, canvas, tileSide, leftPadding, topPadding }: IGridArguments) {
    this._canvas = canvas;
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d');
    this.tileSide = tileSide;
    this._topPadding = topPadding;
    this._leftPadding = leftPadding;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Gets a rectangle that represents the grid area
   * @return Rectangle
   */
  getGridArea() {
    return new Rectangle(
      new ScreenCoordinates(this.leftMargin + this.leftPadding, this.topMargin + this.topPadding),
      this.width * this.tileSide,
      this.height * this.tileSide
    );
  }

  get tiles(): ReadonlyArray<ReadonlyArray<Tile>> {
    return this._tiles;
  }

  get leftPadding() {
    return this._leftPadding;
  }

  get topPadding() {
    return this._topPadding;
  }

  get leftMargin(): number {
    return this._canvas.getBoundingClientRect().left;
  }

  get topMargin(): number {
    return this._canvas.getBoundingClientRect().top;
  }

  draw() {
    for (var array of this.tiles) for (var tile of array) tile.draw()
  }
}