function requestOnServer(socket ,arrData, leftLimit, rightLimit, timer) {
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
module.exports = {
    requestOnServer: requestOnServer,
}