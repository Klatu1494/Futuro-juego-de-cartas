/**
 * @fileoverview Contains the <className> class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A human player.
 * @class
 */
class HumanPlayer extends Player {
  /**
   * Creates a human player.
   */
  constructor(args: { color: string, name: string }) {
    super(args);
  }
}