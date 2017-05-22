window.addEventListener('load', async function() {
  const ACTIONS = new Set().
  add({
    name: 'First action',
    onUse: () => {

    }
  }).
  add({
    name: 'Second action',
    onUse: () => {

    }
  });
  const AI = 'AI';
  const FIRST_COLOR = 'blue';
  const FORMATION_ROWS = 2;
  const HEIGHT = 600;
  const HUMAN = 'human';
  const SECOND_COLOR = 'red';
  const TILE_BACKGROUND_COLOR = 'white';
  const TILE_BORDER_COLOR = 'black';
  const TILE_BORDER_WIDTH = 2;
  const WIDTH = 800;
  const UNIT_TYPES = new Set().
  add(new UnitType({
    name: 'Zombie',
    imageSrc: 'images/shambling-zombie.png',
    initialQuantity: 5
  })).
  add(new UnitType({
    name: 'Farmer',
    imageSrc: 'images/unit1.png',
    initialQuantity: 5 //just testing
  })).
  add(new UnitType({
    name: 'Warrior',
    imageSrc: 'images/unit2.png',
    initialQuantity: 5 //just testing
  }));
  const RADIAL_MENU_FRAMES = 20;
  const RADIAL_MENU_ITEMS_SIZE = 0.75;
  const FRAME_DURATION = 50 / 3;
  //these constants must be declared after the previous ones
  const HAND_POSITION = HEIGHT < WIDTH ? 'right' : 'bottom';
  const HAND_HEIGHT_OR_WIDTH = HAND_POSITION === 'bottom' ? HEIGHT - WIDTH : WIDTH - HEIGHT;
  const MULTIPLAYER_AVAILABLE_UNITS = new Map();
  const LEVELS = [new Level({
    width: 3,
    height: 5,
    against: AI
  })];
  for (var unitType of UNIT_TYPES) MULTIPLAYER_AVAILABLE_UNITS.set(unitType, Infinity);
  var
    availableUnits,
    currentResolver,
    currentDeck,
    currentPromise,
    tileSide, // The length of any tile.
    leftMargin, // Left margin of the grid relative to the canvas.
    topMargin, // Top margin of the grid relative to the canvas.
    firstPlayerTurn,
    firstPlayer,
    grid,
    secondPlayer,
    currentLevel,
    currentDeckTemplate,
    levelWidth, // Level width in tiles.  
    levelHeight; // Level height in tiles.

  function createGrid(canvas, levelWidth, levelHeight) {
    var tileSide = Math.min(canvas.width / levelWidth, canvas.height / levelHeight);
    grid = new Grid({
      canvas: canvas,
      width: levelWidth,
      height: levelHeight,
      tileSide: tileSide,
      leftMargin: (canvas.width - tileSide * levelWidth) / 2,
      topMargin: (canvas.height - tileSide * levelHeight) / 2
    });
    for (var i = 0; i < levelWidth; i++)
      for (var j = 0; j < levelHeight; j++)
        grid.addTile(new Tile({ grid: grid, unit: null, x: i, y: j }), i, j);
  }

  function show(id) {
    for (var child of document.getElementById('game').children) child.style.display = 'none';
    document.getElementById(id).style.display = 'flex';
  }

  function getResolver(resolve) {
    currentResolver = resolve;
  }

  async function askForDeck() {
    currentPromise = new Promise(getResolver);
    await executeMenuFunction(async function() {
      show('deck-editor');
    });
    return currentPromise;
  }

  async function askForFormation() {
    currentPromise = new Promise(getResolver);
    await executeMenuFunction(async function() {
      createGrid(document.getElementById('formation-editor-tiles-canvas'), levelWidth, FORMATION_ROWS);
      show('formation-editor');
    });
    return currentPromise;
  }

  async function newMatch(level) {
    var action;
    var pressedEscOnFirstAsk = false;
    levelWidth = level.width;
    levelHeight = level.height;
    createGrid(document.getElementById('game-tiles-canvas'), levelWidth, levelHeight);
    firstPlayerTurn = Boolean(Math.floor(Math.random() * 2));
    firstPlayer.deckTemplate = null;
    secondPlayer.deckTemplate = null;
    firstPlayer.formation = null;
    secondPlayer.formation = null;
    if (level.against === HUMAN) {
      availableUnits = MULTIPLAYER_AVAILABLE_UNITS;
      while (!(firstPlayer.formation && secondPlayer.formation || pressedEscOnFirstAsk)) {
        action = await askForFormation();
        if (action instanceof DeckTemplate) firstPlayer.deckTemplate = action;
        else pressedEscOnFirstAsk = true;
        while (!(firstPlayer.formation && secondPlayer.formation || pressedEscOnFirstAsk)) {
          action = await askForFormation();
          if (action instanceof DeckTemplate) secondPlayer.deckTemplate = action;
          else pressedEscOnFirstAsk = true;
        }
      }
    } else if (level.against === AI) {
      availableUnits = firstPlayer.availableUnits;
      while (!(firstPlayer.formation && secondPlayer.formation || pressedEscOnFirstAsk)) {
        action = await askForFormation();
        if (action instanceof DeckTemplate) firstPlayer.deckTemplate = action;
        else pressedEscOnFirstAsk = true;
        while (!(firstPlayer.formation && secondPlayer.formation || pressedEscOnFirstAsk)) {
          action = await askForDeck(action);
          if (action instanceof DeckTemplate) secondPlayer.deckTemplate = action;
          else pressedEscOnFirstAsk = true;
        }
      }
    } else throw new Error();
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
    var gameCanvas = document.getElementById('game-tiles-canvas');
    var gameCtx = gameCanvas.getContext('2d');
    var formationEditorCanvas = document.getElementById('formation-editor-tiles-canvas');
    var formationEditorCtx = formationEditorCanvas.getContext('2d');
    var cardAdder = document.getElementById('card-adder');
    show('menu');
    boardStyle.height = boardHeight + 'px';
    boardStyle.width = boardWidth + 'px';
    gameStyle.height = HEIGHT + 'px';
    gameStyle.width = WIDTH + 'px';
    handStyle.height = (HAND_POSITION === 'bottom' ? HAND_HEIGHT_OR_WIDTH : HEIGHT) + 'px';
    handStyle.width = (HAND_POSITION === 'bottom' ? WIDTH : HAND_HEIGHT_OR_WIDTH) + 'px';
    gameCanvas.height = boardHeight;
    gameCanvas.width = boardWidth;
    gameCtx.fillStyle = TILE_BACKGROUND_COLOR;
    gameCtx.strokeStyle = TILE_BORDER_COLOR;
    gameCtx.lineWidth = TILE_BORDER_WIDTH;
    formationEditorCanvas.height = boardHeight;
    formationEditorCanvas.width = boardWidth;
    formationEditorCtx.fillStyle = TILE_BACKGROUND_COLOR;
    formationEditorCtx.strokeStyle = TILE_BORDER_COLOR;
    formationEditorCtx.lineWidth = TILE_BORDER_WIDTH;
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
    document.getElementById('formation-editor-tiles-canvas').addEventListener('click', e => {
      var clickedTileBoundingSquare = new ScreenCoordinates(e.clientX, e.clientY).toGrid(grid).toScreen();
      var center = clickedTileBoundingSquare.center;
      var centerX = center.x;
      var centerY = center.y;
      var tileSide = grid.tileSide;
      var unitTypesBeingShown = [];
      for (var unitType of UNIT_TYPES)
        if (unitType.availableUnits) {
          unitTypesBeingShown.push(unitType);
        }
      var length = unitTypesBeingShown.length;
      var itemRadius = tileSide / 2;
      var polygonRadius = (tileSide - itemRadius) / 2;
      itemRadius *= RADIAL_MENU_ITEMS_SIZE;
      //move items to the center of the radial menu
      for (var unitType of unitTypesBeingShown) {
        var style = unitType.formationElement.style;
        style.visibility = 'visible';
        style.transition = 'all 0s linear';
        style.left = centerX + 'px';
        style.top = centerY + 'px';
        style.width = '0';
        style.height = '0';
      }
      document.body.offsetLeft; //force reflow
      //move items away from the center
      for (var i = 0; i < length; i++) {
        var style = unitTypesBeingShown[i].formationElement.style;
        style.transition = 'all 0.3s linear';
        style.left = centerX - itemRadius / 2 + (length === 1 ? '0' : Math.cos(i * Math.PI * 2 / length) * polygonRadius) + 'px';
        style.top = centerY - itemRadius / 2 + (length === 1 ? '0' : Math.sin(i * Math.PI * 2 / length) * polygonRadius) + 'px';
        style.width = itemRadius + 'px';
        style.height = itemRadius + 'px';
      }
    });
    //if it is the first time the user opens the game or the user deleted the save file, create a save file 
    var savedGame = window.localStorage.getItem('savedGame');
    if (!savedGame) {
      window.localStorage.setItem('currentLevel', JSON.stringify(0));
      window.localStorage.setItem('availableUnits', JSON.stringify([]));
      window.localStorage.setItem('savedGame', JSON.stringify(true));
    }
    //load the save file
    var currentLevel = JSON.parse(window.localStorage.getItem('currentLevel'));
    var availableUnits = JSON.parse(window.localStorage.getItem('availableUnits'));
    //create the first player
    firstPlayer = new Player({
      controller: HUMAN,
      color: FIRST_COLOR
    });
    secondPlayer = new Player({
      controller: null,
      color: SECOND_COLOR
    });
    //assign images to unit types
    await assignImages(promises);
  });
});