/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Menu extends GameComponent {
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        super(game, {});

        GameComponent.createButton({
            label: 'Single player',
            eventListener: () => {
                game.show(game.formationEditor);
            },
            parent: this.div
        });
    }
}