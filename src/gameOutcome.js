const GameOutcome = {
    "P1Wins": "P1Wins",
    "P2Wins": "P2Wins",
    "Draw": "Draw",
    "NotFinished": "NotFinished",
    "InvalidBoard": "InvalidBoard"
};
Object.freeze(GameOutcome);

function getWinnerOutcome(winner) {
    if (winner === "1") {
        return GameOutcome.P1Wins;
    } else {
        return GameOutcome.P2Wins;
    }
}

module.exports = {GameOutcome, getWinnerOutcome};