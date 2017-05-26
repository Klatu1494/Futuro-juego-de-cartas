/**
 * @fileoverview Contains the GameComponent class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A component whose div is a child of #game.
 * @class
 */
abstract class GameComponent extends Component {
    protected instance: IGameComponentInstance;
    /**
     * Creates a game component.
     */
    constructor(game: Game) {
        super();
    }
}