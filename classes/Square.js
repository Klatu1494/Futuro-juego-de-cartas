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
   */
  get left() {
    return this.topLeft.x;
  }

  /**
   * Gets the location of the top edge.
   */
  get top() {
    return this.topLeft.y;
  }

  /**
   * Gets the location of the right edge.
   */
  get right() {
    return this.left + this.sideLength;
  }

  /**
   * Gets the location of the bottom edge.
   */
  get bottom() {
    return this.top + this.sideLength;
  }


  /**
   * TODO
   * @param {Coordinates} coordinates 
   */
  contains(coordinates) {
    return this.topLeftCoordinates.x <= coordinates.x &&
      coordinates.x <= this.bottomRightCoordinates.x &&
      this.topLeftCoordinates.y <= coordinates.y &&
      coordinates.y <= this.bottomRightCoordinates.y;
  }
}