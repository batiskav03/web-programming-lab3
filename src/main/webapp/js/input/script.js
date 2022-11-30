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
submit_button.addEventListener("click",submit_data)
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






canvasDraw.graph(document.getElementById("graph"), submit_data);

function instantUpload() {
    socket.send(`${leftLimit};${rightLimit}`)
}

// отправка данных на сервер
function submit_data (event ,x = x_absolute,y = y_absolute) {
    if (validate_data(x,y)) {
        fetch("check-servlet?" + "x_absolute=" + x + "&y_absolute=" + y + "&request_type=get_from_DB")
            .then(response => response.text())
            .then(responseText => {
                document.querySelector(".output-table").innerHTML = responseText
                canvasDraw.drawPoint(document.getElementById("graph"), x, y,10,10, "red")
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
                canvasDraw.drawPoint(document.getElementById("graph"), x, y, 5, 5, "blue")
            } else if (y <= currentFuncValue(higherFunc, x, 1 / 120) &&
                y >= currentFuncValue(lowerFunc, x, 1 / 100)) {
                canvasDraw.drawPoint(document.getElementById("graph"), x, y, 5, 5, "green")
            }
        } catch (e) {}
    },5)
}


//забираю массив точек из БД
(function checkAndUpload() {
    let time = new Date().getTime()
    let interval = setInterval( () => {
        new Promise((resolve) => {
            if (bigData.length === 0) {
                socket.send(`${leftLimit};${rightLimit}`)
            } else {
                return resolve("")
            }
        }).catch((err) => {
            throw new Error(err)
        }).then(() => {
            time = new Date().getTime()
        })
    },100)

    setInterval( () => {
        if (new Date().getTime() - time >  3000) {
            clearInterval(interval)
            throw new Error("Server timed out, please refresh your page")
        }
    },5000)

    startAutoProcessing(bigData, higherFunc, lowerFunc)
})()

