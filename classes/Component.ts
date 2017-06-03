/**
 * @fileoverview Contains the Component class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * An object whose div is a child of the document's body.
 * @class
 */
abstract class Component {
    private _div: HTMLDivElement;
    private _game: Game;
    static createButton: ({ parent, eventListener, label }: { parent: HTMLElement, eventListener: EventListener, label: string }) => HTMLButtonElement;
    onShow: () => void;
    /**
     * Creates a game component if it's not already created, else throws an error.
     */
    constructor(game: Game, args?: IGameComponentOptionalArguments) {
        if (game.components.get(this.constructor)) throw new Error('This component already exists.');
        var { onResize = doNothing, onEscapePress = doNothing, isHiddenOnCreation = true } = args;
        var div = document.createElement('div');
        var style = div.style;
        div.className = 'centered-flex';
        this._div = div;
        if (isHiddenOnCreation) style.display = 'none';
        style.width = '100%';
        style.height = '100%';
        document.body.appendChild(div);
        this._game = game;
        this.div.addEventListener('keydown', onEscapePress || doNothing)
        window.addEventListener('resize', onResize || doNothing);
        this.onShow = this.onShow || doNothing;
    }

    get game(): Game {
        return this._game;
    }

    get div(): HTMLDivElement {
        return this._div;
    }
}