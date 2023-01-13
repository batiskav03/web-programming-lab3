const WebSocket = require("ws")
const {requestOnServer} = require("../input/requestOnServer");


describe("requestOnServer", () => {
    test("should call socket.send", () => {
        const socket = {send: jest.fn()}
        requestOnServer(socket,[],1,1, new Date())
        expect(socket.send.call.length).toBe(1);
    })

    test("array should stay Truthy", () => {
        let bigData = [];
        const socket = {send: jest.fn(() => {
                                                             return socket.onmessage("[[269,538],[318,604]]")}),
                        onmessage: function (msg) {
                            let arr = JSON.parse(msg)
                            for (str of arr) {
                                bigData.push(str)
                            }
                        },
        }
        requestOnServer(socket,bigData, 1, 1400, new Date())
        expect(bigData).toBeTruthy()

    })
    test("should append values into array", () => {
        let bigData = [];
        const socket = {send: jest.fn(() => {
                return socket.onmessage("[[269,538],[318,604]]")}),
            onmessage: function (msg) {
                let arr = JSON.parse(msg)
                for (str of arr) {
                    bigData.push(str)
                }
            },
        }
        requestOnServer(socket,bigData, 1, 1400, new Date())
        expect(bigData.length).toBe(2)

    })
    test("should append values into array", () => {
        let bigData = [];
        const socket = {send: jest.fn(() => {
                return socket.onmessage("[[269,538],[318,604]]")}),
            onmessage: function (msg) {
                let arr = JSON.parse(msg)
                for (str of arr) {
                    bigData.push(str)
                }
            },
        }
        requestOnServer(socket,bigData, 1, 1400, new Date())
        expect(bigData).toEqual([[269,538],[318,604]])

    })
    test("should append values into array", () => {
        let bigData = [[1,2]];
        const socket = {send: jest.fn(() => {
                return socket.onmessage("[[269,538],[318,604]]")}),
            onmessage: function (msg) {
                let arr = JSON.parse(msg)
                for (str of arr) {
                    bigData.push(str)
                }
            },
        }
        requestOnServer(socket,bigData, 1, 1400, new Date())
        expect(bigData).toEqual([[1,2]])

    })

})

























