/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The deck editor.
 * @class
 */
abstract class Editor extends GameComponent {
    protected _player: Player;
    /**
     * Creates the deck editor.
     */
    constructor(game: Game, optionalArguments: IGameComponentOptionalArguments) {
        super(game, optionalArguments);
    }
}