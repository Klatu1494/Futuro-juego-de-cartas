/**
 * @fileoverview Contains the DeckTemplate class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * @class
 * @summary A template used to create the decks for each match.
 */

class DeckTemplate {
  private readonly _cards: Array<Card>
  /**
   * Creates a new deck template.
   * @param {Array<Card>} Cards cards for the template.
   */
  constructor(cards: Array<Card> = []) {
    this._cards = [...cards];
  }

  /**
   * Gets the cards of the deck
   */
  get cards(): ReadonlyArray<Card> { return this._cards; }

  /**
   * Determines whether the deck template is empty.
   * @return {boolean} Whether the deck template is empty.
   */
  isEmpty() {
    return !this._cards.length;
  }
}