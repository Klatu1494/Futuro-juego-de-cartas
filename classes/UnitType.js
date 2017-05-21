class UnitType {
  constructor(args) {
    var {
      name,
      imageSrc,
      initialQuantity = 0
    } = args;
    this.name = name;
    this.formationElement = document.createElement('img');
    this.formationElement.src = imageSrc;
    this.formationElement.className = 'unit-type';
    this.availableUnits = initialQuantity;
    document.body.appendChild(this.formationElement);
    this.imageSrc = imageSrc;
  }
}