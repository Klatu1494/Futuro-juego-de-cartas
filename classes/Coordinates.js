class Coordinates() {
  constructor(x, y) {
    if (0 <= x && isFinite(x) && 0 <= y && isFinite(y)) {
      this.x = x;
      this.y = y;
    }
  }
}