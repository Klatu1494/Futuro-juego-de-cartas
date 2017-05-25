/**
 * @fileoverview Contains the DeckTemplate class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A template used to create the decks for each match.
 * @class
 */

class DeckTemplate {
  private readonly _cards: ReadonlyArray<CardType>
  /**
   * Creates a new deck template.
   * @param {Array<Card>} Cards cards for the template.
   */
  constructor(cards: Array<CardType> = []) {
    this._cards = [...cards];
  }

  /**
   * Gets the cards of the deck
   */
  get cards(): ReadonlyArray<CardType> { return this._cards; }

  /**
   * Determines whether the deck template is empty.
   * @return {boolean} Whether the deck template is empty.
   */
  isEmpty() {
    return !this._cards.length;
  }
}