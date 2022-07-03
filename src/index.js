"use strict";

// const Game = require("./game");
const ExhaustiveSearchPlayer = require("./player/exhaustiveSearch");
// const HumanPlayer = require("./player/human");
const JsonDatabase = require("./database/plain.js");


const database = new JsonDatabase({file_path: "values.json", autoCommit: 1000});
const p1 = new ExhaustiveSearchPlayer(1, database);
p1.train();

// const p2 = new HumanPlayer();
// const game = new Game(p1, p2);

// game.play();