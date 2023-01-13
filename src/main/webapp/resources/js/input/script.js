// import modules
let funcMath = require("./mathFunction")
let canvasDraw = require("./canvas")
let $ = require("jquery")
const {currentFuncValue} = require("./mathFunction");
const {requestOnServer} = require("../input/requestOnServer");


//all variables
let x_absolute,y_absolute
let leftLimit = 0
let rightLimit = 1400
let bigData = [] // array with dots from server
let inputX = document.querySelector(".xnumber")
let inputY = document.querySelector(".ynumber")


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






canvasDraw.graph(document.getElementById("graph"), null);

function instantUpload() {
    socket.send(`${leftLimit};${rightLimit}`)
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






//забираю массив точек из БД
function checkAndUpload() {
    let time = new Date().getTime()
    let interval = setInterval( () => {
        requestOnServer(socket,bigData, leftLimit, rightLimit, time).then((data) => time = data)
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

document.getElementById("graph").onmouseup = function (event) {

    let canvas = document.getElementById("graph")
    let rect = canvas.getBoundingClientRect()
    let x = parseInt((event.x - rect.left) * 2)
    let y = parseInt((400 - (event.y - rect.top)) * 2 - 40)
    document.getElementById("j_idt29:hidden-x").value = x
    document.getElementById("j_idt29:hidden-y").value = y
    document.getElementById("j_idt29:hidden-form").click()
    canvasDraw.drawPoint(document.getElementById("graph"),x, y,10,10, "#E26D5A")
}


