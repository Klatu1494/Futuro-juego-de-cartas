/**
 * @fileoverview Contains the Game class declaration and
 *     can contain definitions of the class' prototype's properties.
 */

/**
 * The game.
 * @class
 */
class Menu extends GameComponent {
    newMatch: Function;
    /**
     * Creates the game.
     */
    constructor(game: Game) {
        super(game, {});

        this.addButton('Single player', () => {
            game.show(game.formationEditor);
        });
    }

    private addButton(label: string, eventListener: EventListener) {
        var button = document.createElement('div');
        button.innerText = label;
        button.className = 'button';
        button.addEventListener('click', eventListener);
        this.div.appendChild(button);
    }
}