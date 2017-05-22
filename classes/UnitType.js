class UnitType {
  constructor(args) {
    var {
      name,
      imageSrc,
      initialQuantity = 0
    } = args;
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