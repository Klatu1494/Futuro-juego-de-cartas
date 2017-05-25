/**
 * @fileoverview Contains the Card class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * A card.
 * @class
 */
class Card {
  _element: HTMLImageElement;
  _cardType: CardType;
  /**
   * Creates a card.
   */
  constructor(cardType: CardType) {
    var element: HTMLImageElement = document.createElement('img');
    element;
    this._cardType = cardType;
    this._element = element;
  }
}