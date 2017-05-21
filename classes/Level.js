class Level {
	constructor(args) {
		var {
			width,
			height,
			against
		} = args;
		this.width = width;
		this.height = height;
		this.units = new Set();
		this.against = against;
	}
}