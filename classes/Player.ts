/**
 * @fileoverview Contains the Player class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * A player.
 * @interface
 */
abstract class Player {
  readonly color: string;
  readonly name: string;
  private _deckTemplate: DeckTemplate;
  private _deck: Array<Card>;
  formation: Formation;
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
  constructor(args: { color: string, name: string }) {
    var {
      color,
      name
    } = args;
    this.color = color;
    this.name = name;
    this._deckTemplate = JSON.parse(localStorage.getItem('deck'));
  }

  /**
   * Creates a new array representing a deck
   * and copy the player's deck template into it.
   */
  startGame() {
    //TODO: replace the array for a deck (when it is implemented)
    this._deck = new Array<Card>();
    for (var cardType in this.deckTemplate)
      for (var i = 0; i < this.deckTemplate[cardType]; i++)
        this._deck.push(cardType);
  }

  /**
   * Gets or sets and saves this player's deck template.
   * @type {DeckTemplate}
   */
  get deckTemplate(): DeckTemplate {
    return this._deckTemplate;
  }
  set deckTemplate(value) {
    localStorage.setItem(this.color + 'Deck', JSON.stringify(value));
    this._deckTemplate = value;
  }
}