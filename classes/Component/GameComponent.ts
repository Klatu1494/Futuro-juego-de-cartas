/**
 * @fileoverview Contains the GameComponent class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A component whose div is a child of #game.
 * @class
 */
abstract class GameComponent extends Component {
    onEscapePress: Function;
    /**
     * Creates a game component.
     */
    constructor(game: Game, id?: string, isHiddenOnCreation: boolean = true) {
        super(game.div, id, isHiddenOnCreation);
    }
}