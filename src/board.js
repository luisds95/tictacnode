const GameOutcome = require("./gameOutcome.js");

class Board {
    constructor(state) {
        if (!state) {
            state = "000000000";
        }
        this.state = state.split("");
        this.charMap = {"0": " ", "1": "X", "2": "O"};

        this.assertValid();
    }

    toString() {
        return this.state.join("");
    }

    pretty() {
        let prettyBoard = "";
        for (let idx = 0; idx < 9; idx++) {
            if (idx > 0 && idx % 3 == 0) {
                prettyBoard += "\n" + "-".repeat(5) + "\n";
            }
            const char = this.charMap[this.state[idx]];
            prettyBoard += char;
            if (idx % 3 != 2) {
                prettyBoard += "|";
            }
        }
        return prettyBoard;
    }

    makeMove(move) {
        if (this.getOutcome() != GameOutcome.NotFinished) {
            throw new Error("Game has finished!");
        } else if (this.state[move] !== "0") {
            throw new Error("Invalid move!");
        }
        const previousPosition = this.state[move];

        this.state[move] = this.nextPlayer();
        try {
            this.assertValid();
        } catch (error) {
            this.state[move] = previousPosition;
            throw error;
        }
    }

    nextPlayer() {
        let zeros = 0;
        for (let char of this.state) {
            if (char === "0") {
                zeros++;
            }
        }

        if (zeros % 2 == 0) {
            return 2;
        } 
        return 1;
    }

    getOutcome() {
        // Find winner horinzontally
        for (let idx = 0; idx < this.state.length; idx += 3) {
            const value = this.state[idx];
            if (value !== "0" && value === this.state[idx+1] && value === this.state[idx+2]) {
                return this._getWinnerOutcome(value);
            }
        }

        // Find winner vertically
        for (let idx = 0; idx < this.state.length; idx++) {
            const value = this.state[idx];
            if (value !== "0" && value === this.state[idx+3] && value === this.state[idx+6]) {
                return this._getWinnerOutcome(value);
            }
        }

        // Find winner diagonally
        const diagonal = this.state[4];
        if (
            diagonal !== "0" && (
                (this.state[0] === diagonal && diagonal === this.state[8]) || 
                (this.state[2] === diagonal && diagonal === this.state[6])
            )
        ) {
            return this._getWinnerOutcome(diagonal);
        }

        // No winners
        if (this.isFull()) {
            return GameOutcome.Draw;
        } else {
            return GameOutcome.NotFinished;
        }
    }

    _getWinnerOutcome(winner) {
        if (winner === "1") {
            return GameOutcome.P1Wins;
        } else {
            return GameOutcome.P2Wins;
        }
    }

    assertValid() {
        let ones = 0;
        let twos = 0;
        for (let char of this.state) {
            if (char === "1") {
                ones++;
            } else if (char === "2") {
                twos++;
            }
        }

        if (ones > twos + 1 || ones < twos) {
            throw new Error("Invalid board");
        }
    }

    isFull() {
        for (let char of this.state) {
            if (char === "0") return false;
        }
        return true;
    }

    getValidMoves() {
        const validMoves = [];
        for (let idx = 0; idx < this.state.length; idx++) {
            if (this.state[idx] === "0") {
                validMoves.push(idx);
            }
        }
        return validMoves;
    }
}

module.exports = Board;