const WebSocket = require("ws")
const {requestOnServer} = require("../output/main");

describe("requestOnServer", () => {
    test("should call socket.send", () => {
        const socket = {send: jest.fn()}
        requestOnServer(socket,[],1,1, new Date())
        expect(socket.send.calls.length).toBe(1);
    })


})

























