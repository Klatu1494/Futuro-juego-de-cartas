/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Menu extends GameComponent {
    protected _instance: IMenuInstance;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        var div: HTMLDivElement;
        super(game);
        Menu.prototype._instance = this.newInstance(game);
    }

    protected newInstance(game: Game): IMenuInstance {
        //loading screen
        var loadingScreen: IComponentInstance = new LoadingScreen().instance;
        var instance: IMenuInstance = {
            newMatch: function () {
                var game: IGameInstance = this.game.instance;
                this.player = game.firstPlayer;
                game.show(game.formationEditor);
            },
            onEscapePress() {

            },
            game: game,
            div: this.newDiv()
        }
        return instance;
    }

    get instance(): IMenuInstance {
        return this._instance;
    }
}