window.addEventListener('load', async function () {
  var game: Game = new Game();

  game.executeLengthyFunction(async function () {
    game.initialize();
    game.show(game.menu);
  });
});