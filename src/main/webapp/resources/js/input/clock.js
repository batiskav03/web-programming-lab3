function getTime(htmlElement) {
    let date = new Date();
    let year = date.getFullYear().toString()
    let mouth = date.getMonth().toString()
    let day = date.getDate().toString()
    let hours = date.getHours().toString()
    let minutes = date.getMinutes().toString()
    console.log(htmlElement)
    htmlElement.innerHTML = "<h2>" + hours + ":" + minutes + "<p>" + day + "." + mouth + "." + year + "</p>" + "<h2>"
    return [year, mouth, day, hours, minutes]
}
getTime(document.querySelector(".clock-container"))
