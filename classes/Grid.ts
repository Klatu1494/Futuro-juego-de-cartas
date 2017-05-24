/**
 * @fileoverview Contains the Grid class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * A set of tiles aligned in rows and columns.
 * @class
 */
class Grid {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  tileSide: number;
  topMargin: number;
  leftMargin: number;
  tiles: Array<Array<Tile>>;
  relatedTileClass: Function;
  /**
   * Creates a grid
   * @param {GridArguments} args An object that has
   *     information about the grid being created.
   */
  constructor(args: GridArguments) {
    //TODO: replace arrays but the not yet implemented fixed length arrays
    var { width, height, canvas, tileSide, leftMargin, topMargin } = args;
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
    var topleft: ScreenCoordinates = new ScreenCoordinates(this.leftMargin, this.topMargin);
    return new Rectangle(topleft, this.width * this.tileSide, this.height * this.tileSide);
  }

  /**
   * Adds a tile to the grid in the specified position.
   * @param {Tile} tile An object that has
   */
  addTile(tile: Tile) {
    this.tiles[tile.coordinates.x][tile.coordinates.y] = tile;
  }
}