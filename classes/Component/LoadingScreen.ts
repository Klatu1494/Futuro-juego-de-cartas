/**
 * @fileoverview Contains the LoadingScreen class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The loading screen.
 * @class
 */
class LoadingScreen extends Component {
    /**
     * Creates a screen that will be shown while a lengthy function is executed.
     */
    constructor(game: Game) {
        super(game, {
            isHiddenOnCreation: false,
            onResize: () => {
                style.lineHeight = innerHeight + 'px';
            }
        });
        var style: CSSStyleDeclaration = this.div.style;
        style.lineHeight = innerHeight + 'px';
    }
}