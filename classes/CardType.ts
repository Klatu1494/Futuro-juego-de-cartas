/**
 * @fileoverview Contains the CardType class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * Represents a card type
 * @class
 */
class CardType {
  private _name: string;
  private _onUse: Function;
  private _element: HTMLDivElement;
  constructor({ name, onUse = () => { } }: { name: string, onUse: Function }) {
    var element = document.createElement('div');
    element.className = 'card-type-adder';
    element.innerText = name;
    var button: HTMLDivElement = document.createElement('div');
    button.className = 'add';
    element.appendChild(button);
    button = document.createElement('div');
    button.className = 'take-out';
    element.appendChild(button);
    this._name = name;
    this._onUse = onUse;
    this._element = element;
  }

  get name(): string {
    return this._name;
  }

  get onUse(): Function {
    return this._onUse;
  }
}