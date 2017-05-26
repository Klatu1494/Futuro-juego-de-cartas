/**
 * @fileoverview Contains the IComponent interface declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The objects that implement this interface have a related div.
 * @interface
 */
interface IGameInstance extends IComponentInstance {
  width: number;
  height: number;
  cardTypes: Set<CardType>;
  unitTypes: Set<UnitType>;
  firstPlayer: HumanPlayer;
  secondPlayer: Player;
  executeLengthyFunction: Function;
  componentsDivs: Array<HTMLDivElement>;
  menu: IMenuInstance;
  formationEditor: IFormationEditorInstance;
  deckEditor: IDeckEditorInstance;
  matchScreen: IMatchScreenInstance;
  show: Function;
  addComponent: Function;
}