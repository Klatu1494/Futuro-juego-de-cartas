/**
 * The match screen.
 */
class MatchScreen extends Component {
    createGrid: (level: Level) => void;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _grid: FormationEditorGrid;
    private _units: Set<Unit>;
    turnOf: Player;
    /**
     * Creates the match screen.
     */
    constructor(game: Game) {
        super(game, {});

        function onEscapePress() {
            game.show(game.menu);
        };

        var canvas: HTMLCanvasElement = document.createElement('canvas');
        var ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        this._canvas = canvas;
        this._ctx = ctx;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        this.createGrid = function (level: Level) {
            var canvas: HTMLCanvasElement = this.canvas;
            var columns: number = level.width;
            var rows: number = level.height;
            var tileSide: number = Math.min(
                canvas.width / columns,
                canvas.height / rows
            );

            this.grid = new MatchGrid({
                width: level.width,
                height: rows,
                tileSide: tileSide,
                leftPadding: (canvas.width - tileSide * level.width) / 2,
                topPadding: (canvas.height - tileSide * rows) / 2,
                canvas: canvas
            });
        };
    }

    get units(): Set<Unit> {
        return new Set(this._units);
    }

    damageUnit(target: Unit, damage: number): void {
        target.currentLife -= Math.floor(damage);
        if (target.currentLife <= 0) this._units.delete(target);
    }
}