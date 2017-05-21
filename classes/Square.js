class Square {
  constructor(args) {
    var {
      coordinates1,
      coordinates2,
      side,
    } = args;
    if (!(coordinates1 instanceof Coordinates)) throw new Error();
    else if (0 < side && isFinite(side)) {
      this.topLeftCoordinates = new Coordinates(coordinates1.x, coordinates1.y); //in case that we want to modify coordinates1 later;
      this.bottomRightCoordinates = new Coordinates(coordinates1.x + side, coordinates1.y + side);
      this.width = side;
      this.height = side;
    } else if (coordinates2 instanceof Coordinates) {
      this.topLeftCoordinates = new Coordinates(Math.min(coordinates1.x, coordinates2.x), Math.min(coordinates1.y, coordinates2.y));
      this.bottomRightCoordinates = new Coordinates(Math.max(coordinates1.x, coordinates2.x), Math.max(coordinates1.y, coordinates2.y));
      var width = this.bottomRightCoordinates.x - this.topLeftCoordinates.x;
      var height = this.bottomRightCoordinates.x - this.topLeftCoordinates.x;
      if (width === height) {
        this.width = width;
        this.height = height;
      } else throw new Error();
    } else throw new Error();
  }

  contains(coordinates) {
    return this.topLeftCoordinates.x <= coordinates.x &&
      coordinates.x <= this.bottomRightCoordinates.x &&
      this.topLeftCoordinates.y <= coordinates.y &&
      coordinates.y <= this.bottomRightCoordinates.y;
  }
}