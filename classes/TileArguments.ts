/**
 * @fileoverview Contains the TileArguments class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A class whose objects contain the necessary information to create a tile.
 * @class
 */
class TileArguments {
  grid: Grid;
  coordinates: TileCoordinates;
  /**
   * Creates an object that contains the necessary information to create a tile.
   */
  constructor({ grid, coordinates }: { grid: Grid, coordinates: TileCoordinates }) {
    this.grid = grid;
    this.coordinates = coordinates;
  }
}