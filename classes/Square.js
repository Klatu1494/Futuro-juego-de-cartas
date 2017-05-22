/**
 * Represents a square
 */
class Square {
  /**
   * Initializes a new Square given the topleft coordinates and the length of a side.
   * @param {Coordinates} topLeftCoordinates Top-left coordinates
   * @param {number} sideLength Length of any side
   */
  constructor(topLeftCoordinates, sideLength) {
    if (!(topLeftCoordinates instanceof ScreenCoordinates)) throw new Error("topLeftCoordinates must be ScreenCoordinates");

    else if (0 < sideLength && isFinite(sideLength)) {
      this.topLeft = new Coordinates(topLeftCoordinates.x, topLeftCoordinates.y); //in case that we want to modify coordinates1 later;
      this.sideLength = sideLength;
      this.bottomRight = this.calculateBottomRight();
      this.center = new ScreenCoordinates((this.left + this.right) / 2, (this.top + this.bottom) / 2);
    } else throw new Error("Side length must be a positive number");
  }

  /**
   * Gets the location of the left edge.
   * @type {number}
   */
  get left() {
    return this.topLeft.x;
  }

  /**
   * Gets the location of the top edge.
   * @type {number}
   */
  get top() {
    return this.topLeft.y;
  }

  /**
   * Gets the location of the right edge.
   * @type {number}
   */
  get right() {
    return this.bottomRight.x;
  }

  /**
   * Gets the location of the bottom edge.
   * @type {number}
   */
  get bottom() {
    return this.bottomRight.y;
  }

  /**
   * Computes the coordinates of the bottom right point from the values of topLeft and sideLength.
   * @return {Coordinates}
   */
  calculateBottomRight() {
    return new Coordinates(this.topLeft.x + this.sideLength, this.topLeft.y + this.sideLength);
  }

  /**
   * Determines wheter a specified point is insite this square.
   * This method includes the edge of the square.
   * @param {Coordinates} coordinates 
   * @return {bool} true when the specified point is inside the square.
   */
  contains(coordinates) {
    return this.left <= coordinates.x &&
      coordinates.x <= this.right &&
      this.top <= coordinates.y &&
      coordinates.y <= this.bottom;
  }
}