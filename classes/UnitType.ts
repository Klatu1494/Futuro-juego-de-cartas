class UnitType {
  element: HTMLImageElement;
  name: string;
  imageSrc: string;
  availableUnits: number;
  constructor({ name, imageSrc, initialQuantity = 0 }: { name: string, imageSrc: string, initialQuantity: number }) {
    var element = document.createElement('img');
    this.element = element;
    element.src = imageSrc;
    element.className = 'unit-type';
    document.body.appendChild(element);
    this.name = name;
    this.imageSrc = imageSrc;
    this.availableUnits = initialQuantity;
  }
}