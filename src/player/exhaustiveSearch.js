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
        this.isTraining = false;
        this.winOutcome = getWinnerOutcome(`${this.number}`);
    }

    getAction(board) {
        const values = this.evaluateMoves(board);
        const shouldMax = board.nextPlayer() == this.number;
        const action = getBestActionsFromValues(values, shouldMax);
        return action.action;
    }

    evaluateMoves(board) {
        const values = {};
        for (let move of board.getValidMoves()) {
            const newBoard = board.copy();
            newBoard.makeMove(move);
            const outcome = newBoard.getOutcome();

            if (outcome === GameOutcome.NotFinished) {
                const innerValues = this.evaluateMoves(newBoard);
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

        return values;
    }
}

module.exports = ExhaustiveSearchPlayer;