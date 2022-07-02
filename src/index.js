const Game = require("./game");
const HumanPlayer = require("./player/human");

const p1 = new HumanPlayer();
const p2 = new HumanPlayer();
const game = new Game(p1, p2);

game.play();