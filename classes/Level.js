class Level {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.units = new Set();
		this.against = HUMAN;
	}
}