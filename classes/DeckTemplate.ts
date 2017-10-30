/**
 * A template used to create the decks for each match.
 * @class
 */

class DeckTemplate {
  private _cards: Array<CardType>
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
  get cards(): Array<CardType> {
    return this._cards;
  }

  /**
   * Determines whether the deck template is empty.
   * @return {boolean} Whether the deck template is empty.
   */
  isEmpty() {
    return !this._cards.length;
  }

  amountOf(type: CardType) {
    var acumulador: number = 0;
    for (var currentType of this.cards) if (type === currentType) acumulador++;
    return acumulador;
  }

  addCard(card: CardType) {
    this.cards.push(card);
  }

  removeCard(card: CardType) {
    var cards: Array<CardType> = this.cards;
    cards.splice(cards.indexOf(card), 1);
  }
}