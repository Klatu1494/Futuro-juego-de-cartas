/**
 * A unit type.
 */
class UnitType {
  private _skills: Set<CardType>;
  private _life: number;
  private _attack: number;
  private _radialMenuItem: HTMLImageElement;
  private _imageLoader: Promise<HTMLImageElement>;
  private _name: string;
  private _imgSrc: string;
  private _range: number;
  availableUnits: number;

  constructor(
    { name, imgSrc, initialQuantity = 0, attack = 0, life = 0, skills = new Set() }: { name: string, imgSrc: string, initialQuantity: number, attack: number, life: number, skills: Set<CardType> }
  ) {
    var self: UnitType = this;
    this._imageLoader = new Promise(resolve => {
      var image = new Image();
      image.src = 'images/' + imgSrc;
      image.className = 'unit-type';
      document.body.appendChild(image);
      image.addEventListener('load', () => resolve(image));
    }).then((image: HTMLImageElement) => self._radialMenuItem = image);
    this.availableUnits = initialQuantity;
    this._name = name;
    this._imgSrc = imgSrc;
    this._attack = attack;
    this._life = life;
    this._skills = skills;
  }

  get radialMenuItem(): HTMLImageElement {
    return this._radialMenuItem;
  }

  get imageLoader(): Promise<HTMLImageElement> {
    return this._imageLoader;
  }

  get name(): string {
    return this._name;
  }

  get attack(): number {
    return this._attack;
  }

  get range(): number {
    return this._range;
  }

  get life(): number {
    return this._life;
  }

  get imgSrc(): string {
    return this._imgSrc;
  }

  get skills(): Set<CardType> {
    return new Set(this._skills);
  }
}