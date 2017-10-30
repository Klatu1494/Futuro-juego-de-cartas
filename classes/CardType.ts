/**
 * Represents a card type
 */
class CardType {
  private _condition: Function;
  private _imgSrc: string;
  private _name: string;
  private _onUse: Function;
  private _div: HTMLDivElement;
  private _imageLoader: Promise<HTMLImageElement>;

  constructor({ name, condition = (() => true), onUse = (() => {

  }), imgSrc = 'help.png', description = '' }: { name: string, condition?: Function, onUse?: Function, imgSrc?: string, description?: string }) {
    var image: HTMLImageElement;
    this._imageLoader = new Promise(resolve => {
      image = new Image()
      image.src = 'images/' + imgSrc;
      image.addEventListener('load', () => resolve(image));
    });
    var div: HTMLDivElement = document.createElement('div');
    var header: HTMLDivElement = document.createElement('div');
    var descriptionDiv: HTMLDivElement = document.createElement('div');
    div.className = 'card-type-adder';
    header.style.lineHeight = '40px';
    header.appendChild(image);
    header.appendChild(document.createTextNode(name));
    descriptionDiv.innerText = description;
    descriptionDiv.className = 'description';
    div.appendChild(header);
    div.appendChild(descriptionDiv);
    this._name = name;
    this._onUse = onUse;
    this._condition = condition;
    this._div = div;
    this._imgSrc = 'images/' + imgSrc;
  }

  get name(): string {
    return this._name;
  }

  get onUse(): Function {
    return this._onUse;
  }

  get condition(): Function {
    return this._condition;
  }

  get imageLoader(): Promise<HTMLElement> {
    return this._imageLoader;
  }

  get imgSrc(): string {
    return this._imgSrc;
  }

  get div(): HTMLDivElement {
    return this._div;
  }
}