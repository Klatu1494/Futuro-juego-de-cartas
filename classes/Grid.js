class Grid {
  constructor(width, height) {
    this.tiles = []; //replace with fixed length array when implemented
    for (var i = 0; i < width; i++) this.tiles.push([]); //replace with fixed length array when implemented
    this.width = width;
    this.height = height;
  }

  addTile(tile, x, y) {
    this.tiles[x][y] = tile;
  }
}