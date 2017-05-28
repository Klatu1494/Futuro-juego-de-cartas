/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class FormationEditor extends Editor {
    createGrid: (level: Level) => void;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _grid: FormationEditorGrid;
    private _rows: number;
    private _radialMenuItemSize: number;
    private _selectedTile: FormationEditorTile;
    currentFormation: Formation;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        super(game);

        function hideRadialMenu() {
            for (var unitType of game.unitTypes)
                unitType.radialMenuItem.style.display = 'none';
        }

        function onConfirm() {
            self.player.formation = self.currentFormation;
            game.show(game.deckEditor);
        };

        function onEscapePress(e: KeyboardEvent) {
            if (self.player === game.firstPlayer) game.show(game.menu);
            else game.show(game.deckEditor);
        };

        //Formation editor initialization;
        var TWO_PI = Math.PI * 2;
        var self: FormationEditor = this;
        var canvas: HTMLCanvasElement = document.createElement('canvas');
        var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        canvas.addEventListener(
            'click',
            e => {
                var clickCoordinates = new ScreenCoordinates(e.clientX, e.clientY);
                var selectedTileCoordinates = clickCoordinates.toGrid(self._grid);
                if (self._selectedTile !== null) {
                    if (self._selectedTile.coordinates.toScreen().contains(clickCoordinates)) return;
                    hideRadialMenu();
                }
                if (clickCoordinates.isInsideGridArea(self._grid)) {
                    //TODO: split next line into multiple lines because it is too large
                    self._selectedTile = self._grid.tiles[selectedTileCoordinates.x][selectedTileCoordinates.y];
                    var selectedTileBoundingSquare: Square = selectedTileCoordinates.toScreen();
                    var center: Coords = selectedTileBoundingSquare.center;
                    var centerX: number = center.x;
                    var centerY: number = center.y;
                    var tileSide: number = self._grid.tileSide;
                    var unitTypesBeingShown: Array<UnitType> = [];
                    for (var unitType of game.unitTypes)
                        if (unitType.availableUnits) {
                            unitTypesBeingShown.push(unitType);
                        }
                    var length = unitTypesBeingShown.length;
                    var itemRadius = tileSide / 2;
                    var polygonRadius = (tileSide - itemRadius) / 2;
                    itemRadius *= self._radialMenuItemSize;
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
                    self._selectedTile = null;
                }
            }
        );
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        this.createGrid = function (level: Level) {
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
        };
        this._canvas = canvas;
        this._ctx = ctx;
        this._rows = 2;
        this._radialMenuItemSize = 0.75;
        this._selectedTile = null;
    }
}