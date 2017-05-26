/**
 * @fileoverview Contains the IComponent interface declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The classes that implement this interface
 * can create objects that act as deck editors.
 * @interface
 */
interface IDeckEditorInstance extends IEditorInstance {
  setDeckTemplate: Function;
}