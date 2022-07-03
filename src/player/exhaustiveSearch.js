"use strict";

const Board = require("../board");
const {GameOutcome, getWinnerOutcome} = require("../gameOutcome");
const { getBestActionsFromValues } = require("./utils");

class ExhaustiveSearchPlayer {
    constructor(number, database) {
        this.number = number;
        this.database = database;
        this.reward = {
            win: 1,
            draw: 0,
            lose: -1
        };
        this.winOutcome = getWinnerOutcome(`${this.number}`);

    }

    getAction(board) {
        let values = this.database.get(board);
        if (!values) {
            values = this.evaluateMoves(board);
        }
        const shouldMax = board.nextPlayer() == this.number;
        const action = getBestActionsFromValues(values, shouldMax);
        return action.action;
    }

    evaluateMoves({board, training}) {
        const values = {};
        for (let move of board.getValidMoves()) {
            const newBoard = board.copy();
            newBoard.makeMove(move);
            const outcome = newBoard.getOutcome();

            if (outcome === GameOutcome.NotFinished) {
                const innerValues = this.evaluateMoves({board: newBoard, training: training});
                const shouldMax = newBoard.nextPlayer() == this.number;
                const actions = getBestActionsFromValues(innerValues, shouldMax);
                values[move] = actions.value;
            } else if (outcome === GameOutcome.Draw) {
                values[move] = this.reward.draw;
            } else if (outcome == this.winOutcome) {
                values[move] = this.reward.win;
            } else {
                values[move] = this.reward.lose;
            }
        }

        if (training) {
            this.database.update(board, values);
        }

        return values;
    }

    train() {
        console.log("Starting training...");
        const initTime = new Date();

        const board = new Board();
        this.evaluateMoves({board: board, training: true});
        this.database.commit();

        const finishTime = new Date();
        console.log(`Finished training in ${(finishTime - initTime) / 1000}s`);
    }
}

module.exports = ExhaustiveSearchPlayer;