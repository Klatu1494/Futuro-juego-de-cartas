/**
 * @fileoverview Contains the LoadingScreen class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The loading screen.
 * @class
 */
class LoadingScreen extends Component {
    _instance: IComponentInstance;
    /**
     * Creates a screen that will be shown while a lengthy function is executed.
     */
    constructor() {
        super();
        LoadingScreen.prototype._instance = this.newInstance();
    }

    newInstance(): IComponentInstance {
        var instance: IComponentInstance = {
            div: this.newDiv()
        };
        var style: CSSStyleDeclaration = instance.div.style;
        style.lineHeight = this.height + 'px';
        return instance;
    }

    get instance(): IComponentInstance {
        return this._instance;
    }
}