const mathFunc = require("../input/mathFunction")




describe("Test function currentFuncValue", () => {
    test("should return value of function ", () => {
        expect(mathFunc.currentFuncValue((x) => x + 1, 1)).toBe(2)
    })
    test("should be null if argument === undefined", () => {
        expect(mathFunc.currentFuncValue((x) => x + 1)).toBeNull()
    })
})


describe("Test function makeMathFunc", () => {
    test("should define function", () => {
        expect(mathFunc.makeMathFunc((x) => x)).toBeDefined()

    })
    test("should return same result",() => {
        let defaultFunc = function foo(x) {
            return Math.sin(x) * Math.PI / 2;
        }
        let makeMathFunc = mathFunc.makeMathFunc((x) => Math.sin(x) * Math.PI / 2)
        expect(makeMathFunc(5)).toEqual(defaultFunc(5))
    })

    test("should return same result",() => {
        let defaultFunc = function foo(x) {
            return Math.log2(x) + Math.sin(Math.cos(x/200)) * Math.exp(x);
        }
        let makeMathFunc = mathFunc.makeMathFunc((x) => Math.log2(x) + Math.sin(Math.cos(x/200)) * Math.exp(x))
        expect(makeMathFunc(5)).toEqual(defaultFunc(5))
    })

    test("should be defined", () => {
        expect(mathFunc.makeMathFunc((x) => x + 1))
    })

})

describe("Test function arrayValueOnSegment", () => {
    test("should return array(simple func)", () => {
        expect(mathFunc.arrayValueOnSegment((x) => {return x + 1}, 1, 5, 1, 1)).toEqual([2,3,4,5])
    })

    test("should return array(with sin)", () =>{
        expect(mathFunc.arrayValueOnSegment((x) => {return Math.sin(x)},0,Math.PI,1,Math.PI/2)).toEqual([0, 1])
    })

    test("should return null if segment is not exist", () => {
        expect(mathFunc.arrayValueOnSegment((x) => x)).toBeNull()
    })
})

