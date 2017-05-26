/**
 * @fileoverview Contains the Component class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * Each of the fullscreen divs of the game (including the game itself).
 * @class
 */
abstract class Component {
  protected instance: IComponentInstance;
  private _width: number = 800;
  private _height: number = 600;
  /**
   * Creates a component.
   */
  constructor() {
    if (this.instance) this.throwError();
  }

  protected throwError(error?: string) {
    new Error(error || 'Components can only be instantiated once.');
  }

  protected newDiv() {
    var div: HTMLDivElement = document.createElement('div');
    var divStyle: CSSStyleDeclaration;
    divStyle = div.style;
    divStyle.width = this._width + 'px';
    divStyle.height = this._height + 'px';
    return div;
  }

  protected get div(): HTMLDivElement {
    return this.instance.div || this.newDiv();
  }

  protected get width() {
    return this._width;
  }

  protected get height() {
    return this._height;
  }
}