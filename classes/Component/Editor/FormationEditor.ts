/**
 * @fileoverview Contains the FormationEditor class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The formation editor.
 * @class
 */
class FormationEditor extends Editor {
    private _grid: FormationEditorGrid;
    private _rows: number;
    private _radialMenuItemSize: number;
    private _selectedTile: FormationEditorTile;
    player: Player;
    currentFormation: Formation;
    addEventListeners: (unitTypes: Map<string, UnitType>) => void;
    /**
     * Creates the formation editor if it's not already created, else throws an error.
     */
    constructor(game: Game) {
        super(game, {
            onEscapePress: (e: KeyboardEvent) => {
                if (self.player === game.firstPlayer) game.show(game.menu);
                else game.show(game.deckEditor);
            }
        });

        function hideRadialMenu() {
            for (var unitType of game.unitTypes)
                unitType[1].radialMenuItem.style.display = 'none';
        }

        function onResize() {
            canvas.width = Math.min(innerWidth, innerHeight);
            canvas.height = Math.min(innerWidth, innerHeight);
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            self.onShow();
        }

        function drawCurrentFormation() {
            for (var row of self._grid.tiles) for (var tile of row)
                if (tile.unitType) tile.drawUnitType(tile.unitType);
                else tile.draw();
        }

        var TWO_PI = Math.PI * 2;
        var self: FormationEditor = this;
        var canvas: HTMLCanvasElement = document.createElement('canvas');
        var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        var div: HTMLDivElement = this.div;
        var button: HTMLButtonElement;

        this.onShow = function () {
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
                leftPadding: (canvas.width - tileSide * columns) / 2,
                topPadding: (canvas.height - tileSide * rows) / 2,
                canvas: canvas
            });
            this.player = this.player || game.firstPlayer;
            this.currentFormation = this.player.formation || new Formation(columns, rows);
            drawCurrentFormation();
        };
        div.addEventListener(
            'click',
            e => {
                var clickCoordinates = new ScreenCoordinates(e.clientX, e.clientY);
                if (self._selectedTile !== null) {
                    if (self._selectedTile.coordinates.toScreen().contains(clickCoordinates)) return;
                    hideRadialMenu();
                }
                if (clickCoordinates.isInsideGridArea(self._grid)) {
                    var selectedTileCoordinates = clickCoordinates.toTileCoordinates(self._grid);
                    self._selectedTile =
                        self._grid.tiles[selectedTileCoordinates.x][selectedTileCoordinates.y];
                    var selectedTileBoundingSquare: Square = selectedTileCoordinates.toScreen();
                    var center: Coords = selectedTileBoundingSquare.center;
                    var centerX: number = center.x;
                    var centerY: number = center.y;
                    var tileSide: number = self._grid.tileSide;
                    var unitTypesBeingShown: Array<UnitType> = [];
                    for (var unitTypePair of game.unitTypes)
                        if (self.currentFormation.getAvailableUnits(unitTypePair[1]))
                            unitTypesBeingShown.push(unitTypePair[1]);
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
                    forceReflow();
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
        this._rows = 2;
        this._radialMenuItemSize = 0.75;
        this._selectedTile = null;
        onResize();
        this.addEventListeners = (unitTypes: Map<string, UnitType>) => {
            function setTileUnitType(event: MouseEvent) {
                hideRadialMenu();
                if (self.currentFormation.getAvailableUnits(this)) {
                    self.currentFormation.setUnitType(self._selectedTile.coordinates, this);
                    if (this) self._selectedTile.drawUnitType(this);
                }
                self._selectedTile = null;
            }
            var self = this;
            for (var unitType of unitTypes) unitType[1].radialMenuItem.addEventListener(
                'click',
                setTileUnitType.bind(unitType[1])
            );
        };
        div.appendChild(canvas);
        button = game.createButton({
            parent: div,
            eventListener: () => {
                self.player.formation = self.currentFormation;
                game.deckEditor.player = self.player;
                game.show(game.deckEditor);
            },
            label: 'Confirm'
        });
        button.style.alignSelf = 'flex-end';
    }
}