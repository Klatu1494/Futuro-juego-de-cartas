/**
 * Represents a square
 */
class Square {
  /**
   * Initializes a new Square given the topleft coordinates and the length of a side.
   * @param {Coordinates} coordinatesTopLeft Top-left coordinates
   * @param {number} sideLength Length of any side
   */
  constructor(coordinatesTopLeft, sideLength) {
    if (!(coordinatesTopLeft instanceof Coordinates)) throw new Error("CoordinatesTopLeft must be Coordinates");

    else if (0 < sideLength && isFinite(sideLength)) {
      this.topLeft = new Coordinates(coordinatesTopLeft.x, coordinatesTopLeft.y); //in case that we want to modify coordinates1 later;
      this.sideLength = sideLength;
    } else throw new Error("Side length must be non negative and finite");
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
    return this.left + this.sideLength;
  }

  /**
   * Gets the location of the bottom edge.
   * @type {number}
   */
  get bottom() {
    return this.top + this.sideLength;
  }

  /**
   * Gets the coordinates of the bottom right point.
   * @type {Coordinates}
   */
  get bottomRight() {
    return new Coordinates(this.right, this.bottom);
  }

  /**
   * Determines wheter a specified point is insite this square.
   * This method includes the edge of the square.
   * @param {Coordinates} coordinates 
   * @return {bool} true when the specified point is inside the square.
   */
  contains(coordinates) {
    return this.topLeftCoordinates.x <= coordinates.x &&
      coordinates.x <= this.bottomRightCoordinates.x &&
      this.topLeftCoordinates.y <= coordinates.y &&
      coordinates.y <= this.bottomRightCoordinates.y;
  }
}