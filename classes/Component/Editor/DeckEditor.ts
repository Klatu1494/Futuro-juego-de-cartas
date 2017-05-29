/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The deck editor.
 * @class
 */
class DeckEditor extends Editor {
    setDeckTemplate: () => void;
    currentDeckTemplate: DeckTemplate;
    /**
     * Creates the deck editor.
     */
    constructor(game: Game) {
        super(game, {});

        function onConfirm() {
            if (
                self.player === game.secondPlayer ||
                (game.secondPlayer instanceof AIPlayer)
            ) game.show(game.matchScreen);
            else game.show(game.formationEditor);
            self.setDeckTemplate();
        }

        function onEscapePress() {
            game.show(game.formationEditor);
        }

        var self = this;
        this.setDeckTemplate = function () {
            this.player.deckTemplate = this.currentDeckTemplate;
        };
    }
}