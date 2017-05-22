/**
 * @fileoverview Contains the DeckTemplate class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * @class
 * @summary A template used to create the decks for each match.
 */
class DeckTemplate {
  /**
   * Creates a deck template
   */
  constructor() {
    this.cards = [];
  }

  /**
   * Determines whether the deck template is empty.
   * @return {boolean} Whether the deck template is empty.
   */
  empty() {
    return !this.cards.length;
  }
}