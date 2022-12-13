/*
  funcSignature like:
 (x) => x + 1; OR (x) => Math.sin(x) * 20 + 100;
*/
function makeMathFunc(funcSignature) {
    if (!funcSignature)
        return function (x) {return x}
    return function (x) {
        return funcSignature(x)
    };
}

/*
    Parameter argumentMod exists for situations when we use, for example, the Math library. It multiplies the parameter by a constant
*/
function currentFuncValue(myFunc, value, argumentMod = 1) {
    if (value === undefined)
        return null

    return myFunc(value*argumentMod)
}


/*
    With the parameters (from) & (to) we set the segment, in which the values will be calculated
    Parameter argumentMod exists for situations when we use, for example, the Math library. It multiplies the parameter by a constant
*/
function arrayValueOnSegment(myFunc, from, to, argumentMod = 1, accuracy = 0.1) {
    if(!(from || to))
        return null
    let arr = [];
    for (let i = from; i < to; i+=accuracy ) {
        arr.push(currentFuncValue(myFunc, i ,argumentMod))
    }

    return arr;
}


module.exports = {
    makeMathFunc: makeMathFunc,
    arrayValueOnSegment: arrayValueOnSegment,
    currentFuncValue: currentFuncValue
}