/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Game extends Component {
    completeLevel: () => void;
    cardTypes: ReadonlyArray<CardType>;
    unitTypes: ReadonlyArray<UnitType>;
    secondPlayer: Player;
    private _currentLevelIndex: number;
    private _loadingScreen: LoadingScreen;
    private _menu: Menu;
    private _formationEditor: FormationEditor;
    private _deckEditor: DeckEditor;
    private _matchScreen: MatchScreen;
    private _firstPlayer: HumanPlayer;
    private _divsOfComponents: ReadonlyArray<HTMLDivElement>;
    private _levels: ReadonlyArray<Level>;
    static wasInstantiated: boolean;
    /**
     * Creates the game.
     */
    constructor() {
        super(document.body, false, 'game');
        this._loadingScreen = new LoadingScreen(this);
        this.setComponents(this._loadingScreen);
    }

    async initialize() {
        var unitTypesImagesLoaders: Array<Promise<HTMLImageElement>> = [];
        GameComponent.buttonWidth = 118;
        GameComponent.buttonHeight = 35;
        GameComponent.margin = 8;
        GameComponent.createButton = function (
            { parent, eventListener = doNothing, label }: { parent: HTMLElement, eventListener: EventListener, label: string }
        ) {
            var button: HTMLButtonElement = document.createElement('button');
            var style: CSSStyleDeclaration = button.style;
            button.innerText = label;
            button.className = 'button';
            style.width = this.buttonWidth + 'px';
            style.height = this.buttonHeight + 'px';
            style.lineHeight = this.buttonHeight + 'px';
            style.margin = this.margin + 'px';
            button.addEventListener('click', eventListener);
            parent.appendChild(button);
            return button;
        }
        this._firstPlayer = new HumanPlayer({ color: null, name: 'Karv' });
        this.secondPlayer = new HumanPlayer({ color: null, name: 'Klatu' });
        this.completeLevel = function () {
            this._currentLevelIndex++;
        }
        this.cardTypes = [
            new CardType({
                name: 'First action',
                onUse: () => {

                }
            }),
            new CardType({
                name: 'Second action',
                onUse: () => {

                }
            })
        ];
        this.unitTypes = [
            new UnitType({
                name: 'Zombie',
                imgSrc: 'images/shambling-zombie.png',
                initialQuantity: 2
            }),
            new UnitType({
                name: 'Farmer',
                imgSrc: 'images/unit1.png',
                initialQuantity: 2 //just testing
            }),
            new UnitType({
                name: 'Warrior',
                imgSrc: 'images/unit2.png',
                initialQuantity: 2 //just testing
            })
        ];
        this._levels = [
            new Level({ width: 5, height: 5 })
        ];
        this._currentLevelIndex = 0;
        this._menu = new Menu(this);
        this._formationEditor = new FormationEditor(this);
        this._deckEditor = new DeckEditor(this);
        this._matchScreen = new MatchScreen(this);
        this.setComponents(this._loadingScreen, this.menu, this.formationEditor, this.deckEditor, this.matchScreen);
        for (var unitType of this.unitTypes) unitTypesImagesLoaders.push(unitType.imageLoader);
        await Promise.all(unitTypesImagesLoaders).then(images => this.formationEditor.addEventListeners(this.unitTypes));
    }

    private setComponents(...array: Array<GameComponent>) {
        var divsArray: Array<HTMLDivElement> = []
        for (var component of array) divsArray.push(component.div);
        this._divsOfComponents = divsArray;
    };

    show(component: GameComponent) {
        for (var div of this._divsOfComponents) div.style.display = 'none';
        component.div.style.display = '';
        component.onShow();
    }

    async executeLengthyFunction(asyncFunc: Function, showThisAfter?: GameComponent) {
        this.show(this._loadingScreen);
        await asyncFunc();
        if (showThisAfter) this.show(showThisAfter);
    }

    get wasInstantiated(): boolean {
        return Game.wasInstantiated;
    }

    get firstPlayer(): HumanPlayer {
        return this._firstPlayer;
    }

    get menu() {
        return this._menu;
    }

    get formationEditor() {
        return this._formationEditor;
    }

    get deckEditor() {
        return this._deckEditor;
    }

    get matchScreen() {
        return this._matchScreen;
    }

    get currentLevel() {
        return this._levels[this._currentLevelIndex];
    }
}