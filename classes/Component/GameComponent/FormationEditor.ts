/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class FormationEditor extends Component {
    private _instance: IFormationEditorInstance;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        var div: HTMLDivElement;
        super();
        FormationEditor.prototype._instance = this.newInstance(game);
        document.body.appendChild(div);
    }

    protected newInstance(game: Game): IFormationEditorInstance {
        //loading screen
        var loadingScreen: IComponentInstance = new LoadingScreen().instance;
        var instance: IFormationEditorInstance = {
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
            div: this.newDiv()
        }
        return instance;
    }

    get instance(): IFormationEditorInstance {
        return this._instance;
    }
}