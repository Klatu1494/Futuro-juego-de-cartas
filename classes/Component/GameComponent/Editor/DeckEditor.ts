/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The deck editor.
 * @class
 */
class DeckEditor extends Editor {
    protected _instance: IDeckEditorInstance;
    /**
     * Creates the deck editor.
     */
    constructor(game: Game) {
        var div: HTMLDivElement;
        super(game);
        DeckEditor.prototype._instance = this.newInstance(game);
    }

    protected newInstance(game: Game): IDeckEditorInstance {
        var instance: IDeckEditorInstance = {
            player: null,
            game: game,
            div: this.newDiv(),
            onConfirm: function () {
                var game: IGameInstance = this.game.instance;
                if (this.player === game.secondPlayer ||
                    (game.secondPlayer instanceof AIPlayer)
                ) {
                    game.executeLengthyFunction(() => {
                        game.show(game.matchScreen);
                    });
                }
                else {
                    game.executeLengthyFunction(() => {
                        game.show(game.formationEditor);
                    });
                }
            },
            onEscapePress: function () {
                var game: IGameInstance = this.game.instance;
                game.executeLengthyFunction(() => {
                    game.show(game.formationEditor);
                });
            },
            setDeckTemplate: function (player: Player, deckTemplate: DeckTemplate) {
                player.deckTemplate = deckTemplate;
            }
        }
        return instance;
    }

    get instance(): IDeckEditorInstance {
        return this._instance;
    }
}