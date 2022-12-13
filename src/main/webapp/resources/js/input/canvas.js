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

