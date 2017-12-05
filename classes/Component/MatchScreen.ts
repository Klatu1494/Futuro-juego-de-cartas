/**
 * The match screen.
 */
class MatchScreen extends Component {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _grid: MatchGrid;
    private _turn: number;
    private _players: ReadonlyArray<Player>
    private _level: Level;
    private _listeners: Map<string, Set<EventListener>>
    /**
     * Creates the match screen.
     */
    constructor(game: Game) {
        super(game, {
            onResize: onResize,
            onEscapePress: () => {
                game.show(game.menu);
            },
            onShow: () => {
                function loadFormation(x: number, y: number, player: Player, formation: Formation) {
                    for (var i: number = 0; i < game.currentLevel.width; i++) {
                        for (var j: number = 0; j < game.formationHeight; j++) {
                            var unitType: UnitType = formation.getUnitType(new Coords(i, j));
                            if (unitType)
                                self._grid.tiles[x + i][y + j].unit = new Unit(unitType, new TileCoordinates(x + i, y + j, self._grid), player);
                        }
                    }
                }

                var firstPlayer = game.firstPlayer;
                var secondPlayer = game.secondPlayer;
                var players: Array<Player> = [
                    firstPlayer,
                    secondPlayer
                ];
                var secondPlayerFormation = new Formation(game.currentLevel.width, game.formationHeight);
                for (var i: number = 0; i < game.currentLevel.width; i++) {
                    for (var j: number = 0; j < game.formationHeight; j++) {
                        var unitType: UnitType = secondPlayer.formation.getUnitType(new Coords(i, j));
                        if (unitType)
                            secondPlayerFormation.setUnitType(
                                new Coords(game.currentLevel.width - 1 - i, game.formationHeight - 1 - j),
                                unitType
                            );
                    }
                }
                if (Math.random() < 0.5) players.reverse();
                self._turn = 0;
                self._players = players;
                loadFormation(0, game.currentLevel.height - game.formationHeight, firstPlayer, game.firstPlayer.formation);
                loadFormation(0, 0, secondPlayer, secondPlayerFormation);
                this.forEachUnit((unit: Unit) => {
                    unit.addEventListener("click", function (e: MouseEvent) {
                        if (this.movementCost <= this.actionPoints) {
                            self.askForTile((tile: MatchTile): boolean => {
                                return false
                            });
                        }
                    });
                });
            }
        });

        function onResize() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            self.createGrid(self.game.currentLevel);
            this.forEachUnit((unit: Unit) => {
                unit.moveTo(new TileCoordinates(unit.position.x, unit.position.y, self._grid));
            });
        }

        var self: MatchScreen = this;
        var canvas: HTMLCanvasElement = document.createElement('canvas');
        var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        this._canvas = canvas;
        this._ctx = ctx;
        this.div.appendChild(canvas);
        onResize();
    }

    get turn(): number {
        return this._turn;
    }

    get turnOf(): Player {
        return this._players[this.turn % 2];
    }

    createGrid(level: Level) {
        var canvas: HTMLCanvasElement = this._canvas;
        var columns: number = level.width;
        var rows: number = level.height;
        var tileSide: number = Math.min(
            canvas.width / columns,
            canvas.height / rows
        );
        this._grid = new MatchGrid({
            width: level.width,
            height: rows,
            tileSide: tileSide,
            leftPadding: (canvas.width - tileSide * level.width) / 2,
            topPadding: (canvas.height - tileSide * rows) / 2,
            canvas: canvas
        });
    };

    damageUnit(target: Unit, damage: number): void {
        target.currentLife -= Math.floor(damage);
        if (target.currentLife <= 0) this._grid.tiles[target.position.x][target.position.y].unit = null;
    }

    forEachUnit(action: (unit: Unit) => void) {
        for (var row of this._grid.tiles) for (var tile of row) {
            var unit: Unit = tile.unit;
            if (unit) action(unit);
        }
    }

    async askForUnit(condition: (unit: Unit) => boolean): Promise<Unit> {
        var self: MatchScreen = this;
        var promise: Promise<Unit> = new Promise(resolve => {
            self.forEachUnit((unit: Unit) => {
                if (condition(unit))
                    unit.addEventListener('click', function () {
                        self.forEachUnit((unit: Unit) => {
                            unit.removeEventListeners("click");
                        });
                        resolve(this);
                    });
            });
        });
        return promise;
    }

    async askForTile(condition: (tile: MatchTile) => boolean): Promise<MatchTile> {
        var self: MatchScreen = this;
        var promise: Promise<MatchTile> = new Promise(resolve => {
            for (var row of self._grid.tiles) for (var tile of row)
                self.addEventListenerToCanvas("click", (function () {
                    self.removeEventListenersFromCanvas("click");
                    resolve(this);
                }).bind(tile));
        });
        return promise;
    }

    addEventListenerToCanvas(type: string, listener: EventListener) {
        this._canvas.addEventListener(type, listener);
        var listeners: Set<EventListener> = this._listeners.get(type);
        if (!listeners) {
            listeners = new Set();
            this._listeners.set(type, listeners);
        }
        listeners.add(listener);
    }

    removeEventListenersFromCanvas(type: string) {
        var listeners = this._listeners.get(type);
        if (listeners) for (var listener of listeners)
            this._canvas.removeEventListener(type, listener);
    }
}