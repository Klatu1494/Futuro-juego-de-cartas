/**
 * A unit.
 */
class Unit {
    range: number;
    currentLife: number;
    maxLife: number;
    attack: number;
    owner: Player;
    position: TileCoordinates;
    private _div: HTMLDivElement;
    /**
     * Creates an unit.
     */
    constructor(unitType: UnitType, initialPosition: TileCoordinates, owner: Player) {
        var containingSquare = initialPosition.toScreen();
        this.owner = owner;
        this.attack = unitType.attack;
        this.currentLife = unitType.life;
        this.maxLife = unitType.life;
        this.range = unitType.range;
        this._div = document.createElement("div");
        this._div.style.backgroundImage = "url(images/" + unitType.imgSrc + ")";
        this._div.classList.add("unit");
        this._div.style.width = this._div.style.height = containingSquare.width + "px";
        this.moveTo(initialPosition);
        document.body.appendChild(this._div);
    }

    moveTo(target: TileCoordinates) {
        var containingSquare = target.toScreen();
        this.position = target;
        this._div.style.left = containingSquare.left + "px";
        this._div.style.top = containingSquare.top + "px";
    }
}