class Square() {
  constructor(args) {
    var {
      coordinates1,
      coordinates2,
      width,
      height,
    } = args;
    if (!(coordinates1 instanceof Coordinates)) throw new Error();
    if (coordinates2 instanceof Coordinates) {
      this.topLeftCoordinates = new Coordinates(Math.min(coordinates1.x, coordinates2.x), Math.min(coordinates1.y, coordinates2.y));
      this.bottomRightCoordinates = new Coordinates(Math.max(coordinates1.x, coordinates2.x), Math.max(coordinates1.y, coordinates2.y));
      this.width = this.bottomRightCoordinates.x + this.topLeftCoordinates.x;
      this.height = this.bottomRightCoordinates.x + this.topLeftCoordinates.x;
    }
  }

  contains(coordinates) {
    return this.topLeftCoordinates.x <= coordinates.x &&
      coordinates.x <= this.bottomRightCoordinates.x &&
      this.topLeftCoordinates.y <= coordinates.x &&
      coordinates.y <= this.bottomRightCoordinates.y;
  }
}