/**
 * @fileoverview Contains the CardType class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * Represents a card type
 * @class
 */
class CardType {
  private _imgSrc: string;
  private _name: string;
  private _onUse: Function;
  private _element: HTMLDivElement;
  private _imageLoader: Promise<HTMLImageElement>;

  constructor({ name, onUse, imgSrc }: { name: string, onUse?: Function, imgSrc?: string }) {
    imgSrc = imgSrc || 'help.png';

    //these images will never be used, they only preload the image file
    this._imageLoader = new Promise(resolve => {
      var image: HTMLImageElement = new Image()
      image.src = 'images/' + imgSrc;
      image.addEventListener('load', () => resolve(image));
    });
    onUse = onUse || (() => {

    });

    var element = document.createElement('div');
    element.className = 'card-type-adder';
    element.innerText = name;
    var button: HTMLDivElement = document.createElement('div');
    button.className = 'add';
    element.appendChild(button);
    button = document.createElement('div');
    button.className = 'take-out';
    element.appendChild(button);
    //document.getElementById('card-adder').appendChild(element);
    this._name = name;
    this._onUse = onUse;
    this._element = element;
    this._imgSrc = imgSrc;
  }

  get name(): string {
    return this._name;
  }

  get onUse(): Function {
    return this._onUse;
  }

  get imageLoader(): Promise<HTMLElement> {
    return this._imageLoader;
  }

  get imgSrc(): string {
    return this._imgSrc;
  }
}