/**
 * @fileoverview Contains the LoadingScreen class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The loading screen.
 * @class
 */
class LoadingScreen extends GameComponent {
    private _game: Game;
    /**
     * Creates a screen that will be shown while a lengthy function is executed.
     */
    constructor(game: Game) {
        super(game, { id: 'loading-screen', isHiddenOnCreation: false });
        this.div.style.lineHeight = Component.height + 'px';
        this._game = game;
    }
    get game(): Game {
        return this.game;
    }
}