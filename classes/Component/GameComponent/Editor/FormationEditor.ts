/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class FormationEditor extends Editor {
    protected _instance: IFormationEditorInstance;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        var div: HTMLDivElement;
        super(game);
        FormationEditor.prototype._instance = this.newInstance(game);
    }

    protected newInstance(game: Game): IFormationEditorInstance {
        var TWO_PI = Math.PI * 2;
        var canvas: HTMLCanvasElement = document.createElement('canvas');
        var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        var instance: IFormationEditorInstance = {
            canvas: canvas,
            ctx: ctx,
            grid: null,
            rows: 2,
            onConfirm: function () {
                var game: IGameInstance = this.game.instance;
                game.executeLengthyFunction(() => {
                    game.show(game.deckEditor);
                });
            },
            onEscapePress: function () {
                var game: IGameInstance = this.game.instance;
                if (this.player === game.firstPlayer) {
                    game.executeLengthyFunction(() => {
                        game.show(game.menu);
                    });
                }
                else {
                    game.executeLengthyFunction(() => {
                        game.show(game.deckEditor);
                    });
                }
            },
            player: null,
            game: game,
            setFormation: function (player: Player, formation: Formation) {
                player.formation = formation;
            },
            radialMenuItemSize: 0.75,
            createGrid: function (level: Level) {
                var canvas: HTMLCanvasElement = this.canvas;
                var columns: number = level.width;
                var rows: number = this.rows;
                var tileSide: number = Math.min(
                    canvas.width / columns,
                    canvas.height / rows
                );

                this.grid = new FormationEditorGrid({
                    width: level.width,
                    height: rows,
                    tileSide: tileSide,
                    leftMargin: (canvas.width - tileSide * level.width) / 2,
                    topMargin: (canvas.height - tileSide * rows) / 2,
                    canvas: canvas
                });
            },
            selectedTile: null,
            div: this.newDiv()
        }
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        canvas.addEventListener(
            'click',
            e => {
                function hideRadialMenu() {

                }

                var clickCoordinates = new ScreenCoordinates(e.clientX, e.clientY);
                var selectedTileCoordinates = clickCoordinates.toGrid(instance.grid);
                if (instance.selectedTile !== null) {
                    if (instance.selectedTile.coordinates.toScreen().contains(clickCoordinates)) return;
                    hideRadialMenu();
                }
                if (clickCoordinates.isInsideGridArea(instance.grid)) {
                    //TODO: split next line into multiple lines because it is too large
                    instance.selectedTile = instance.grid.tiles[selectedTileCoordinates.x][selectedTileCoordinates.y];
                    var selectedTileBoundingSquare: Square = selectedTileCoordinates.toScreen();
                    var center: Coords = selectedTileBoundingSquare.center;
                    var centerX: number = center.x;
                    var centerY: number = center.y;
                    var tileSide: number = instance.grid.tileSide;
                    var unitTypesBeingShown: Array<UnitType> = [];
                    for (var unitType of instance.game.instance.unitTypes)
                        if (unitType.availableUnits) {
                            unitTypesBeingShown.push(unitType);
                        }
                    var length = unitTypesBeingShown.length;
                    var itemRadius = tileSide / 2;
                    var polygonRadius = (tileSide - itemRadius) / 2;
                    itemRadius *= instance.radialMenuItemSize;
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
                    instance.selectedTile = null;
                }
            }
        );
        return instance;
    }

    get instance(): IFormationEditorInstance {
        return this._instance;
    }
}