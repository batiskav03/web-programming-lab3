const {requestOnServer} = require("../input/requestOnServer");


describe("requestOnServer", () => {
    let bigData;
    let socket;
    beforeEach(() => {
        bigData = [];
        socket = {send: jest.fn(() => {
                return socket.onmessage("[[269,538],[318,604]]")
        }),
            onmessage: function (msg) {
                let arr = JSON.parse(msg)
                for (str of arr) {
                    bigData.push(str)
                }
            },
        }
    })
    test("should call socket.send", () => {
        const socket = {send: jest.fn()}
        requestOnServer(socket,[],1,1, new Date())
        expect(socket.send.call.length).toBe(1);
    })

    test("array should stay Truthy", () => {
        requestOnServer(socket,bigData, 1, 1400, new Date())
        expect(bigData).toBeTruthy()

    })
    test("should append values into array", () => {
        requestOnServer(socket,bigData, 1, 1400, new Date())
        expect(bigData.length).toBe(2)

    })
    test("should append values into array", () => {
        requestOnServer(socket,bigData, 1, 1400, new Date())
        expect(bigData).toEqual([[269,538],[318,604]])

    })
    test("should append values into array", () => {
        bigData = [[1,2]]
        requestOnServer(socket,bigData, 1, 1400, new Date())
        expect(bigData).toEqual([[1,2]])

    })

})

























