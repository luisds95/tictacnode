const Board = require("../board.js");
const ExhaustiveSearchPlayer = require("./exhaustiveSearch.js");

it.each`
    state           | expected
    ${"121221000"}  | ${{6: -1, 7: 0, 8: 1}}
`("From $state evaluated moves should be $expected", ({state, expected}) => {
    const board = new Board(state);
    const player = new ExhaustiveSearchPlayer(1, {});
    
    const values = player.evaluateMoves({board: board});

    expect(values).toEqual(expected);
});
