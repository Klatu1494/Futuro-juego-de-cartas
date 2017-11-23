window.addEventListener('load', async function () {
  var game: Game = new Game(2);

  game.executeLengthyFunction(async function () {
    game.initialize();
    game.show(game.menu);
  });
});