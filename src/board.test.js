const Board = require("./board.js");
const {GameOutcome} = require("./gameOutcome.js");


test("Create a blank board", () => {
    const board = new Board();
    expect(board.toString()).toBe("000000000");
});


test("Create a board", () => {
    const state = "001002120";
    const board = new Board(state);
    expect(board.toString()).toBe(state);
});


test("Pretty board", () => {
    const state = "001002120";
    const board = new Board(state);
    const pretty = " | |X\n-----\n | |O\n-----\nX|O| ";
    expect(board.pretty()).toBe(pretty);
});


it.each`
    state   | move  | expected
    ${"001002120"} | ${1} | ${"011002120"}
    ${"011002120"} | ${0} | ${"211002120"}
`("Make move '$move' in board '$state'", ({state, move, expected}) => {
    const board = new Board(state);
    board.makeMove(move);
    expect(board.toString()).toBe(expected);
});


test("Invalid move in board", () => {
    const state = "001002120";
    const board = new Board(state);
    expect(() => board.makeMove(2)).toThrow(/Invalid move/);
});


it.each`
    state | expected
    ${"011002120"} | ${GameOutcome.NotFinished}
    ${"111002122"} | ${GameOutcome.P1Wins}
    ${"010012210"} | ${GameOutcome.P1Wins}
    ${"100012021"} | ${GameOutcome.P1Wins}
    ${"021012100"} | ${GameOutcome.P1Wins}
    ${"021021120"} | ${GameOutcome.P2Wins}
    ${"121221112"} | ${GameOutcome.Draw}
`("From state '$state' expect outcome is '$expected'", ({state, expected}) => {
    const board = new Board(state);
    expect(board.getOutcome()).toBe(expected);
});


it.each`
    state | move | isValid
    ${"011022122"} | ${null} | ${false}
    ${"211001120"} | ${null} | ${false}
    ${"011002120"} | ${3} | ${true}
    ${"111022120"} | ${3} | ${false}
`("Do not create or move to invalid $state", ({state, move, isValid}) => {
    if (move === null) {
        expect(() => new Board(state)).toThrow(/Invalid board/);
    } else {
        const board = new Board(state);
        if (isValid) {
            board.assertValid();           
        } else {
            expect(() => board.makeMove(move)).toThrow(/Game has finished/);
            expect(board.toString()).toBe(state);
        }        
    }
});


it.each`
    state | moves
    ${"000000000"} | ${[0, 1, 2, 3, 4, 5, 6, 7, 8]}
    ${"121221112"} | ${[]}
    ${"120021112"} | ${[2, 3]}
    ${"111220000"} | ${[]}
    ${"121221120"} | ${[]}
`("Valid moves from $state should be $moves", ({state, moves}) => {
    const board = new Board(state);
    expect(board.getValidMoves()).toEqual(moves);
});


test("Board copy can be modified without affecting original instance", () => {
    const original = new Board("100000000");
    const copy = original.copy();
    copy.makeMove(1);

    expect(original.toString()).toBe("100000000");
    expect(copy.toString()).toBe("120000000");
});