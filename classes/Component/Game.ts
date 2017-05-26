/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Game extends Component {
    protected _instance: IGameInstance;
    /**
     * Creates the game.
     */
    constructor() {
        var div: HTMLDivElement;
        super();
        Game.prototype._instance = this.newInstance();
        div = this.div;
        div.id = 'game';
        document.body.appendChild(div);
    }

    protected newInstance(): IGameInstance {
        //loading screen
        var loadingScreen: IComponentInstance = new LoadingScreen().instance;
        var instance: IGameInstance = {
            cardTypes: new Set().
                add(new CardType({
                    name: 'First action',
                    onUse: () => {

                    }
                })).
                add(new CardType({
                    name: 'Second action',
                    onUse: () => {

                    }
                })),
            firstPlayer: new HumanPlayer({ name: null, color: null }),
            secondPlayer: null,
            addComponent: function (div: HTMLDivElement) {
                this.componentsDivs.push(div);
                this.div.appendChild(div);
            },
            componentsDivs: [],
            div: this.newDiv(),
            show: function (component: IComponentInstance) {
                for (var div of this.componentsDivs) div.style.display = 'none';
                component.div.style.display = 'flex';
            },
            menu: new Menu(this).instance,
            formationEditor: new FormationEditor(this).instance,
            deckEditor: new DeckEditor(this).instance,
            matchScreen: new MatchScreen(this).instance,
            executeLengthyFunction: async function (asyncFunc: Function) {
                var gameComponentsStyle = this.div.style;
                var loadingScreenStyle = loadingScreen.div.style;
                gameComponentsStyle.display = 'none';
                loadingScreenStyle.display = 'block';
                await asyncFunc();
                loadingScreenStyle.display = 'none';
                gameComponentsStyle.display = 'block';
            }
        }
        instance.addComponent(instance.menu);
        instance.addComponent(instance.formationEditor);
        instance.addComponent(instance.deckEditor);
        instance.addComponent(instance.matchScreen);
        return instance;
    }

    get instance(): IGameInstance {
        return this._instance;
    }
}