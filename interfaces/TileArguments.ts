/**
 * @fileoverview Contains the TileArguments interface declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The objects that implement this interface contain
 * the necessary information to create a tile.
 * @interface
 */
interface TileArguments {
  grid: Grid;
  coordinates: TileCoordinates;
}