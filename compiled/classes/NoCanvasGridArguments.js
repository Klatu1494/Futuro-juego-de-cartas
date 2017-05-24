/**
 * @fileoverview Contains the NoCanvasGridArguments class declaration and
 *     can contain definitions of the class' prototype's properties.
 */
/**
 * A class that creates objects that all the necessary information to create a
 * grid except for the canvas where it will be drawn. Note that this information
 * is enough to create any of the current Grid subclasses, since they always are
 * drawn in a defined canvas.
 * @class
 */
class NoCanvasGridArguments {
    /**
     * Creates an object that all the necessary information to create a grid
     * except for the canvas where it will be drawn.
     */
    constructor({ width, height, tileSide, leftMargin, topMargin }) {
        this.width = width;
        this.height = height;
        this.tileSide = tileSide;
        this.leftMargin = leftMargin;
        this.topMargin = topMargin;
    }
    setCanvas(canvas) {
        return new GridArguments(this, canvas);
    }
}
