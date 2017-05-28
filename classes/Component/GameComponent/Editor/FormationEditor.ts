/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class FormationEditor extends Editor {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _grid: FormationEditorGrid;
    private _rows: number;
    private _radialMenuItemSize: number;
    private _selectedTile: FormationEditorTile;
    currentFormation: Formation;
    addEventListeners: (unitTypes: ReadonlyArray<UnitType>) => void;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        super(game, {
            onEscapePress: (e: KeyboardEvent) => {
                if (self._player === game.firstPlayer) game.show(game.menu);
                else game.show(game.deckEditor);
            }
        });

        //Formation editor initialization
        var TWO_PI = Math.PI * 2;
        var self: FormationEditor = this;
        var canvas: HTMLCanvasElement = document.createElement('canvas');
        var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        var div: HTMLDivElement = this.div;
        var button: HTMLDivElement = document.createElement('div');

        function hideRadialMenu() {
            for (var unitType of game.unitTypes)
                unitType.radialMenuItem.style.display = 'none';
        }

        this.onShow = function () {
            var canvas: HTMLCanvasElement = this._canvas;
            var level: Level = this.game.currentLevel;
            var columns: number = level.width;
            var rows: number = this._rows;
            var tileSide: number = Math.min(
                canvas.width / columns,
                canvas.height / rows
            );
            this._grid = new FormationEditorGrid({
                width: columns,
                height: rows,
                tileSide: tileSide,
                leftMargin: (canvas.width - tileSide * columns) / 2,
                topMargin: (canvas.height - tileSide * rows) / 2,
                canvas: canvas
            });
            this.currentFormation = new Formation(columns, rows);
            /**
             * @todo: Restore formation.
             */
        };
        canvas.width = Math.min(Component.width, Component.height);
        canvas.height = Math.min(Component.width, Component.height);
        canvas.addEventListener(
            'click',
            e => {
                var clickCoordinates = new ScreenCoordinates(e.clientX, e.clientY);
                if (self._selectedTile !== null) {
                    if (self._selectedTile.coordinates.toScreen().contains(clickCoordinates)) return;
                    hideRadialMenu();
                }
                if (clickCoordinates.isInsideGridArea(self._grid)) {
                    var selectedTileCoordinates = clickCoordinates.toGrid(self._grid);
                    self._selectedTile =
                        self._grid.tiles[selectedTileCoordinates.x][selectedTileCoordinates.y];
                    var selectedTileBoundingSquare: Square = selectedTileCoordinates.toScreen();
                    var center: Coords = selectedTileBoundingSquare.center;
                    var centerX: number = center.x;
                    var centerY: number = center.y;
                    var tileSide: number = self._grid.tileSide;
                    var unitTypesBeingShown: Array<UnitType> = [];
                    for (var unitType of game.unitTypes)
                        if (self.currentFormation.getAvailableUnits(unitType))
                            unitTypesBeingShown.push(unitType);
                    var length = unitTypesBeingShown.length;
                    var itemRadius = tileSide / 2;
                    var polygonRadius = (tileSide - itemRadius) / 2;
                    itemRadius *= self._radialMenuItemSize;
                    //move items to the center of the radial menu
                    for (var unitType of unitTypesBeingShown) {
                        var style = unitType.radialMenuItem.style;
                        style.transition = 'all 0s linear';
                        style.display = 'block';
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
        button.addEventListener('click', () => {
            console.log(self.currentFormation);
            self._player.formation = self.currentFormation;
            game.show(game.deckEditor);
        });
        this._canvas = canvas;
        this._ctx = ctx;
        this._rows = 2;
        this._radialMenuItemSize = 0.75;
        this._selectedTile = null;
        this.addEventListeners = (unitTypes: ReadonlyArray<UnitType>) => {
            function setTileUnitType(event: MouseEvent) {
                hideRadialMenu();
                if (self.currentFormation.getAvailableUnits(this)) {
                    self.currentFormation.setUnitType(self._selectedTile.coordinates, this);
                    if (this) self._selectedTile.drawUnitType(this);
                }
                self._selectedTile = null;
            }
            var self = this;
            for (var unitType of unitTypes) unitType.radialMenuItem.addEventListener(
                'click',
                setTileUnitType.bind(unitType)
            );
        };
        div.appendChild(canvas);
        div.appendChild(button);
    }
}