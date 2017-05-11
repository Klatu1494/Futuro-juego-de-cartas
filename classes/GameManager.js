class GameManager {
	static async onload() {
		document.getElementById('loading-screen').style.height = HEIGHT + 'px';
		document.getElementById('loading-screen').style.lineHeight = HEIGHT + 'px';
		document.getElementById('loading-screen').style.width = WIDTH + 'px';
		await this.executeMenuFunction(async function() {
			//load unit images
			var promises = new Set();
			for (var unitType of UNIT_TYPES) promises.add(this.loadImage(unitType));
			//set the HTML constants-dependent style
			var boardHeight = HAND_POSITION === 'bottom' ? HEIGHT - HAND_HEIGHT_OR_WIDTH : HEIGHT;
			var boardStyle = document.getElementById('board').style;
			var boardWidth = HAND_POSITION === 'bottom' ? WIDTH : WIDTH - HAND_HEIGHT_OR_WIDTH;
			var gameStyle = document.getElementById('game').style;
			var handStyle = document.getElementById('hand').style;
			var tilesCanvas = document.getElementById('tilesCanvas');
			var tilesCtx = tilesCanvas.getContext('2d');
			var cardAdder = document.getElementById('card-adder');
			this.show('menu');
			boardStyle.height = boardHeight + 'px';
			boardStyle.width = boardWidth + 'px';
			gameStyle.height = HEIGHT + 'px';
			gameStyle.width = WIDTH + 'px';
			handStyle.height = (HAND_POSITION === 'bottom' ? HAND_HEIGHT_OR_WIDTH : HEIGHT) + 'px';
			handStyle.width = (HAND_POSITION === 'bottom' ? WIDTH : HAND_HEIGHT_OR_WIDTH) + 'px';
			tilesCanvas.height = boardHeight;
			tilesCanvas.width = boardWidth;
			tilesCtx.fillStyle = TILE_BACKGROUND_COLOR;
			tilesCtx.strokeStyle = TILE_BORDER_COLOR;
			tilesCtx.lineWidth = TILE_BORDER_WIDTH;
			//create remaining HTML elements
			for (var action of ACTIONS) {
				var div = document.createElement('div');
				var addButton = document.createElement('div');
				var takeOutButton = document.createElement('div');
				var func = action.onplay;
				addButton.className = 'add';
				takeOutButton.className = 'take-out';
				div.appendChild(document.createTextNode(action.name));
				div.appendChild(addButton);
				div.appendChild(takeOutButton);
				div.className = 'action';
				addButton.addEventListener('click', function() {
					this.currentDeckTemplate.set(func, this.currentDeckTemplate.get(func))
				}.bind(this));
				cardAdder.appendChild(div);
			}
			//add event listeners
			document.getElementById('play-button').addEventListener('click', async function() {
				await this.executeMenuFunction(async function() {
					await this.newMatch(LEVELS[this.currentLevel]);
					this.show('play-mode');
				})
			}.bind(this));
			document.getElementById('deck-editor-button').addEventListener('click', async function() {
				await this.executeMenuFunction(async function() {
					this.resolve(this.deck);
				});
			}.bind(this));
			//if it is the first time the user opens the game or the user deleted the save file, create a save file	
			var savedGame = window.localStorage.getItem('savedGame');
			if (savedGame === undefined || savedGame === 'null') {
				window.localStorage.setItem('deck', JSON.stringify({}));
				window.localStorage.setItem('currentLevel', JSON.stringify(0));
				window.localStorage.setItem('savedGame', 'true');
			}
			//create the first player
			this.firstPlayer = new Player(HUMAN, FIRST_COLOR);
			this.secondPlayer = new Player(null, SECOND_COLOR);
			this.currentLevel = window.localStorage.getItem('savedGame') ? parseInt(window.localStorage.getItem('currentLevel')) : 0;
			//assign images to unit types
			await this.assignImages(promises);
		});
	}

	static show(id) {
		for (var child of document.getElementById('game').children) child.style.display = 'none';
		document.getElementById(id).style.display = 'flex';
	}

	static getResolver(resolve) {
		this.resolve = resolve;
	}

	static async askForDeck(versusHuman) {
		this.currentPromise = new Promise(this.getResolver.bind(this));
		await this.executeMenuFunction(async function() {
			this.show('deck-editor');
		});
		return this.currentPromise;
	}

	static async askForFormation(versusHuman) {
		this.currentPromise = new Promise(this.getResolver.bind(this));
		await this.executeMenuFunction(async function() {
			this.show('formation-editor');
		});
		return this.currentPromise;
	}

	static async newMatch(level) {
		var canvas = document.getElementById('tilesCanvas');
		var ctx = canvas.getContext('2d');
		var pressedEscOnFirstAsk = false;
		var action;
		this.levelWidth = level.width;
		this.levelHeight = level.height;
		this.tileSide = Math.min(canvas.width / level.width, canvas.height / level.height);
		this.leftMargin = (canvas.width - this.tileSide * level.width) / 2;
		this.topMargin = (canvas.height - this.tileSide * level.height) / 2;
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		for (var i = 0; i < level.width; i++)
			for (var j = 0; j < level.height; j++) {
				ctx.fillRect(this.leftMargin + this.tileSide * i, this.topMargin + this.tileSide * j, this.tileSide, this.tileSide);
				ctx.strokeRect(this.leftMargin + this.tileSide * i, this.topMargin + this.tileSide * j, this.tileSide, this.tileSide);
			}
		this.firstPlayerTurn = Boolean(Math.floor(Math.random() * 2));
		this.firstPlayer.deckTemplate = null;
		this.secondPlayer.deckTemplate = null;
		this.firstPlayer.formation = null;
		this.secondPlayer.formation = null;
		if (level.against === HUMAN) {
			while (!(this.firstPlayer.deckTemplate && this.secondPlayer.deckTemplate /*&& this.firstPlayer.formation && this.secondPlayer.formation*/ || pressedEscOnFirstAsk)) {
				action = await this.askForDeck(true) || new DeckTemplate();
				if (action instanceof DeckTemplate) this.firstPlayer.deckTemplate = action;
				else pressedEscOnFirstAsk = true;
				/*while (!(this.firstPlayer.deckTemplate && this.secondPlayer.deckTemplate && this.firstPlayer.formation && this.secondPlayer.formation || pressedEscOnFirstAsk)) {
					action = await this.askForFormation(true);
					if (action instanceof DeckTemplate) this.firstPlayer.formation = action;
					else pressedEscOnFirstAsk = true;*/
				while (!(this.firstPlayer.deckTemplate && this.secondPlayer.deckTemplate /*&& this.firstPlayer.formation && this.secondPlayer.formation*/ || pressedEscOnFirstAsk)) {
					action = await this.askForDeck(true) || new DeckTemplate();
					if (action instanceof DeckTemplate) this.secondPlayer.deckTemplate = action;
					else pressedEscOnFirstAsk = true;
					/*while (!(this.firstPlayer.deckTemplate && this.secondPlayer.deckTemplate && this.firstPlayer.formation && this.secondPlayer.formation || pressedEscOnFirstAsk)) {
						action = await this.askForFormation(true);
						if (action instanceof DeckTemplate) this.firstPlayer.formation = action;
						else pressedEscOnFirstAsk = true;
					}*/
				}
				/*}*/
			}
		} else if (level.against === PLAYER) {
			while (!(this.firstPlayer.deckTemplate && this.firstPlayer.formation || pressedEscOnFirstAsk)) {
				this.firstPlayer.deckTemplate = await this.askForDeck(false);
				pressedEscOnFirstAsk = !this.firstPlayer.deckTemplate.empty();
				while (!(this.firstPlayer.deckTemplate && this.firstPlayer.formation || pressedEscOnFirstAsk)) {
					this.firstPlayer.formationTemplate = await this.askForFormation(false);
				}
			}
		}
		this.firstPlayer.startGame(level.height - 1, 1);
		this.firstPlayer.startGame(0, -1);
	}

	static async executeMenuFunction(asyncFunc) {
		document.getElementById('game').style.display = 'none';
		document.getElementById('loading-screen').style.display = 'block';
		await asyncFunc.bind(this)();
		document.getElementById('loading-screen').style.display = 'none';
		document.getElementById('game').style.display = 'block';
	}

	static loadImage(unitType) {
		return new Promise(resolve => {
			var image = document.createElement('img');
			image.src = unitType.imageSrc;
			image.addEventListener('load', () => resolve({
				unitType: unitType,
				image: image
			}));
		});
	}

	static async assignImages(promises) {
		var object;
		for (var promise of promises) {
			object = await promise;
			object.unitType.image = object.image;
		}
	}
}