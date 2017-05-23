/**
 * @fileoverview Contains the Square class declaration and can
 *     contain definitions of the class' prototype's properties.
 */
/**
 * A square whose sides are aligned either to the x axis or to the y axis.
 * @class
 */
class Square extends Rectangle {
    /**
     * Initializes a new Square given the topleft
     * coordinates and the length of a side.
     * @param {Coordinates} topLeftCoordinates Top-left coordinates
     * @param {number} sideLength Length of any side
     */
    constructor(topLeftCoordinates, sideLength) {
        super(topLeftCoordinates, sideLength, sideLength);
    }
}
