/**
 * The deck editor.
 */
class DeckEditor extends Editor {
    setDeckTemplate: () => void;
    currentDeckTemplate: DeckTemplate;
    /**
     * Creates the deck editor.
     */
    constructor(game: Game) {
        super(game, { onEscapePress: () => game.show(game.formationEditor), onResize: onResize });

        function onConfirm() {
            if (
                self.player === game.secondPlayer ||
                (game.secondPlayer instanceof AIPlayer)
            ) game.show(game.matchScreen);
            else game.show(game.formationEditor);
            self.setDeckTemplate();
        }

        function onResize() {
            var currentDisplay: string = style.display;
            style.display = '';
            var currentDeckDivBoundingRect: ClientRect = currentDeckDiv.getBoundingClientRect();
            var currentDeckDivWidth: number = currentDeckDivBoundingRect.width;
            var cardHeight: number = currentDeckDivBoundingRect.height / ROWS * 0.9;
            var cardWidth: number = cardHeight * 0.75;
            for (var i = 0; i < cards.length; i++) {
                var card: HTMLDivElement = cards[i];
                card.style.left = ((i % 12) / 11 * (currentDeckDivWidth - cardWidth)) + 'px';
                card.style.width = cardWidth + 'px';
                card.style.height = cardHeight + 'px';
            }
        }

        function updateDeckDiv() {
            var currentCard: number = 0;
            for (var card of cards) {
                card.style.backgroundImage = '';
                card.style.backgroundColor = '';
            }
            for (var cardTypePair of game.cardTypes) {
                var cardType: CardType = cardTypePair[1];
                if (cardType.condition() && game.formationEditor.player.formation.hasCard(cardType)) {
                    for (var i: number = 0; i < cardType.amountInDeck; i++) {
                        cards[currentCard].style.backgroundImage = 'url(' + cardType.imgSrc + ')';
                        cards[currentCard].style.backgroundColor = 'black';
                        currentCard++;
                    }
                }
            }
        }

        var CARDS_PER_ROW = 12;
        var ROWS = 4;
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
        var self: DeckEditor = this;
        var cards: Array<HTMLDivElement> = [];
        this.setDeckTemplate = function () {
            this.player.deckTemplate = this.currentDeckTemplate;
        };
        this.onShow = function () {
            for (var cardType of game.cardTypes) {
                if (cardType[1].condition() && game.formationEditor.player.formation.hasCard(cardType[1]))
                    cardType[1].div.style.display = '';
                else cardType[1].div.style.display = 'none';
            }
        }
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
            for (var j = 0; j < CARDS_PER_ROW; j++) {
                var cardDiv: HTMLDivElement = document.createElement('div');
                cardDiv.style.position = 'absolute';
                cardDiv.style.backgroundSize = '100% 75%';
                cardDiv.style.backgroundPositionY = '50%';
                cardDiv.style.backgroundRepeat = 'no-repeat';
                div.appendChild(cardDiv);
                cards.push(cardDiv);
            }
        }
        addEventListener('resize', onResize);
        onResize();
        cardTypesDivStyle.width = CARD_TYPES_DIV_WIDTH_PERCENTAGE + '%';
        cardTypesDivStyle.height = OTHER_DIVS_HEIGHT_PERCENTAGE + '%';
        buttonDivStyle.width = '100%';
        buttonDivStyle.height = BUTTON_DIV_HEIGHT_PERCENTAGE + '%';
        buttonDiv.className = 'centered-flex';
        this.div.appendChild(cardTypesDiv);
        this.div.appendChild(buttonDiv);
        for (var cardTypePair of game.cardTypes) {
            var cardType: CardType = cardTypePair[1];
            var div: HTMLDivElement = cardType.div;
            div.addEventListener('click', (function () {
                this.amountInDeck++;
                updateDeckDiv();
            }).bind(cardType));
            cardTypesDiv.appendChild(div);
        }
    }
}