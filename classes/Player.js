class Player {
	constructor(controller, color) {
		this.color = color;
		this._controller = controller;
		this._deckTemplate = JSON.parse(window.localStorage.getItem('deck'));
	}

	startGame() {
		this.deck = [];
		for (var cardType in this.deckTemplate)
			for (var i = 0; i < this.deckTemplate[cardType]; i++) {
				this.deck.push(cardType);
			}
	}

	get controller() {
		return this._controller;
	}

	set controller(value) {
		if (value === AI || value === HUMAN || value === null) this._controller = value;
		else throw new Error();
	}

	get deckTemplate() {
		return this._deckTemplate;
	}

	set deckTemplate(value) {
		window.localStorage.setItem(this.color + 'Deck', JSON.stringify(value));
		this._deckTemplate = value;
	}
}