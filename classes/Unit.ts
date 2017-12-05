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
    actionPoints: number;
    private _div: HTMLDivElement;
    private _listeners: Map<string, Set<EventListener>>
    /**
     * Creates an unit.
     */
    constructor(unitType: UnitType, initialPosition: TileCoordinates, owner: Player) {
        this.owner = owner;
        this.attack = unitType.attack;
        this.currentLife = unitType.life;
        this.maxLife = unitType.life;
        this.range = unitType.range;
        this.actionPoints = 100;
        this._div = document.createElement("div");
        this._div.style.backgroundImage = "url(images/" + unitType.imgSrc + ")";
        this._div.classList.add("unit");
        this._div.style.borderColor = owner.color;
        this.moveTo(initialPosition);
        document.body.appendChild(this._div);
    }

    get div(): HTMLDivElement {
        return this._div;
    }

    moveTo(target: TileCoordinates) {
        var containingSquare = target.toScreen();
        this.position = target;
        this._div.style.left = containingSquare.left + "px";
        this._div.style.top = containingSquare.top + "px";
        this._div.style.width = this._div.style.height = containingSquare.width + "px";
    }

    addEventListener(type: string, listener: EventListener) {
        this._div.addEventListener(type, listener.bind(this));
        var listeners: Set<EventListener> = this._listeners.get(type);
        if (!listeners) {
            listeners = new Set();
            this._listeners.set(type, listeners);
        }
        listeners.add(listener);
    }

    removeEventListeners(type: string) {
        var listeners = this._listeners.get(type);
        if (listeners) for (var listener of listeners)
            this._div.removeEventListener(type, listener);
    }
}