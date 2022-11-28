let x_absolute,y_absolute
let leftLimit = 0
let rightLimit = 1400
let x
let inputX = document.querySelector(".xnumber")
let inputY = document.querySelector(".ynumber")
let submit_button = document.querySelector(".submit")
let leftRange = document.querySelector(".xLeftlimit")
let rightRange = document.querySelector(".xRightlimit")


// все слушатели(почти)
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




// отправка данных на сервер
function submit_data (x = x_absolute,y = y_absolute){
    if (arguments[2]) {
    let rect = arguments[2].getBoundingClientRect();
    y =  (HEIGHT - (y - rect.top)) * 2 - PADDING;
    x = parseInt((x - rect.left) * 2,10);

    } else {
        x = x_absolute;
    }
    if (validate_data(x,y)) {
        fetch("check-servlet?" + "x_absolute=" + x + "&y_absolute=" + y + "&request_type=get_from_DB")
            .then(response => response.text())
            .then(responseText => {
                document.querySelector(".output-table").innerHTML = responseText
                if (arguments[2]) {
                    drawPoint(document.getElementById("graph"), x, y,10,10, "red")
                } else if (y <= (Math.sin(x/120)*20 + 600) && y >= (Math.sin(x/100)*50 + 200)) {
                    drawPoint(document.getElementById("graph"), x, y,10,10, "red")
                }
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



// данные для работы с canvas
const WIDTH = 700
const HEIGHT = 400
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const ROWS_COUNT = 10
const COLUMN_COUNT = 10
const PADDING = 40



// рабочая область
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2


const STEP_ORDINATE = VIEW_HEIGHT / ROWS_COUNT
const STEP_ABSCISS = DPI_WIDTH / COLUMN_COUNT
const EXT = graphExt()
const textStep = (EXT[0] - EXT[1]) / ROWS_COUNT


//отрисовка графика
function graph(canvas) {
    const ctx = canvas.getContext("2d")
    canvas.style.width = WIDTH + "px"
    canvas.style.height = HEIGHT + "px"
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT


    canvas.addEventListener('click', createDot);

    function createDot(event) {
        submit_data(event.x, event.y, canvas)
    }

    // линии по y
    ctx.beginPath()
    ctx.strokeStyle = "#bbb"

    // отрисока "сеточки"
    ctx.font = "normal 20px GOST type B"
    ctx.fillStyle = "#96a2aa"
        for (let i = 1; i <= ROWS_COUNT; i++) {
            const y = STEP_ORDINATE * i
            const text = EXT[0] - textStep * i
            ctx.moveTo(0, y + PADDING)
            ctx.lineTo(DPI_WIDTH, y + PADDING)
            ctx.fillText(text,0,y + PADDING)
        }
        ctx.stroke()
        for (let i = 1; i <= COLUMN_COUNT; i++) {
            const x = STEP_ABSCISS * i
            ctx.moveTo(x, DPI_HEIGHT)
            ctx.lineTo(DPI_HEIGHT, x)
            ctx.fillText(x.toString(), x, DPI_HEIGHT)
        }
        ctx.closePath()

    // отрисовываем ограничение сверху
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "red"
    for (let i = 0; i < 1400; i+=0.2) {
        ctx.lineTo(i,DPI_HEIGHT - PADDING - (Math.sin(i/120)*20 + 600))
    }
    ctx.stroke()
    ctx.closePath()

    // отрисовываем ограничение снизу
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "red"
    for (let i = 0; i < 1400; i+=0.2) {
        ctx.lineTo(i,DPI_HEIGHT - PADDING -(Math.sin(i/100)*50 + 200))
    }
    ctx.stroke()
    ctx.closePath()
}

// точка(квадрат)
function drawPoint(canvas,x,y,weight,height,color) {
    const ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.fillStyle = color ;
    ctx.fillRect(x,DPI_HEIGHT - PADDING - y,weight,height)
    ctx.fill()
}


// получение информации с сервера и дальнейщий ее парсинг
let bigData = [] // массив со всеми точками из БД


// Создаем WebSocket соединение для передачи точек
let socket = new WebSocket("ws://localhost:8080/demo-1.0-SNAPSHOT/trade")

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

// вычисление минимального и максимального значения функции (extremum's)
function graphExt() {
    let max = 0
    let min = 1000000
    for (let i = 0; i <= 1400; i+=10){
        if ((Math.sin(i/100)*50 + 200) < min) {
            min = Math.round(Math.sin(i/100)*50 + 200)
        }
       if (Math.sin(i/120)*20 + 600 > max)    {
           max = Math.round(Math.sin(i/120)*20 + 600)
       }
    }
    return [max,min]
}


// прорисовывание пользовательских точек
setTimeout(() => {
    setInterval(() => {
        x = Number(bigData[0][0])
        y = Number(bigData[0][1])
        bigData.splice([0],1)
        if (y <= (Math.sin(x/120)*20 + 600) && y >= (Math.sin(x/100)*50 + 200) && x >= leftLimit && x <= rightLimit){
            drawPoint(document.getElementById("graph"),x,y,5,5,"blue")
        }  else if (y <= (Math.sin(x/120)*20 + 600) && y >= (Math.sin(x/100)*50 + 200)) {
            drawPoint(document.getElementById("graph"),x,y,5,5,"green")
        }
    },1)
},3);



//забираю массив точек из БД
setTimeout(function checkAndUpload () {
    setTimeout( () => {
        if (bigData.length === 0){
            socket.send(`${leftLimit};${rightLimit}`)
        }
        checkAndUpload();
    },100)
},1000)


graph(document.getElementById("graph"))



function instantUpload() {
    socket.send(`${leftLimit};${rightLimit}`)
}