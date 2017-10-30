/**
 * @fileoverview Contains the Player class declaration and can
 *     contain definitions of the class' prototype's properties.
 */

/**
 * A player.
 * @class
 */
abstract class Player {
  readonly color: string;
  readonly name: string;
  private _deckTemplate: DeckTemplate;
  private _deck: Array<Card>;
  private _formation: Formation;
  /**
   * Creates a player
   * @typedef {Object} PlayerArgs
   * @property {number} color The player's color.
   * @property {string} name The player's name.
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
  }

  /**
   * Creates a new array representing a deck
   * and copy the player's deck template into it.
   */
  startGame() {
    //TODO: replace the array for a deck (when it is implemented)
    this._deck = new Array<Card>();
    for (var cardType of this.deckTemplate.cards)
      this._deck.push(new Card(cardType));
  }

  /**
   * Gets or sets this player's deck template.
   * @type {DeckTemplate}
   */
  get deckTemplate(): DeckTemplate {
    if (!this._deckTemplate) this._deckTemplate = new DeckTemplate();
    return this._deckTemplate;
  }

  set deckTemplate(value: DeckTemplate) {
    this._deckTemplate = value;
  }

  /**
   * Gets or sets this player's deck template.
   * @type {DeckTemplate}
   */
  get formation(): Formation {
    return this._formation;
  }

  set formation(value: Formation) {
    this._formation = value;
  }
}