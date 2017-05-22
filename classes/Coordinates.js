/**
 * @fileoverview Contains the Coordinates class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A 2D pair of coordinates.
 * @class
 */
class Coordinates {
  /**
   * Creates a pair of coordinates.
   * @param {number} x The value of the first coordinate. It must be positive.
   * @param {number} y The value of the second coordinate. It must be positive.
   */
  constructor(x, y) {
    if (0 <= x && isFinite(x) && 0 <= y && isFinite(y)) {
      this.x = x;
      this.y = y;
      this.args = arguments;
    } else throw new Error();
  }

  /**
   * Clones and returns this coordinates
   * @return {Coordinates} a copy of this coordinates
   */
  clone() {
    return new this.constructor(...this.args);
  }
}