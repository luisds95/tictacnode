const {getBestActionsFromValues} = require("./utils.js");

it.each`
    values | expectedMaxAction | expectedMaxValue | expectedMinAction | expectedMinValue
    ${{4: 1, 5: 0, 6: -1, 7: 0}} | ${4} | ${1} | ${6} | ${-1}
`("get actions from values with '$values'", ({
    values, 
    expectedMaxAction, 
    expectedMaxValue,
    expectedMinAction, 
    expectedMinValue
}) => {
    const maximize = getBestActionsFromValues(values, true);
    const minimize = getBestActionsFromValues(values, false);

    expect(maximize.action).toBe(expectedMaxAction);
    expect(maximize.value).toBe(expectedMaxValue);
    expect(minimize.action).toBe(expectedMinAction);
    expect(minimize.value).toBe(expectedMinValue);
});
