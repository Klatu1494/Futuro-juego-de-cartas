/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Game extends Singleton {
    instance: {
        components: Array<GameComponent>,
        executeMenuFunction: Function,
        hideComponents: Function
    };
    /**
     * Creates the game.
     */
    constructor() {
        super();
    }

    createInstance() {
        var WIDTH = 800;
        var HEIGHT = 600;
        //loading screen
        var loadingScreen: HTMLDivElement = document.createElement('div');
        var loadingScreenStyle: CSSStyleDeclaration = loadingScreen.style;
        loadingScreenStyle.height = HEIGHT + 'px';
        loadingScreenStyle.lineHeight = HEIGHT + 'px';
        loadingScreenStyle.width = WIDTH + 'px';
        loadingScreen.id = 'loading-screen';
        document.body.appendChild(loadingScreen);
        //game components container
        var gameComponents: HTMLDivElement = document.createElement('div');
        var gameComponentsStyle: CSSStyleDeclaration = gameComponents.style;
        gameComponentsStyle.height = HEIGHT + 'px';
        gameComponentsStyle.lineHeight = HEIGHT + 'px';
        gameComponentsStyle.width = WIDTH + 'px';
        gameComponents.id = 'game';
        document.body.appendChild(gameComponents);
        this.constructor.prototype.instance = {
            addComponent: function (component: GameComponent) {
                gameComponents.appendChild(component.div);
            },
            executeMenuFunction: async function (asyncFunc: Function) {
                gameComponentsStyle.display = 'none';
                loadingScreenStyle.display = 'block';
                await asyncFunc();
                loadingScreenStyle.display = 'none';
                gameComponentsStyle.display = 'block';
            }
        }
    }
}