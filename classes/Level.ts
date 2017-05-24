/**
 * @fileoverview Contains the Level class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * An object that contains information about a given level.
 * @class
 */
class Level {
  width: number;
  height: number;
  units: Set<Unit>;

  /**
   * Creates a level
   * @typedef {Object} LevelArgs
   * @property {number} height The height's
   *     height in tiles. It must be positive.
   * @property {number} width The level's width in tiles. It must be positive.
   * @property {string} against The controller of the second player.
   * 
   * @param {LevelArgs} args An object that has
   *     information about the level being created.
   */
  constructor(args) {
    var {
      width,
      height,
      against
    } = args;
    this.width = width;
    this.height = height;
    this.units = new Set();
  }
}