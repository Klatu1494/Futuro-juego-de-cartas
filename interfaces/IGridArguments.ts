/**
 * @fileoverview Contains the IComponent interface declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The objects that implement this interface have a related div.
 * @interface
 */
interface IGridArguments {
    width: number;
    height: number;
    tileSide: number;
    leftMargin: number;
    topMargin: number;
    canvas: HTMLCanvasElement;
}