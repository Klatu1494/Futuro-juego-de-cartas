/**
 * @fileoverview Contains the GameComponent class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A component whose div is a child of its game div.
 * @class
 */
abstract class GameComponent extends Component {
    private _game: Game;
    onShow: () => void;
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
        this._game = game;
        this.div.addEventListener('keydown', onEscapePress || doNothing)
        window.addEventListener('resize', onResize || doNothing);
        this.onShow = this.onShow || doNothing;
    }

    get game(): Game {
        return this._game;
    }
}