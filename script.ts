window.addEventListener('load', async function () {
  var CARD_TYPES: Set<Card> = new Set().
    add(new Card({
      name: 'First action',
      onUse: () => {

      }
    })).
    add(new Card({
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
  var WIDTH: number = 800;
  var UNIT_TYPES: Set<UnitType> = new Set().
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
  var RADIAL_MENU_FRAMES: number = 20;
  var RADIAL_MENU_ITEMS_SIZE: number = 0.75;
  var FRAME_DURATION: number = 50 / 3;
  //these variables must be declared after the previous ones
  var CANVAS_SIDE = Math.min(WIDTH, HEIGHT);
  var HAND_POSITION: string = HEIGHT < WIDTH ? 'right' : 'bottom';
  var HAND_HEIGHT_OR_WIDTH: number =
    HAND_POSITION === 'bottom' ?
      HEIGHT - WIDTH :
      WIDTH - HEIGHT;
  var LEVELS: Array<Level> = [new Level({
    width: 3,
    height: 5
  })];
  var
    currentResolver: Function,
    currentDeck: DeckTemplate,
    currentDeckPromise: Promise<DeckTemplate>,
    currentFormationPromise: Promise<Formation>,
    firstPlayerTurn: boolean,
    firstPlayer: Player,
    grid: Grid,
    secondPlayer: Player,
    currentLevel: Level,
    currentDeckTemplate: DeckTemplate,
    selectedTile: Tile,
    levelWidth: number, // Level width in tiles.  
    levelHeight: number; // Level height in tiles.

  function createGrid(
    canvas: HTMLCanvasElement,
    levelWidth: number,
    levelHeight: number
  ) {
    var tileSide = Math.min(
      CANVAS_SIDE / levelWidth,
      CANVAS_SIDE / levelHeight
    );
    grid = new Grid({
      canvas: canvas,
      width: levelWidth,
      height: levelHeight,
      tileSide: tileSide,
      leftMargin: (CANVAS_SIDE - tileSide * levelWidth) / 2,
      topMargin: (CANVAS_SIDE - tileSide * levelHeight) / 2
    });
    for (var i = 0; i < levelWidth; i++)
      for (var j = 0; j < levelHeight; j++)
        grid.addTile(new Tile({
          grid: grid,
          coordinates: new TileCoordinates(i, j, grid)
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

  async function askForDeck() {
    currentDeckPromise = new Promise(getResolver);
    await executeMenuFunction(async function () {
      show('deck-editor');
    });
    return currentDeckPromise;
  }

  async function askForFormation() {
    currentFormationPromise = new Promise(getResolver);
    await executeMenuFunction(async function () {
      createGrid(
        <HTMLCanvasElement>document.getElementById('formation-editor-tiles-canvas'),
        levelWidth,
        FORMATION_ROWS
      );
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
    levelWidth = level.width;
    levelHeight = level.height;
    createGrid(
      <HTMLCanvasElement>document.getElementById('game-tiles-canvas'),
      levelWidth,
      levelHeight
    );
    firstPlayerTurn = Boolean(Math.floor(Math.random() * 2));
    firstPlayer.deckTemplate = null;
    secondPlayer.deckTemplate = null;
    firstPlayer.formation = null;
    secondPlayer.formation = null;
    if (secondPlayer instanceof HumanPlayer) {
      while (keepLooping()) {
        await askForFormation()
          .then(formation => firstPlayer.formation = formation)
          .catch(() => {
            //volver al menu principal
          });
        while (keepLooping()) {
          await askForFormation()
            .then(formation => firstPlayer.formation = formation)
            .catch(() => {
              //volver a pedir la primera formación
            });
          while (keepLooping()) {
            await askForFormation()
              .then(formation => firstPlayer.formation = formation)
              .catch(() => {
                //volver a pedir el primer deck template
              });
            while (keepLooping()) {
              await askForFormation()
                .then(formation => firstPlayer.formation = formation)
                .catch(() => {
                  //volver a pedir la segunda formación
                });
            }
          }
        }
      }
    } else if (secondPlayer instanceof AIPlayer) {
      while (keepLooping()) {
        await askForFormation()
          .then(formation => firstPlayer.formation = formation)
          .catch(() => {
            //volver al menu principal
          });
        while (keepLooping()) {
          await askForFormation()
            .then(formation => firstPlayer.formation = formation)
            .catch(() => {
              //volver a pedir la primera formación
            });
          while (keepLooping()) {
            await askForFormation()
              .then(formation => firstPlayer.formation = formation)
              .catch(() => {
                //volver a pedir el primer deck template
              });
            while (keepLooping()) {
              await askForFormation()
                .then(formation => firstPlayer.formation = formation)
                .catch(() => {
                  //volver a pedir la segunda formación
                });
            }
          }
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
    //add event listeners
    document.getElementById('play-button').addEventListener(
      'click',
      async function () {
        await executeMenuFunction(async function () {
          await newMatch(LEVELS[currentLevel]);
          show('play-mode');
        });
      });
    document.getElementById('deck-editor-button').addEventListener(
      'click',
      async function () {
        await executeMenuFunction(async function () {
          currentResolver(currentDeckTemplate);
        });
      });
    document.getElementById('formation-editor-tiles-canvas').addEventListener(
      'click',
      e => {
        const TWO_PI = Math.PI * 2;
        var clickCoordinates = new ScreenCoordinates(e.clientX, e.clientY);

        // Do nothing if clicked outside the grid area
        if (!clickCoordinates.isInsideGridArea(grid))
          return;

        var selectedTileCoordinates = clickCoordinates.toGrid(grid);
        //TODO: split next line into multiple lines because it is too large
        selectedTile = grid.tiles[selectedTileCoordinates.x][selectedTileCoordinates.y];
        var selectedTileBoundingSquare: Square = selectedTileCoordinates.toScreen();
        var center: Coords = selectedTileBoundingSquare.center;
        var centerX: number = center.x;
        var centerY: number = center.y;
        var tileSide: number = grid.tileSide;
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
          style.transition = 'all 0s linear';
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
      });
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
  });
});