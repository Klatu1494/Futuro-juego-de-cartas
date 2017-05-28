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
        args?: IGameComponentOptionalArguments
    ) {
        var { onResize = doNothing, onEscapePress = doNothing, isHiddenOnCreation = true } = args;
        var div: HTMLDivElement = game.div;
        super(div, isHiddenOnCreation);
        this.div.addEventListener('keydown', onEscapePress || doNothing)
        window.addEventListener('resize', onResize || doNothing);
    }
}