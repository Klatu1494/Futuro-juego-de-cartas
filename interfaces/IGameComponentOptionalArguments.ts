/**
 * @fileoverview Contains the IComponent interface declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The objects that implement this interface have a related div.
 * @interface
 */
interface IGameComponentOptionalArguments {
    onResize?: EventListener;
    onEscapePress?: EventListener;
    onShow?: () => void;
    isHiddenOnCreation?: boolean;
}