let spinBtn = document.querySelector(".spin-wheel-button")
spinBtn.onclick = (e) => {
    let wheel = document.querySelector(".box")
    let degrees = Math.floor(Math.random() * 1980)
    wheel.style.transform = "rotate(" + degrees + "deg)";
}