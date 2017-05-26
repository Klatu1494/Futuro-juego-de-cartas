/**
 * @fileoverview Contains the IComponent interface declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The objects that implement this interface have a related div.
 * @interface
 */
interface IFormationEditorInstance extends IEditorInstance {
  canvas: HTMLCanvasElement;
  setFormation: Function;
  rows: number;
  grid: FormationEditorGrid;
  ctx: CanvasRenderingContext2D;
  createGrid: Function;
}