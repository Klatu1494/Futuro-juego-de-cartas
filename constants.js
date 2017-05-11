const ACTIONS = new Set().
add({
	name: 'First action',
	onUse: () => {

	}
}).
add({
	name: 'Second action',
	onUse: () => {

	}
});
const AI = 'AI';
const FIRST_COLOR = 'blue';
const HEIGHT = 600;
const HUMAN = 'human';
const LEVELS = [new Level(3, 5)];
const SECOND_COLOR = 'red';
const TILE_BACKGROUND_COLOR = 'white';
const TILE_BORDER_COLOR = 'black';
const TILE_BORDER_WIDTH = 2;
const WIDTH = 800;
const UNIT_TYPES = new Set().
add({
	name: 'Warrior',
	imageSrc: 'images/unit2.png'
});
//these constants must be declared after the previous ones
const HAND_POSITION = HEIGHT < WIDTH ? 'right' : 'bottom';
const HAND_HEIGHT_OR_WIDTH = HAND_POSITION === 'bottom' ? HEIGHT - WIDTH : WIDTH - HEIGHT;