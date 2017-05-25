/**
 * @fileoverview Contains the Formation class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The way that a player's units are aligned before a match starts.
 * @class
 */
class Formation {
    unitTypes: Array<Array<UnitType>>;
    /**
     * Creates a formation.
     */
    constructor(width: number, height: number) {
        this.unitTypes = [];
        for (var i: number = 0; i < width; i++) {
            this.unitTypes.push([]);
            for (var j: number = 0; j < height; j++)
                this.unitTypes[i].push(null);
        }
    }

    setUnitType(coordinates: TileCoordinates, unitType: UnitType) {
        var x: number = coordinates.x;
        var y: number = coordinates.y;
        var currentUnitTypeInThisTile = currentFormation.unitTypes[x][y];
        if (currentUnitTypeInThisTile) currentUnitTypeInThisTile.availableUnits++;
        selectedFormationEditorTile.drawUnitType(this);
        this.availableUnits--;
        this.unitTypes[x][y] = unitType;
    }
}