/**
 * @fileoverview Contains the Player class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * A player.
 * @class
 */
class Player {
  /**
   * Creates a player
   * @typedef {Object} PlayerArgs
   * @property {number} color The player's color.
   * @property {string} controller The player's controller, used to determine
   *     whether the AI should play instead of a second human player.
   * 
   * @param {PlayerArgs} args An object that has
   *     information about the player being created.
   */
  constructor(args) {
    var {
      color,
      controller
    } = args;
    this.color = color;
    this._controller = controller;
    this._deckTemplate = JSON.parse(localStorage.getItem('deck'));
  }

  /**
   * Creates a new array representing a deck
   * and copy the player's deck template into it.
   */
  startGame() {
    //TODO: replace the array for a deck (when it is implemented)
    this.deck = [];
    for (var cardType in this.deckTemplate)
      for (var i = 0; i < this.deckTemplate[cardType]; i++)
        this.deck.push(cardType);
  }

  /**
   * Gets or sets and saves this player's deck template.
   * @type {DeckTemplate}
   */
  get deckTemplate() {
    return this._deckTemplate;
  }
  set deckTemplate(value) {
    window.localStorage.setItem(this.color + 'Deck', JSON.stringify(value));
    this._deckTemplate = value;
  }
}