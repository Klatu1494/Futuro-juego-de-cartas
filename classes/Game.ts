/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Game {
    createButton: ({ parent, eventListener, label }: {
        parent: HTMLElement;
        eventListener: EventListener;
        label: string;
    }) => HTMLButtonElement;
    completeLevel: () => void;
    cardTypes: Map<string, CardType>;
    unitTypes: Map<string, UnitType>;
    components: ReadonlyMap<Function, Component> = new Map();
    secondPlayer: Player;
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
    private _formationHeight: number;
    /**
     * Creates the game.
     */
    constructor(formationHeight: number) {
        this._formationHeight = formationHeight;
        this.setComponents(new LoadingScreen(this));
    }

    async initialize() {
        var unitTypesImagesLoaders: Array<Promise<HTMLImageElement>> = [];
        var self: Game = this;
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
        this._firstPlayer = new HumanPlayer({ color: "blue", name: 'Karv' });
        this.secondPlayer = new HumanPlayer({ color: "red", name: 'Klatu' });
        this.completeLevel = function () {
            this._currentLevelIndex++;
        }
        this.cardTypes = new Map([
            ['attack', new CardType({
                name: 'Attack',
                onUse: async function () {
                    var user: Unit = await self.matchScreen.askForUnit((unit: Unit) => unit.owner === self.matchScreen.turnOf);
                    var target: Unit = await self.matchScreen.askForUnit((unit: Unit) => unit.owner === self.matchScreen.turnOf && unit.position.distanceTo(user.position) <= user.range);
                    self.matchScreen.damageUnit(target, user.attack);
                },
                imgSrc: 'attack.png',
                description: 'One of your units attack an enemy, subtracting your unit\'s attack from the enemy\'s health. The enemy must be within your unit\'s range.'
            })],
            ['bite', new CardType({
                name: 'Bite',
                onUse: async function () {
                    var user: Unit = await self.matchScreen.askForUnit((unit: Unit) => unit.owner === self.matchScreen.turnOf);
                    var target: Unit = await self.matchScreen.askForUnit((unit: Unit) => unit.owner === self.matchScreen.turnOf && unit.position.distanceTo(user.position) <= 1);
                    self.matchScreen.damageUnit(target, Math.floor(user.attack / 2));
                },
                imgSrc: 'sharp-lips.png',
                description: 'One of your zombies bites an enemy, subtracting half your zombie\'s attack (rounding down) from the enemy\'s health, and transimiting her a random disease. The enemy must be within melee range.'
            })]
        ]);
        this.unitTypes = new Map([
            ['zombie', new UnitType({
                name: 'Zombie',
                imgSrc: 'shambling-zombie.png',
                initialQuantity: 2,
                attack: 2,
                life: 4,
                skills: new Set([this.cardTypes.get('attack'), this.cardTypes.get('bite')])
            })]
        ]);
        this._levels = [
            new Level({ width: 5, height: 10 })
        ];
        this._currentLevelIndex = 0;
        this._menu = new Menu(this);
        this._formationEditor = new FormationEditor(this);
        this._deckEditor = new DeckEditor(this);
        this._matchScreen = new MatchScreen(this)
        this.setComponents(this.components.get(LoadingScreen), this.formationEditor, this.menu, this.deckEditor, this.matchScreen);
        for (var unitType of this.unitTypes) unitTypesImagesLoaders.push(unitType[1].imageLoader);
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

    show(component: Component) {
        for (var div of this._divsOfComponents) div.style.display = 'none';
        component.div.style.display = '';
        component.onShow();
    }

    async executeLengthyFunction(asyncFunc: Function) {
        this.show(this.components.get(LoadingScreen));
        await asyncFunc();
    }

    get formationHeight(): number {
        return this._formationHeight;
    }

    get firstPlayer(): HumanPlayer {
        return this._firstPlayer;
    }

    get menu(): Menu {
        return this._menu;
    }

    get formationEditor(): FormationEditor {
        return this._formationEditor;
    }

    get deckEditor(): DeckEditor {
        return this._deckEditor;
    }

    get matchScreen(): MatchScreen {
        return this._matchScreen;
    }

    get currentLevel(): Level {
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