/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The deck editor.
 * @class
 */
class DeckEditor extends Editor {
    setDeckTemplate: (deckTemplate: DeckTemplate) => void;
    /**
     * Creates the deck editor.
     */
    constructor(game: Game) {
        super(game);

        function onConfirm() {
            if (this.player === game.secondPlayer ||
                (game.secondPlayer instanceof AIPlayer)
            ) game.show(game.matchScreen);
            else game.show(game.formationEditor);
        }

        function onEscapePress() {
            game.show(game.formationEditor);
        }

        this.setDeckTemplate = function (deckTemplate: DeckTemplate) {
            this.player.deckTemplate = deckTemplate;
        };
    }
}