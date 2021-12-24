function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let back = document.querySelector(".background");
let preparedString = 'url("/static/img/personal-cabinet-';
let numberOfPhoto = getRandomInt(4);


back.style.backgroundImage = preparedString + numberOfPhoto + '.jpg")';
back.style.backgroundSize = "cover";
back.style.backgroundPosition = "center";