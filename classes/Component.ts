/**
 * @fileoverview Contains the Component class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * Each of the fullscreen divs of the game (including the game itself).
 * @class
 */
class Component {
  private _div: HTMLDivElement;
  /**
   * Creates a component.
   * @param {HTMLElement} parent The parent of this component's div.
   * @param {string?} parent The id of this component's div.
   */
  constructor(parent: HTMLElement, isHiddenOnCreation: boolean = true, id?: string) {
    if (this.wasInstantiated) throw new Error('This component already exists.');
    var div = document.createElement('div');
    var style = div.style;
    this._div = div;
    if (id) div.id = id;
    if (isHiddenOnCreation) style.display = 'none';
    style.width = '100%';
    style.height = '100%';
    parent.appendChild(div);
  }

  get wasInstantiated() {
    return false; //since there can be multiple components
  }

  get div(): HTMLDivElement {
    return this._div;
  }

  static get width(): number {
    return innerWidth;
  }

  static get height(): number {
    return innerHeight;
  }
}