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
    private _units: Array<Array<Unit>>;
    /**
     * Creates the match screen.
     */
    constructor(game: Game) {
        super(game, {
            onEscapePress: () => {
                game.show(game.menu);
            },
            onShow: () => {
                function loadFormation(x: number, y: number, player: Player, formation: Formation) {
                    for (var i: number = 0; i < game.currentLevel.width; i++) {
                        for (var j: number = 0; j < game.formationHeight; j++) {
                            var unitType: UnitType = formation.getUnitType(new Coords(i, j));
                            if (unitType)
                                self._units[x + i][y + j] = new Unit(unitType, new TileCoordinates(x + i, y + j, self._grid), player);
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
                self._units = [];
                for (var i: number = 0; i < game.currentLevel.width; i++)
                    self._units[i] = [];
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
            }
        });

        function onResize() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            self.createGrid(self.game.currentLevel);
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
        if (target.currentLife <= 0) this._units[target.position.x][target.position.y] = null;
    }
}