let leftButton = document.querySelector(".carousel-btn-left")
let rightButton = document.querySelector(".carousel-btn-right")

var backgroundCounter = 1;
setInterval(() => {
    let bckgd = document.querySelector(".main-bckgd")
    backgroundCounter %= 3;
    backgroundCounter += 1;
    bckgd.style.backgroundImage = 'url("/static/img/background-image' + backgroundCounter + '.jpg")';
}, 15000)


leftButton.onclick = (e) => {
    let canvas = e.target.parentNode.parentNode;
    backgroundCounter %= 3;
    backgroundCounter += 1;
    canvas.style.backgroundImage = 'url("/static/img/background-image' + backgroundCounter + '.jpg")';
}

rightButton.onclick = (e) => {
    let canvas = e.target.parentNode.parentNode;
    backgroundCounter -= 1;
    if (backgroundCounter == -1) {
        backgroundCounter *= 3;
    }
    if (backgroundCounter == 0) {
        backgroundCounter += 3;
    }
    canvas.style.backgroundImage = 'url("/static/img/background-image' + backgroundCounter + '.jpg")';
}