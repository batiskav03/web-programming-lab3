const mathFunc = require("../input/mathFunction")


test("currentFuncValue should return value of function ", () => {
    expect(mathFunc.currentFuncValue((x) => x + 1, 1)).toBe(2)
})

test("makeMathFunc define function", () => {
    expect(mathFunc.makeMathFunc((x) => x)).toBeDefined()
})


test("makeMathFunc should return math function",() => {
    expect(mathFunc.makeMathFunc((x) => x + 1).toString()).toEqual((function foo(x)  { return x + 1 }).toString())
})

test("makeMathFunc should be defined", () => {
    expect(mathFunc.makeMathFunc((x) => x + 1))
})

test("arrayValueOnSegment should return array", () => {
    expect(mathFunc.arrayValueOnSegment((x) => {return x + 1}, 1, 5, 1, 1)).toEqual([2,3,4,5])
})

test("arrayValueOnSegment should return array(with sin)", () =>{
    expect(mathFunc.arrayValueOnSegment((x) => {return Math.sin(x)},0,Math.PI,1,Math.PI/2)).toEqual([0, 1])
})