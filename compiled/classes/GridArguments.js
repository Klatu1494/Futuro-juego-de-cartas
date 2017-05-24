/**
 * @fileoverview Contains the GridArguments class declaration and
 *     can contain definitions of the class' prototype's properties.
 */
/**
 * A class that creates objects that all the
 * necessary information to create a grid.
 * @class
 */
class GridArguments {
    /**
     * Creates an object that all the necessary information to create a grid
     * except for the canvas where it will be drawn.
     */
    constructor(noCanvasGridArguments, canvas) {
        var { width, height, tileSide, leftMargin, topMargin } = noCanvasGridArguments;
        this.width = width;
        this.height = height;
        this.tileSide = tileSide;
        this.leftMargin = leftMargin;
        this.topMargin = topMargin;
        this.canvas = canvas;
    }
}
