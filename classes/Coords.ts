/**
 * @fileoverview Contains the Coordinates class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A 2D pair of coordinates.
 * @class
 */
class Coords { //can't be named Coordinates because of the TS Coordinates class
  private _x: number;
  private _y: number;
  /**
   * Creates a pair of coordinates.
   * @param {number} x The value of the first coordinate. It must be positive.
   * @param {number} y The value of the second coordinate. It must be positive.
   */
  constructor(x: number, y: number) {
    if (0 <= x && 0 <= y) {
      this._x = x;
      this._y = y;
    } else throw new Error();
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  clone() {
    var coordsBeingCloned: Coords = this;
    var clone: Coords = Object.create(Object.getPrototypeOf(coordsBeingCloned));
    Object.getOwnPropertyNames(coordsBeingCloned).forEach(function (key) {
      var desc = Object.getOwnPropertyDescriptor(coordsBeingCloned, key);
      Object.defineProperty(clone, key, desc);
    });
    return clone;
  }
}