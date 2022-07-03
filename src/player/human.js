"use strict";

const prompt = require("prompt-sync")({sigint: true});

class HumanPlayer {
    getAction(board) {
        console.log(board.pretty());
        const validMoves = board.getValidMoves();
        while (true) {
            const move = parseInt(prompt("Insert your next move: "));
            if (validMoves.includes(move)) {
                return move;
            } else {
                console.log(`Invalid move. Please choose from ${validMoves}`);
            }
        }
    }
}

module.exports = HumanPlayer;