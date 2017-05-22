class Tile {
  constructor(args) {
    var {
      side,
      unit = null
    } = args;
    if (side > 0 && isFinite(side) && (unit instanceof Unit || unit === null)) {
      this.side = side;
      this.unit = unit;
    } else throw new Error();
  }
}