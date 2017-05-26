/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The deck editor.
 * @class
 */
abstract class Editor extends GameComponent {
    protected _instance: IEditorInstance;
    /**
     * Creates the deck editor.
     */
    constructor(game: Game) {
        super(game);
    }
}