class Grid {
  constructor(args) {
    var {
      width,
      height,
      canvas,
      tileSide,
      topMargin,
      leftMargin
    } = args;
    this.tiles = []; //replace with fixed length array when implemented
    for (var i = 0; i < width; i++) this.tiles.push([]); //replace with fixed length array when implemented
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d');
    this.tileSide = tileSide;
    this.topMargin = topMargin;
    this.leftMargin = leftMargin;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  addTile(tile, x, y) {
    this.tiles[x][y] = tile;
  }
}