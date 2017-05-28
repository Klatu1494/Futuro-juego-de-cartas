/**
 * @fileoverview Contains the GameComponent class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A component whose div is a child of its game div.
 * @class
 */
abstract class GameComponent extends Component {
    onEscapePress: Function;
    /**
     * Creates a game component.
     */
    constructor(
        game: Game,
        { onResize = doNothing, onEscapePress = doNothing, id, isHiddenOnCreation = true }: IGameComponentOptionalArguments
    ) {
        var div: HTMLDivElement = game.div;
        super(div, id, isHiddenOnCreation);
        this.div.addEventListener('keydown', onEscapePress || doNothing)
        window.addEventListener('resize', onResize || doNothing);
    }
}