/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The deck editor.
 * @class
 */
class DeckEditor extends Editor {
    setDeckTemplate: () => void;
    currentDeckTemplate: DeckTemplate;
    /**
     * Creates the deck editor.
     */
    constructor(game: Game) {
        super(game, { onEscapePress: () => game.show(game.formationEditor) });

        function onConfirm() {
            if (
                self.player === game.secondPlayer ||
                (game.secondPlayer instanceof AIPlayer)
            ) game.show(game.matchScreen);
            else game.show(game.formationEditor);
            self.setDeckTemplate();
        }

        var CARDS_PER_ROW = 12; //(?)
        var ROWS = 4; //(?)
        var CURRENT_DECK_DIV_WIDTH_PERCENTAGE: number = 75;
        var CARD_TYPES_DIV_WIDTH_PERCENTAGE: number = 100 - CURRENT_DECK_DIV_WIDTH_PERCENTAGE;
        var BUTTON_DIV_HEIGHT_PERCENTAGE: number = 10;
        var OTHER_DIVS_HEIGHT_PERCENTAGE: number = 100 - BUTTON_DIV_HEIGHT_PERCENTAGE;

        var style = this.div.style;
        var currentDeckDiv: HTMLDivElement = document.createElement('div');
        var cardTypesDiv: HTMLDivElement = document.createElement('div');
        var buttonDiv: HTMLDivElement = document.createElement('div');
        var button: HTMLButtonElement = game.createButton({
            parent: buttonDiv,
            eventListener: () => {

            },
            label: 'Confirm'
        });
        var currentDeckDivStyle: CSSStyleDeclaration = currentDeckDiv.style;
        var cardTypesDivStyle: CSSStyleDeclaration = cardTypesDiv.style;
        var buttonDivStyle: CSSStyleDeclaration = buttonDiv.style;
        var self = this;
        this.setDeckTemplate = function () {
            this.player.deckTemplate = this.currentDeckTemplate;
        };
        currentDeckDivStyle.width = CURRENT_DECK_DIV_WIDTH_PERCENTAGE + '%';
        currentDeckDivStyle.height = OTHER_DIVS_HEIGHT_PERCENTAGE + '%';
        currentDeckDiv.className = 'centered-flex';
        this.div.appendChild(currentDeckDiv);
        for (var i = 0; i < ROWS; i++) {
            var div = document.createElement('div');
            var currentDivStyle = div.style;
            div.className = 'centered-flex';
            currentDivStyle.width = '100%';
            currentDivStyle.height = 100 / ROWS + '%';
            currentDivStyle.position = 'relative';
            currentDeckDiv.appendChild(div);
            style.display = '';
            var cardHeight: number = div.clientHeight * 0.9;
            var cardWidth: number = cardHeight * 0.75;
            style.display = 'none';
            for (var j = 0; j < CARDS_PER_ROW; j++) {
                var testDiv: HTMLDivElement = document.createElement('div');
                testDiv.style.left = 100 * j / CARDS_PER_ROW + '%';
                testDiv.style.position = 'absolute';
                testDiv.style.width = cardWidth + 'px';
                testDiv.style.height = cardHeight + 'px';
                testDiv.style.background = 'url(images/shambling-zombie.png), black';
                testDiv.style.backgroundSize = '100% 75%';
                testDiv.style.backgroundPositionY = '50%';
                testDiv.style.backgroundRepeat = 'no-repeat';
                div.appendChild(testDiv);
            }
        }
        cardTypesDivStyle.width = CARD_TYPES_DIV_WIDTH_PERCENTAGE + '%';
        cardTypesDivStyle.height = OTHER_DIVS_HEIGHT_PERCENTAGE + '%';
        buttonDivStyle.width = '100%';
        buttonDivStyle.height = BUTTON_DIV_HEIGHT_PERCENTAGE + '%';
        buttonDiv.className = 'centered-flex';
        this.div.appendChild(cardTypesDiv);
        this.div.appendChild(buttonDiv);
    }
}