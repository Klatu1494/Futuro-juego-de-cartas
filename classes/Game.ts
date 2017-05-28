/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Game {
    show: (component: Component) => void;
    createButton: ({ parent, eventListener, label }: {
        parent: HTMLElement;
        eventListener: EventListener;
        label: string;
    }) => HTMLButtonElement;
    completeLevel: () => void;
    cardTypes: ReadonlyArray<CardType>;
    unitTypes: ReadonlyArray<UnitType>;
    components: ReadonlyMap<Function, Component> = new Map();
    secondPlayer: Player;
    width: number = innerWidth;
    height: number = innerHeight;
    private _currentLevelIndex: number;
    private _firstPlayer: HumanPlayer;
    private _divsOfComponents: ReadonlyArray<HTMLDivElement>;
    private _levels: ReadonlyArray<Level>;
    private _buttonWidth: number;
    private _buttonHeight: number;
    private _margin: number;
    private _matchScreen: MatchScreen;
    private _deckEditor: DeckEditor;
    private _formationEditor: FormationEditor;
    private _menu: Menu;
    /**
     * Creates the game.
     */
    constructor() {
        this.setComponents(new LoadingScreen(this));
        this.show = function (component: Component) {
            for (var div of this._divsOfComponents) div.style.display = 'none';
            component.div.style.display = '';
            component.onShow();
        };
    }

    async initialize() {
        var unitTypesImagesLoaders: Array<Promise<HTMLImageElement>> = [];
        this.buttonWidth = 118;
        this.buttonHeight = 35;
        this.margin = 8;
        this.createButton = function (
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
        this._matchScreen = new MatchScreen(this)
        this.setComponents(this.components.get(LoadingScreen), this.formationEditor, this.menu, this.deckEditor, this.matchScreen);
        for (var unitType of this.unitTypes) unitTypesImagesLoaders.push(unitType.imageLoader);
        await Promise.all(unitTypesImagesLoaders).then(images => this.formationEditor.addEventListeners(this.unitTypes));
    }

    private setComponents(...array: Array<Component>) {
        var divsArray: Array<HTMLDivElement> = [];
        var mapArray: Array<[Function, Component]> = [];
        for (var component of array) {
            divsArray.push(component.div);
            mapArray.push([component.constructor, component]);
        }
        this._divsOfComponents = divsArray;
        this.components = new Map(mapArray);
    };

    async executeLengthyFunction(asyncFunc: Function) {
        this.show(this.components.get(LoadingScreen));
        await asyncFunc();
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

    get buttonWidth(): number {
        return this._buttonWidth;
    }

    set buttonWidth(value: number) {
        if (this._buttonWidth) throw new Error('The buttons width is already set.');
        this._buttonWidth = value;
    }

    get buttonHeight(): number {
        return this._buttonHeight;
    }

    set buttonHeight(value: number) {
        if (this._buttonHeight) throw new Error('The buttons height is already set.');
        this._buttonHeight = value;
    }

    get margin(): number {
        return this._margin;
    }

    set margin(value: number) {
        if (this._margin) throw new Error('The margin is already set.');
        this._margin = value;
    }
}