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

    /**
     * Gets the available units of a specified type for the formation
     * @param {UnitType} unitType The type of unit to check for availability
     */
    getAvailableUnits(unitType: UnitType): number {
        return unitType.availableUnits - this.getUsedUnits(unitType);
    }

    /**
     * Counts the number of a specified UnitType in this formation.
     * @param {UnitType} unitType The UnitType to count.
     */
    getUsedUnits(unitType: UnitType): number {
        var counter: number = 0;
        this.unitTypes.forEach(uTypeRow => {
            uTypeRow.forEach(uType => {
                if (uType == unitType) counter++;
            });
        });

        return counter;
    }

    /**
     * Sets, in the specified tile, a specified unit type.
     * Does not check for availability
     * @param coordinates The coordinates of the tile to set the unit type.
     * @param unitType The unit type to set in the tile.
     */
    setUnitType(coordinates: TileCoordinates, unitType: UnitType) {
        var x: number = coordinates.x;
        var y: number = coordinates.y;
        if (this.getAvailableUnits(unitType))
            this.unitTypes[x][y] = unitType;
    }
}