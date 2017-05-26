/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class MatchScreen extends GameComponent {
    protected _instance: IMatchScreenInstance;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        var div: HTMLDivElement;
        super(game);
        MatchScreen.prototype._instance = this.newInstance(game);
    }

    protected newInstance(game: Game): IMatchScreenInstance {
        var instance: IMatchScreenInstance = {
            grid: null,
            canvas: document.createElement('canvas'),
            onEscapePress: function () {
                var game: IGameInstance = this.game.instance;
                game.show(game.menu);
            },
            game: game,
            div: this.newDiv(),
            createGrid: function (level: Level) {
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
            },
        }
        return instance;
    }

    get instance(): IMatchScreenInstance {
        return this._instance;
    }
}