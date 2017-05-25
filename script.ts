window.addEventListener('load', async function () {
  var CARD_TYPES: Set<CardType> = new Set().
    add(new CardType({
      name: 'First action',
      onUse: () => {

      }
    })).
    add(new CardType({
      name: 'Second action',
      onUse: () => {

      }
    }));
  var FIRST_COLOR: string = 'blue'; //:Color?
  var FORMATION_ROWS: number = 2;
  var HEIGHT: number = 600;
  var SECOND_COLOR: string = 'red'; //:Color?
  var TILE_BACKGROUND_COLOR: string = 'white'; //:Color?
  var TILE_BORDER_COLOR: string = 'black'; //:Color?
  var TILE_BORDER_WIDTH: number = 2;
  var TWO_PI = Math.PI * 2;
  var WIDTH: number = 800;
  var UNIT_TYPES: Set<UnitType> = new Set().
    add(new UnitType({
      name: 'Zombie',
      imageSrc: 'images/shambling-zombie.png',
      initialQuantity: 2
    })).
    add(new UnitType({
      name: 'Farmer',
      imageSrc: 'images/unit1.png',
      initialQuantity: 2 //just testing
    })).
    add(new UnitType({
      name: 'Warrior',
      imageSrc: 'images/unit2.png',
      initialQuantity: 2 //just testing
    }));
  var RADIAL_MENU_FRAMES: number = 20;
  var RADIAL_MENU_ITEMS_SIZE: number = 0.75;
  var FRAME_DURATION: number = 50 / 3;
  //these variables must be declared after the previous ones
  var CANVAS_SIDE: number = Math.min(WIDTH, HEIGHT);
  var HAND_POSITION: string = HEIGHT < WIDTH ? 'right' : 'bottom';
  var HAND_HEIGHT_OR_WIDTH: number =
    HAND_POSITION === 'bottom' ?
      HEIGHT - WIDTH :
      WIDTH - HEIGHT;
  var LEVELS: ReadonlyArray<Level> = [new Level({
    width: 3,
    height: 5
  })];

  var
    currentResolver: Function,
    currentDeck: DeckTemplate,
    currentFormation: Formation,
    currentDeckPromise: Promise<DeckTemplate>,
    currentFormationPromise: Promise<Formation>,
    firstPlayerTurn: boolean,
    firstPlayer: Player,
    formationEditorGrid: FormationEditorGrid,
    matchGrid: MatchGrid,
    secondPlayer: Player,
    currentLevel: Level,
    currentDeckTemplate: DeckTemplate,
    selectedFormationEditorTile: FormationEditorTile = null;

  function setTileUnitType(event: MouseEvent) {
    hideRadialMenu();
    if (currentFormation.getAvailableUnits(this)) {
      selectedFormationEditorTile.drawUnitType(this);
      currentFormation.setUnitType(selectedFormationEditorTile.coordinates, this);
    }
  }

  function hideRadialMenu() {
    for (var unitType of UNIT_TYPES) {
      var radialMenuItem: HTMLImageElement = unitType.radialMenuItem;
      var style: CSSStyleDeclaration = radialMenuItem.style;
      radialMenuItem.style.transition = 'all 0s linear';
      radialMenuItem.style.visibility = 'hidden';
    }
  }

  function createFormationEditorGrid(
    levelWidth: number,
  ) {
    var tileSide: number = Math.min(
      CANVAS_SIDE / levelWidth,
      CANVAS_SIDE / FORMATION_ROWS
    );
    formationEditorGrid = new FormationEditorGrid(new NoCanvasGridArguments({
      width: levelWidth,
      height: FORMATION_ROWS,
      tileSide: tileSide,
      leftMargin: (CANVAS_SIDE - tileSide * levelWidth) / 2,
      topMargin: (CANVAS_SIDE - tileSide * FORMATION_ROWS) / 2
    }));
    for (var i: number = 0; i < levelWidth; i++)
      for (var j: number = 0; j < FORMATION_ROWS; j++)
        formationEditorGrid.addTile(new FormationEditorTile({
          grid: formationEditorGrid,
          coordinates: new TileCoordinates(i, j, formationEditorGrid)
        }));
  }

  function createMatchGrid(
    levelWidth: number,
    levelHeight: number
  ) {
    var tileSide: number = Math.min(
      CANVAS_SIDE / levelWidth,
      CANVAS_SIDE / levelHeight
    );
    matchGrid = new MatchGrid(new NoCanvasGridArguments({
      width: levelWidth,
      height: levelHeight,
      tileSide: tileSide,
      leftMargin: (CANVAS_SIDE - tileSide * levelWidth) / 2,
      topMargin: (CANVAS_SIDE - tileSide * levelHeight) / 2
    }));
    for (var i: number = 0; i < levelWidth; i++)
      for (var j: number = 0; j < levelHeight; j++)
        matchGrid.addTile(new MatchTile({
          grid: matchGrid,
          coordinates: new TileCoordinates(i, j, matchGrid)
        }));
  }

  function show(id: string) {
    var gameElements: HTMLCollection = document.getElementById('game').children;
    for (var i: number = gameElements.length - 1; 0 <= i; i--)
      (<HTMLElement>gameElements[i]).style.display = 'none';
    document.getElementById(id).style.display = 'flex';
  }
  function getResolver(resolve: Function) {
    currentResolver = resolve;
  }

  async function askForDeck(formation: Formation) {
    currentDeckPromise = new Promise(getResolver);
    await executeMenuFunction(async function () {
      show('deck-editor');
    });
    return currentDeckPromise;
  }

  async function askForFormation(levelWidth: number) {
    currentFormationPromise = new Promise(getResolver);
    await executeMenuFunction(async function () {
      createFormationEditorGrid(levelWidth);
      show('formation-editor');
    });
    return currentFormationPromise;
  }

  async function newMatch(level: Level) {
    function keepLooping(): boolean {
      return !(firstPlayer.formation !== null &&
        firstPlayer.deckTemplate !== null &&
        secondPlayer.formation !== null &&
        secondPlayer.deckTemplate !== null)
    }

    var pressedEscOnFirstAsk: boolean = false;
    var levelWidth = level.width;
    var levelHeight = level.height;
    createMatchGrid(levelWidth, levelHeight);
    firstPlayerTurn = Boolean(Math.floor(Math.random() * 2));
    firstPlayer.deckTemplate = null;
    secondPlayer.deckTemplate = null;
    firstPlayer.formation = new Formation(levelWidth, FORMATION_ROWS);
    secondPlayer.formation = new Formation(levelWidth, FORMATION_ROWS);
    if (secondPlayer instanceof HumanPlayer) {
      while (keepLooping()) {
        currentFormation = firstPlayer.formation;
        await askForFormation(levelWidth)
          .then(formation => firstPlayer.formation = formation)
          .catch(() => {
            //volver al menu principal
          });
        while (keepLooping()) {
          await askForDeck(firstPlayer.formation)
            .then(deckTemplate => firstPlayer.deckTemplate = deckTemplate)
            .catch(() => {
              //volver a pedir la primera formación
            });
          while (keepLooping()) {
            currentFormation = secondPlayer.formation;
            await askForFormation(levelWidth)
              .then(formation => secondPlayer.formation = formation)
              .catch(() => {
                //volver a pedir el primer deck template
              });
            while (keepLooping()) {
              await askForDeck(secondPlayer.formation)
                .then(deckTemplate => secondPlayer.deckTemplate = deckTemplate)
                .catch(() => {
                  //volver a pedir la segunda formación
                });
            }
          }
        }
      }
    } else if (secondPlayer instanceof AIPlayer) {
      while (keepLooping()) {
        currentFormation = firstPlayer.formation;
        await askForFormation(levelWidth)
          .then(formation => firstPlayer.formation = formation)
          .catch(() => {
            //volver al menu principal
          });
        while (keepLooping()) {
          await askForDeck(firstPlayer.formation)
            .then(deckTemplate => firstPlayer.deckTemplate = deckTemplate)
            .catch(() => {
              //volver a pedir la primera formación
            });
        }
      }
    } else throw new Error();
    firstPlayer.startGame();
    firstPlayer.startGame();
  }

  async function executeMenuFunction(asyncFunc: Function) {
    document.getElementById('game').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'block';
    await asyncFunc();
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
  }

  document.getElementById('loading-screen').style.height = HEIGHT + 'px';
  document.getElementById('loading-screen').style.lineHeight = HEIGHT + 'px';
  document.getElementById('loading-screen').style.width = WIDTH + 'px';
  await executeMenuFunction(async function () {
    //set the HTML constants-dependent style
    var boardHeight =
      HAND_POSITION === 'bottom' ?
        HEIGHT - HAND_HEIGHT_OR_WIDTH :
        HEIGHT;
    var boardStyle = document.getElementById('board').style;
    var boardWidth = HAND_POSITION === 'bottom' ? WIDTH :
      WIDTH -
      HAND_HEIGHT_OR_WIDTH;
    var gameStyle = document.getElementById('game').style;
    var handStyle = document.getElementById('hand').style;
    var gameCanvas = <HTMLCanvasElement>document.getElementById(
      'game-tiles-canvas'
    );
    var gameCtx = gameCanvas.getContext('2d');
    var formationEditorCanvas = <HTMLCanvasElement>document.getElementById(
      'formation-editor-tiles-canvas'
    );
    var formationEditorCtx = formationEditorCanvas.getContext('2d');
    var cardAdder = document.getElementById('card-adder');
    show('menu');
    boardStyle.height = boardHeight + 'px';
    boardStyle.width = boardWidth + 'px';
    gameStyle.height = HEIGHT + 'px';
    gameStyle.width = WIDTH + 'px';
    handStyle.height = (
      HAND_POSITION === 'bottom' ?
        HAND_HEIGHT_OR_WIDTH :
        HEIGHT
    ) + 'px';
    handStyle.width = (
      HAND_POSITION === 'bottom' ?
        WIDTH :
        HAND_HEIGHT_OR_WIDTH
    ) + 'px';
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
    //if it is the first time the user opens the game or
    //the user deleted the save file, create a save file
    var savedGame = localStorage.getItem('savedGame');
    if (!savedGame) {
      localStorage.setItem('currentLevel', JSON.stringify(0));
      localStorage.setItem('availableUnits', JSON.stringify([]));
      localStorage.setItem('savedGame', JSON.stringify(true));
    }
    //load the save file
    var currentLevel = JSON.parse(localStorage.getItem('currentLevel'));
    var availableUnits = JSON.parse(
      localStorage.getItem('availableUnits')
    );
    //create the first player
    firstPlayer = new HumanPlayer({
      name: 'Karv',
      color: FIRST_COLOR
    });
    secondPlayer = new HumanPlayer({
      name: 'Klatu',
      color: SECOND_COLOR
    });
    //wait until all the images have been loaded
    var promises: Array<Promise<HTMLImageElement>> = [];
    var unitType: UnitType;
    for (unitType of UNIT_TYPES) promises.push(unitType.imageLoader);
    await Promise.all(promises);
    //add event listeners
    for (unitType of UNIT_TYPES) unitType.radialMenuItem.addEventListener(
      'click',
      setTileUnitType.bind(unitType)
    );
    document.getElementById('play-button').addEventListener(
      'click',
      async function () {
        await executeMenuFunction(async function () {
          await newMatch(LEVELS[currentLevel]);
          show('play-mode');
        });
      }
    );
    document.getElementById('deck-editor-button').addEventListener(
      'click',
      async function () {
        await executeMenuFunction(async function () {
          currentResolver(currentDeckTemplate);
        });
      }
    );
    document.getElementById('formation-editor').addEventListener(
      'click',
      e => {
        var clickCoordinates = new ScreenCoordinates(e.clientX, e.clientY);
        var selectedTileCoordinates = clickCoordinates.toGrid(formationEditorGrid);
        if (selectedFormationEditorTile !== null) {
          if (selectedFormationEditorTile.coordinates.toScreen().contains(clickCoordinates)) return;
          hideRadialMenu();
        }
        if (clickCoordinates.isInsideGridArea(formationEditorGrid)) {
          //TODO: split next line into multiple lines because it is too large
          selectedFormationEditorTile = formationEditorGrid.tiles[selectedTileCoordinates.x][selectedTileCoordinates.y];
          var selectedTileBoundingSquare: Square = selectedTileCoordinates.toScreen();
          var center: Coords = selectedTileBoundingSquare.center;
          var centerX: number = center.x;
          var centerY: number = center.y;
          var tileSide: number = formationEditorGrid.tileSide;
          var unitTypesBeingShown: Array<UnitType> = [];
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
            var style = unitType.radialMenuItem.style;
            style.visibility = 'visible';
            style.left = centerX + 'px';
            style.top = centerY + 'px';
            style.width = '0';
            style.height = '0';
          }
          document.body.offsetLeft; //force reflow
          //move items away from the center
          for (var i = 0; i < length; i++) {
            var style = unitTypesBeingShown[i].radialMenuItem.style;
            style.transition = 'all 0.3s linear';
            style.left = (centerX - itemRadius / 2 + (
              length === 1 ?
                0 :
                Math.sin(i * TWO_PI / length) * polygonRadius
            )) + 'px';
            style.top = (centerY - itemRadius / 2 - (
              length === 1 ?
                0 :
                Math.cos(i * TWO_PI / length) * polygonRadius
            )) + 'px';
            style.width = itemRadius + 'px';
            style.height = itemRadius + 'px';
          }
        }
        else {
          hideRadialMenu();
          selectedFormationEditorTile = null;
        }
      }
    );
    document.getElementById('formation-editor').addEventListener(
      'contextmenu',
      e => {
        e.preventDefault();
        hideRadialMenu();
        selectedFormationEditorTile = null;
        var clickedCoordinates = new ScreenCoordinates(e.clientX, e.clientY);
        if (clickedCoordinates.isInsideGridArea(formationEditorGrid)) {
          var selectedTileCoordinates: TileCoordinates = clickedCoordinates.toGrid(formationEditorGrid);
          //TODO: split next line into multiple lines because it is too large
          var clickedTile: FormationEditorTile = formationEditorGrid.tiles[selectedTileCoordinates.x][selectedTileCoordinates.y];
          selectedFormationEditorTile = null;
          clickedTile.draw();
          currentFormation.setUnitType(selectedFormationEditorTile.coordinates, null);
        }
      }
    );
    document.getElementById('formation-editor-button').addEventListener(
      'click',
      () => {
        hideRadialMenu();
      }
    );
  });
});