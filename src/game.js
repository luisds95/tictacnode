"use strict";

const Board = require("./board");
const { GameOutcome } = require("./gameOutcome");

class Game {
    constructor(p1, p2) {
        this.board = null;
        this.p1 = p1;
        this.p2 = p2;
    }

    play() {
        this.new();
        while (this.board.getOutcome() === GameOutcome.NotFinished) {
            let action = null;
            if (this.board.nextPlayer() === 1) {
                action = this.p1.getAction(this.board);
            } else {
                action = this.p2.getAction(this.board);
            }
            this.board.makeMove(action);
        }
        console.log(`Game finished! ${this.board.getOutcome()}`);
    }

    new() {
        this.board = new Board();
    }

    switchPlayers() {
        const oldP1 = this.p1;
        this.p1 = this.p2;
        this.p2 = oldP1;
    }    
}

module.exports = Game;