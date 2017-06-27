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
    /**
     * Creates an unit.
     */
    constructor(unitType: UnitType, initialPosition: TileCoordinates, owner: Player) {
        this.position = initialPosition;
        this.owner = owner;
        this.attack = unitType.attack;
        this.currentLife = unitType.life;
        this.maxLife = unitType.life;
        this.range = unitType.range;
    }
}