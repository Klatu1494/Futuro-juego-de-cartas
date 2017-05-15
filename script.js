window.addEventListener('load', async function() {
	var currentResolver, currentDeck, currentPromise, levelWith, levelHeight, tileSide, leftMargin, topMargin, firstPlayerTurn, firstPlayer, secondPlayer, currentLevel, currentDeckTemplate;

	function show(id) {
		for (var child of document.getElementById('game').children) child.style.display = 'none';
		document.getElementById(id).style.display = 'flex';
	}

	function getResolver(resolve) {
		currentResolver = resolve;
	}

	async function askForDeck(versusHuman) {
		currentPromise = new Promise(getResolver);
		await executeMenuFunction(async function() {
			show('deck-editor');
		});
		return currentPromise;
	}

	async function askForFormation(versusHuman) {
		currentPromise = new Promise(getResolver);
		await executeMenuFunction(async function() {
			show('formation-editor');
		});
		return currentPromise;
	}

	async function newMatch(level) {
		var canvas = document.getElementById('tilesCanvas');
		var ctx = canvas.getContext('2d');
		var pressedEscOnFirstAsk = false;
		var action;
		levelWidth = level.width;
		levelHeight = level.height;
		tileSide = Math.min(canvas.width / level.width, canvas.height / level.height);
		leftMargin = (canvas.width - tileSide * level.width) / 2;
		topMargin = (canvas.height - tileSide * level.height) / 2;
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		for (var i = 0; i < level.width; i++)
			for (var j = 0; j < level.height; j++) {
				ctx.fillRect(leftMargin + tileSide * i, topMargin + tileSide * j, tileSide, tileSide);
				ctx.strokeRect(leftMargin + tileSide * i, topMargin + tileSide * j, tileSide, tileSide);
			}
		firstPlayerTurn = Boolean(Math.floor(Math.random() * 2));
		firstPlayer.deckTemplate = null;
		secondPlayer.deckTemplate = null;
		firstPlayer.formation = null;
		secondPlayer.formation = null;
		if (level.against === HUMAN) {
			while (!(this.firstPlayer.formation && this.secondPlayer.formation || pressedEscOnFirstAsk)) {
				action = await askForDeck(true) || new DeckTemplate();
				if (action instanceof DeckTemplate) firstPlayer.deckTemplate = action;
				else pressedEscOnFirstAsk = true;
				while (!(this.firstPlayer.formation && this.secondPlayer.formation || pressedEscOnFirstAsk)) {
					action = await askForDeck(true) || new DeckTemplate();
					if (action instanceof DeckTemplate) secondPlayer.deckTemplate = action;
					else pressedEscOnFirstAsk = true;
				}
			}
		} else if (level.against === PLAYER) {
			while (!(firstPlayer.deckTemplate && firstPlayer.formation || pressedEscOnFirstAsk)) {
				firstPlayer.deckTemplate = await askForDeck(false);
				pressedEscOnFirstAsk = !firstPlayer.deckTemplate.empty();
				while (!(firstPlayer.deckTemplate && firstPlayer.formation || pressedEscOnFirstAsk)) {
					firstPlayer.formationTemplate = await askForFormation(false);
				}
			}
		}
		firstPlayer.startGame(level.height - 1, 1);
		firstPlayer.startGame(0, -1);
	}

	async function executeMenuFunction(asyncFunc) {
		document.getElementById('game').style.display = 'none';
		document.getElementById('loading-screen').style.display = 'block';
		await asyncFunc();
		document.getElementById('loading-screen').style.display = 'none';
		document.getElementById('game').style.display = 'block';
	}

	function loadImage(unitType) {
		return new Promise(resolve => {
			var image = document.createElement('img');
			image.src = unitType.imageSrc;
			image.addEventListener('load', () => resolve({
				unitType: unitType,
				image: image
			}));
		});
	}

	async function assignImages(promises) {
		var object;
		for (var promise of promises) {
			object = await promise;
			object.unitType.image = object.image;
		}
	}

	document.getElementById('loading-screen').style.height = HEIGHT + 'px';
	document.getElementById('loading-screen').style.lineHeight = HEIGHT + 'px';
	document.getElementById('loading-screen').style.width = WIDTH + 'px';
	await executeMenuFunction(async function() {
		//load unit images
		var promises = new Set();
		for (var unitType of UNIT_TYPES) promises.add(loadImage(unitType));
		//set the HTML constants-dependent style
		var boardHeight = HAND_POSITION === 'bottom' ? HEIGHT - HAND_HEIGHT_OR_WIDTH : HEIGHT;
		var boardStyle = document.getElementById('board').style;
		var boardWidth = HAND_POSITION === 'bottom' ? WIDTH : WIDTH - HAND_HEIGHT_OR_WIDTH;
		var gameStyle = document.getElementById('game').style;
		var handStyle = document.getElementById('hand').style;
		var tilesCanvas = document.getElementById('tilesCanvas');
		var tilesCtx = tilesCanvas.getContext('2d');
		var cardAdder = document.getElementById('card-adder');
		show('menu');
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
				currentDeckTemplate.set(func, currentDeckTemplate.get(func))
			});
			cardAdder.appendChild(div);
		}
		//add event listeners
		document.getElementById('play-button').addEventListener('click', async function() {
			await executeMenuFunction(async function() {
				await newMatch(LEVELS[currentLevel]);
				show('play-mode');
			});
		});
		document.getElementById('deck-editor-button').addEventListener('click', async function() {
			await executeMenuFunction(async function() {
				currentResolver(currentDeck);
			});
		});
		//if it is the first time the user opens the game or the user deleted the save file, create a save file	
		var savedGame = window.localStorage.getItem('savedGame');
		if (savedGame === undefined || savedGame === 'null') {
			window.localStorage.setItem('deck', JSON.stringify({}));
			window.localStorage.setItem('currentLevel', JSON.stringify(0));
			window.localStorage.setItem('savedGame', 'true');
		}
		//create the first player
		firstPlayer = new Player(HUMAN, FIRST_COLOR);
		secondPlayer = new Player(null, SECOND_COLOR);
		currentLevel = window.localStorage.getItem('savedGame') ? parseInt(window.localStorage.getItem('currentLevel')) : 0;
		//assign images to unit types
		await assignImages(promises);
	});
});