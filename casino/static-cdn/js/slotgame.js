function preloadImage(url) {
    const img = new Image();
    img.src = url;
    return img
}

function blurMonitor() {
    document.querySelector(".monitor").style.filter = "blur(5px)";
}

function unBlurMonitor() {
    document.querySelector(".monitor").style.filter = "blur(0px)";
}

function toggleControls(btn) {
    btn.classList.toggle("spin-button")
}


async function rotateSlot(images, btn) {
    blurMonitor()
    toggleControls(btn)

    var currentTime = new Date().getTime()
    var slotsWrappers = document.querySelectorAll(".slot-photo-wrapper")
    var slots = []

    var intervalId = setInterval(() => {
        if (new Date().getTime() - currentTime >= 5000) {
            clearInterval(intervalId);
            unBlurMonitor()
            toggleControls(btn)
        }
        slotsWrappers.forEach(slotWrapper => slots.push(slotWrapper.children[0]))
        slots.forEach(slot => {
            slot.src = images[Math.floor(Math.random() * images.length)].src.slice(22)
        })
    }, 50)




}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

var cherry = preloadImage("static/img/cherry-section.png")
var coin = preloadImage("static/img/coin-section.png")
var seven = preloadImage("static/img/seven-section.png")

var spinButton = document.querySelector(".spin-button")
spinButton.onclick = async(e) => {
    let balance = document.querySelector(".user-balance").innerHTML.slice(0, -1)
    let bet = +document.querySelector(".bet-field").value
    if (+bet > +balance || +bet < 0)
        return false;
    document.querySelector(".user-balance").innerHTML = +balance - +bet + "$"
    if (e.target.classList.contains("spin-button")) {
        rotateSlot([cherry, coin, seven], e.target);
        setTimeout(async() => {
            var cherrys = 0;
            var coins = 0;
            var sevens = 0;
            let slots = document.querySelectorAll(".slot-photo")
            slots.forEach(slot => {
                if (slot.src == cherry.src)
                    cherrys++;
                if (slot.src == coin.src)
                    coins++;
                if (slot.src == seven.src)
                    sevens++;
            })
            if (cherrys == 2 || coins == 2 || sevens == 2) {
                let bet = +document.querySelector(".bet-field").value
                let userId = document.querySelector(".user_id").getAttribute("userId")
                let token = getCookie("csrftoken")
                var myHeaders = new Headers();
                myHeaders.append("X-CSRFToken", token);

                var formdata = new FormData();
                formdata.append("balanceDifference", bet);
                formdata.append("userId", userId);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                fetch("http://127.0.0.1:8000/api/updateBalance", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        let balance = document.querySelector(".user-balance")
                        balance.innerHTML = result.newBalance + "$";
                        let betField = document.querySelector(".bet-field")
                        betField.max = result.newBalance + "$"
                        let totalwin = document.querySelector(".total-win")
                        totalwin.innerHTML = result.balanceChange + "$";
                        M.toast({ html: '<h5>We have a winner!<h5>' })
                    })
                    .catch(error => console.log('error', error));
            } else if (cherrys == 3 || coins == 3 || sevens == 3) {
                let bet = +document.querySelector(".bet-field").value
                let userId = document.querySelector(".user_id").getAttribute("userId")
                let token = getCookie("csrftoken")
                var myHeaders = new Headers();
                myHeaders.append("X-CSRFToken", token);

                var formdata = new FormData();
                formdata.append("balanceDifference", bet * 3);
                formdata.append("userId", userId);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                fetch("http://127.0.0.1:8000/api/updateBalance", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        let balance = document.querySelector(".user-balance")
                        balance.innerHTML = result.newBalance + "$";
                        let betField = document.querySelector(".bet-field")
                        betField.max = result.newBalance + "$"
                        let totalwin = document.querySelector(".total-win")
                        totalwin.innerHTML = result.balanceChange + "$"
                        M.toast({ html: '<h5>Awesome!<h5>' })

                    })
                    .catch(error => console.log('error', error));
            } else {
                let bet = document.querySelector(".bet-field").value
                let userId = document.querySelector(".user_id").getAttribute("userId")
                let token = getCookie("csrftoken")
                var myHeaders = new Headers();
                myHeaders.append("X-CSRFToken", token);
                var formdata = new FormData();
                formdata.append("balanceDifference", -bet);
                formdata.append("userId", userId);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                fetch("http://127.0.0.1:8000/api/updateBalance", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        let balance = document.querySelector(".user-balance")
                        balance.innerHTML = result.newBalance + "$";
                        let betField = document.querySelector(".bet-field")
                        betField.max = result.newBalance + "$";
                        let totalwin = document.querySelector(".total-win")
                        totalwin.innerHTML = "0$"
                        M.toast({ html: '<h5>Try again!<h5>' })
                    })
                    .catch(error => console.log('error', error));
            }
        }, 5000)
    }
}