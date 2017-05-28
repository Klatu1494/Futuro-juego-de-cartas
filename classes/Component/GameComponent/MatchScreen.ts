/**
 * @fileoverview Contains the MatchScreen class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The match screen.
 * @class
 */
class MatchScreen extends GameComponent {
    createGrid: (level: Level) => void;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _grid: FormationEditorGrid;
    /**
     * Creates the match screen.
     */
    constructor(game: Game) {
        super(game, { id: 'match-screen', isHiddenOnCreation: false });

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
                leftMargin: (canvas.width - tileSide * level.width) / 2,
                topMargin: (canvas.height - tileSide * rows) / 2,
                canvas: canvas
            });
        };
    }
}