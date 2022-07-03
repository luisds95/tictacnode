"use strict";

function getBestActionsFromValues(values, maximize) {
    let bestAction = null;
    let bestValue = 100;
    if (maximize) {
        bestValue *= -1;
    }
    for (const [action, value] of Object.entries(values)) {
        if ((maximize && value > bestValue) || (!maximize && value < bestValue)) {
            bestValue = value;
            bestAction = action;
        } 
    }
    return {action: parseInt(bestAction), value: bestValue};
}

module.exports = {
    getBestActionsFromValues
};