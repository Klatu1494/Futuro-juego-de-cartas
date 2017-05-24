class UnitType {
    constructor({ name, imageSrc, initialQuantity = 0 }) {
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
