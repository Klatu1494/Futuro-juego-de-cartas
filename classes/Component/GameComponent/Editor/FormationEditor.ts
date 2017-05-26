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
        //loading screen
        var loadingScreen: IComponentInstance = new LoadingScreen().instance;
        var instance: IFormationEditorInstance = {
            canvas: document.createElement('canvas'),
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
            div: this.newDiv()
        }
        return instance;
    }

    get instance(): IFormationEditorInstance {
        return this._instance;
    }
}