const WebSocket = require("ws")

describe("1", () => {
    let send
    bigData = []
    leftLimit = 400
    rightLimit = 800
    modTime = new Date().getTime()
    time = new Date().getTime()
    send = jest.fn((left, right) => {
        arr = []
        for (let i = 0; i <= 250; i++) {
            arr.push([left*Math.random()*10],[right*Math.random()*10])
        }
        return arr;
    })
    test("dont modified array",  () => {
        requestOnServer(bigData, leftLimit, rightLimit, modTime, send)
        expect(bigData.length).toBe(0)
    })
    test("if array is empty will not update timer", () => {
        requestOnServer(bigData, leftLimit, rightLimit, modTime, send)
        expect(modTime).toBe(time)
    })


})

























