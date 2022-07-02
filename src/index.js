const Game = require("./game");
const ExhaustiveSearchPlayer = require("./player/exhaustiveSearch");
const HumanPlayer = require("./player/human");

const p1 = new HumanPlayer();
const p2 = new ExhaustiveSearchPlayer(2, {});
const game = new Game(p1, p2);

game.play();