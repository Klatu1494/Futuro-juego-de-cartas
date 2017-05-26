/**
 * @fileoverview Contains the IComponent interface declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The objects that implement this interface have a related div.
 * @interface
 */
interface IMatchScreenInstance extends IGameComponentInstance {
  grid: MatchGrid;
  canvas: HTMLCanvasElement;
  createGrid: Function;
  ctx: CanvasRenderingContext2D;
}