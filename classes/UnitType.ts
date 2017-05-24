class UnitType {
  radialMenuItem: HTMLImageElement;
  imageLoader: Promise<HTMLElement>;
  name: string;
  imageSrc: string;
  availableUnits: number;

  constructor(
    { name, imageSrc, initialQuantity = 0 }: { name: string, imageSrc: string, initialQuantity: number }
  ) {
    var self: UnitType = this;
    this.name = name;
    this.imageSrc = imageSrc;
    this.imageLoader = new Promise(resolve => {
      var image = document.createElement('img');
      image.className = 'unit-type';
      image.src = imageSrc;
      document.body.appendChild(image);
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('click', () => self.availableUnits--);
    }).then((image: HTMLImageElement) => self.radialMenuItem = image);
    this.availableUnits = initialQuantity;
  }
}