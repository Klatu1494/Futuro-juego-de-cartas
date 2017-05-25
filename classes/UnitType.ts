class UnitType {
  private _radialMenuItem: HTMLImageElement;
  private _imageLoader: Promise<HTMLElement>;
  private _name: string;
  private _imgSrc: string;
  availableUnits: number;

  constructor(
    { name, imgSrc, initialQuantity = 0 }: { name: string, imgSrc: string, initialQuantity: number }
  ) {
    var self: UnitType = this;
    this._imageLoader = new Promise(resolve => {
      var image = new Image();
      image.src = imgSrc;
      image.className = 'unit-type';
      document.body.appendChild(image);
      image.addEventListener('load', () => resolve(image));
    }).then((image: HTMLImageElement) => self._radialMenuItem = image);
    this.availableUnits = initialQuantity;
    this._name = name;
    this._imgSrc = imgSrc;
  }

  get radialMenuItem(): HTMLImageElement {
    return this._radialMenuItem;
  }

  get imageLoader(): Promise<HTMLElement> {
    return this._imageLoader;
  }

  get name(): string {
    return this._name;
  }

  get imgSrc(): string {
    return this._imgSrc;
  }
}