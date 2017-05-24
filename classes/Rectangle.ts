/**
 * Represents a rectangle
 */
class Rectangle {
  topLeft: Coords;
  bottomRight: Coords;
  horizontalSize: number;
  verticalSize: number;
  center: Coords;
  /**
   * Initializes a new Square given the topleft coordinates and the length of a side.
   * @param {Coordinates} topLeftCoordinates Top-left coordinates.
   * @param {number} horizontalSize the X size.
   * @param {number} verticalSize the Y size.
   */
  constructor(topLeftCoordinates: Coords, horizontalSize: number, verticalSize: number) {
    if (0 < horizontalSize && 0 < verticalSize && isFinite(horizontalSize + verticalSize)) {
      this.topLeft = topLeftCoordinates.clone() //in case that we want to modify topLeftCoordinates later;
      this.horizontalSize = horizontalSize;
      this.verticalSize = verticalSize;
      this.bottomRight = new Coords(this.topLeft.x + this.horizontalSize, this.topLeft.y + this.verticalSize);
      this.center = new Coords((this.left + this.right) / 2, (this.top + this.bottom) / 2);
    } else throw new Error("Invalid size");
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
   * Determines wheter a specified point is insite this square.
   * This method includes the edge of the square.
   * @param {Coordinates} coordinates 
   * @return {bool} true when the specified point is inside the square.
   */
  contains(coordinates: Coords) {
    return this.left <= coordinates.x &&
      coordinates.x <= this.right &&
      this.top <= coordinates.y &&
      coordinates.y <= this.bottom;
  }
}