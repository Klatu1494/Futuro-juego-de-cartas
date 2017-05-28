/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * An editor.
 * @class
 */
abstract class Editor extends Component {
    player: Player;
    /**
     * Creates an editor.
     */
    constructor(game: Game, optionalArguments: IGameComponentOptionalArguments) {
        super(game, optionalArguments);
    }
}