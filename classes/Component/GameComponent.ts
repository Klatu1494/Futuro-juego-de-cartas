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
    private static _buttonWidth: number;
    private static _buttonHeight: number;
    private static _margin: number;
    static createButton: ({ parent, eventListener, label }: { parent: HTMLElement, eventListener: EventListener, label: string }) => HTMLButtonElement;
    onShow: () => void;
    /**
     * Creates a game component if it's not already created, else throws an error.
     */
    constructor(game: Game, args?: IGameComponentOptionalArguments) {
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

    static get buttonWidth(): number {
        return this._buttonWidth;
    }

    static set buttonWidth(value: number) {
        if (this._buttonWidth) throw new Error('The buttons width is already set.');
        this._buttonWidth = value;
    }

    static get buttonHeight(): number {
        return this._buttonHeight;
    }

    static set buttonHeight(value: number) {
        if (this._buttonHeight) throw new Error('The buttons height is already set.');
        this._buttonHeight = value;
    }

    static get margin(): number {
        return this._margin;
    }

    static set margin(value: number) {
        if (this._margin) throw new Error('The margin is already set.');
        this._margin = value;
    }
}