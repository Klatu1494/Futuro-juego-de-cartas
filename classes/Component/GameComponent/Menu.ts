/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Menu extends GameComponent {
    newMatch: Function;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        super(game, 'menu');
        this.newMatch = function () {
            game.show(game.formationEditor);
        };
        this.onEscapePress = () => { };
    }
}