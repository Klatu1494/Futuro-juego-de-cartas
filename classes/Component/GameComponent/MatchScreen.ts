/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class MatchScreen extends Component {
    protected _instance: IMatchScreenInstance;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        var div: HTMLDivElement;
        super();
        MatchScreen.prototype._instance = this.newInstance(game);
    }

    protected newInstance(game: Game): IMatchScreenInstance {
        var instance: IMatchScreenInstance = {
            onEscapePress: function () {
                var game: IGameInstance = this.game.instance;
                game.show(game.menu);
            },
            game: game,
            div: this.newDiv()
        }
        return instance;
    }

    get instance(): IMatchScreenInstance {
        return this._instance;
    }
}