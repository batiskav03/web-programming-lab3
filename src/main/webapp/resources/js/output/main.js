(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let funcMath = require("./mathFunction")


// данные для работы с canvas
const WIDTH = 700;
const HEIGHT = 400;
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const ROWS_COUNT = 10
const COLUMN_COUNT = 10
const PADDING = 40
let higherCurrentFunc = funcMath.makeMathFunc((x) => Math.sin(x)*20 + 600)
let lowerCurrentFunc = funcMath.makeMathFunc((x) => Math.sin(x)*50 + 200)
// рабочая область
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const STEP_ORDINATE = VIEW_HEIGHT / ROWS_COUNT
const STEP_ABSCISS = DPI_WIDTH / COLUMN_COUNT
const EXT = graphExt()
const textStep = (EXT[0] - EXT[1]) / ROWS_COUNT



function setCanvasContext(canvas) {
    const ctx = canvas.getContext("2d")
    canvas.style.width = WIDTH + "px"
    canvas.style.height = HEIGHT + "px"
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT
    return ctx;
}

function drawSimpleGraph(func, argumentMod = 1, accuracy = 0.2 , ctx) {
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "#D2FDFF"
    let x = 0
    funcMath.arrayValueOnSegment(func, 0, DPI_WIDTH, argumentMod, accuracy )
        .forEach((point) => {
            ctx.lineTo(x, DPI_HEIGHT - PADDING - point)
            x += accuracy
        })

    ctx.stroke()
    ctx.closePath()
}

function makeOrdinateValues(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = "#8884FF"
    ctx.font = "normal 30px GOST type B"
    ctx.fillStyle = "#8884FF"
    for (let i = 1; i <= ROWS_COUNT; i++) {
        const y = STEP_ORDINATE * i
        const text = EXT[0] - textStep * i
        ctx.moveTo(0, y + PADDING)
        ctx.lineTo(DPI_WIDTH, y + PADDING)
        ctx.fillText(text,0,y + PADDING)
    }
    ctx.stroke()
    ctx.closePath()
}

function makeAbscissaValues(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = "#8884FF"
    ctx.font = "normal 30px GOST type B"
    ctx.fillStyle = "#8884FF"
    for (let i = 1; i <= COLUMN_COUNT; i++) {
        const x = STEP_ABSCISS * i
        ctx.moveTo(x, DPI_HEIGHT)
        ctx.lineTo(DPI_HEIGHT, x)
        ctx.fillText(x.toString(), x, DPI_HEIGHT)
    }

    ctx.closePath()
}

//отрисовка графика
function graph(canvas,cb) {
    const ctx = setCanvasContext(canvas)
    canvas.addEventListener('click', createDot)
    function createDot(event) {
        let rect = canvas.getBoundingClientRect()
        cb(null , parseInt((event.x - rect.left) * 2), parseInt((HEIGHT - (event.y - rect.top)) * 2 - PADDING))
    }
    makeOrdinateValues(ctx)
    makeAbscissaValues(ctx)
    drawSimpleGraph(higherCurrentFunc, 1 / 120, 0.1, ctx)
    drawSimpleGraph(lowerCurrentFunc, 1 / 100, 0.1, ctx)
}

// точка(квадрат)
function drawPoint(canvas,x,y,weight,height,color) {
    const ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.fillStyle = color ;
    ctx.fillRect(x,DPI_HEIGHT - PADDING - y,weight,height)
    ctx.fill()
}

// вычисление минимального и максимального значения функции (extremum)
function graphExt() {
    let max = 0
    let min = 1000000
    for (let i = 0; i <= 1400; i+=5){
        if (lowerCurrentFunc(i/100) < min) {
            min = Math.round(lowerCurrentFunc(i/100))
        }
        if (higherCurrentFunc(i/120) > max)    {
            max = Math.round(higherCurrentFunc(i/120))
        }
    }
    return [max,min]
}

module.exports = {
    graph: graph,
    drawPoint: drawPoint,

}


},{"./mathFunction":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
// import modules
let funcMath = require("./mathFunction")
let canvasDraw = require("./canvas")
const {currentFuncValue} = require("./mathFunction");


//all variables
let x_absolute,y_absolute
let leftLimit = 0
let rightLimit = 1400
let bigData = [] // array with dots from server
let inputX = document.querySelector(".xnumber")
let inputY = document.querySelector(".ynumber")
let submit_button = document.querySelector(".submit")
let leftRange = document.querySelector(".xLeftlimit")
let rightRange = document.querySelector(".xRightlimit")
const lowerFunc = funcMath.makeMathFunc((x) => Math.sin(x)*50 + 200)
const higherFunc =  funcMath.makeMathFunc((x) => Math.sin(x)*20 + 600)

// create client endpoint
let socket = new WebSocket("ws://localhost:8080/servlets-1.0/trade")
socket.onclose = function () {
    console.log("Соединение разорвано")
}
socket.onopen = function () {
    console.log("Соединение успешно перешло на протокол WebSocket")
}
socket.onmessage = function (event) {
    let arr = JSON.parse(event.data)
    for (str of arr) {
        bigData.push(str)
    }
}

// all listeners
inputX.addEventListener("input", (elem) => {x_absolute = elem.target.value})
inputY.addEventListener("input", (elem) => {y_absolute = elem.target.value})
submit_button.addEventListener("click",submitData)
leftRange.addEventListener("change",(e) => {
    leftLimit = e.target.value
    document.querySelector(".leftLabel").innerHTML = "Область прорисовки по X:   " + leftLimit
    instantUpload()
})
rightRange.addEventListener("change", (e) => {
    rightLimit = e.target.value;
    document.querySelector(".rightLabel").innerHTML = "Область прорисовки X:" + rightLimit
    instantUpload()
})






canvasDraw.graph(document.getElementById("graph"), submitData);

function instantUpload() {
    socket.send(`${leftLimit};${rightLimit}`)
}

// отправка данных на сервер
function submitData (event ,x = x_absolute,y = y_absolute) {
    if (validate_data(x,y)) {
        fetch("check-servlet?" + "x_absolute=" + x + "&y_absolute=" + y + "&request_type=get_from_DB")
            .then(response => response.text())
            .then(responseText => {
                document.querySelector(".output-table").innerHTML = responseText
                canvasDraw.drawPoint(document.getElementById("graph"), x, y,10,10, "#E26D5A")
                fetch("check-servlet?" + "x_absolute=" + x + "&y_absolute=" + y + "&request_type=write_into_DB")
            })
    } else {
        document.querySelector(".wrong_data").innerHTML = "Данные введены некоректно"
        setTimeout(() =>{document.querySelector(".wrong_data").innerHTML = ""} ,5000)
    }
}

// проверка правильности введенных данных:
function validate_data(x,y){
    return ($.isNumeric(x) && $.isNumeric(y))
}


// прорисовывание пользовательских точек
function startAutoProcessing(dotsArray, higherFunc ,lowerFunc) {
    setInterval(() => {
        try {
            x = Number(bigData[0][0])
            y = Number(bigData[0][1])
            bigData.splice([0], 1)
            if (y <= currentFuncValue(higherFunc, x, 1 / 120) &&
                y >= currentFuncValue(lowerFunc, x, 1 / 100) &&
                x >= leftLimit && x <= rightLimit) {
                canvasDraw.drawPoint(document.getElementById("graph"), x, y, 5, 5, "#D2FDFF")
            } else if (y <= currentFuncValue(higherFunc, x, 1 / 120) &&
                y >= currentFuncValue(lowerFunc, x, 1 / 100)) {
                canvasDraw.drawPoint(document.getElementById("graph"), x, y, 5, 5, "#8884FF")
            }
        } catch (e) {}
    },5)
}


function requestOnServer(arrData, leftLimit, rightLimit, timer) {
    return new Promise((resolve) => {
        if (arrData.length === 0) {
            socket.send(`${leftLimit};${rightLimit}`)
        } else {
            return resolve("")
        }
    }).catch((err) => {
        throw new Error(err)
    }).then(() => {
        timer = new Date().getTime()
        return timer;
    })
}



//забираю массив точек из БД
function checkAndUpload() {
    let time = new Date().getTime()
    let interval = setInterval( () => {
        requestOnServer(bigData, leftLimit, rightLimit, time).then((data) => time = data)
    },100)
    let timeInterval = setInterval( () => {
        if (new Date().getTime() - time >  3000) {
            clearInterval(interval)
            clearInterval(timeInterval)
            throw new Error("Server timed out, please refresh your page")
        }
    },5000)
    startAutoProcessing(bigData, higherFunc, lowerFunc)

    return {
        interval: interval,
        timeInterval: timeInterval
    }

}
let intervals = checkAndUpload()

document.querySelector(".dotsButton").addEventListener("click", (event) => {
    if (parseInt(event.target.attributes[1].value)) {
        event.target.attributes[1].value = "0"
        event.target.innerHTML = "run uploading"
        clearInterval(intervals.interval)
        clearInterval(intervals.timeInterval)
        $(".dotsButton").css("background-color", "#E26D5A")
    } else {
        $(".dotsButton").css("background-color", "#9297C4")
        event.target.attributes[1].value = "1"
        event.target.innerHTML = "stop uploading"
        intervals = checkAndUpload()
    }



})

module.exports = {
    requestOnServer: requestOnServer,

}
},{"./canvas":1,"./mathFunction":2}]},{},[3]);
