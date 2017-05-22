/**
 * Represents a square
 */
class Square extends Rectangle {
  /**
   * Initializes a new Square given the topleft coordinates and the length of a side.
   * @param {Coordinates} topLeftCoordinates Top-left coordinates
   * @param {number} sideLength Length of any side
   */
  constructor(topLeftCoordinates, sideLength) {
    super(topLeftCoordinates, sideLength, sideLength)
  }
}