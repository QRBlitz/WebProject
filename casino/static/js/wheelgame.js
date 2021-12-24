let spinBtn = document.querySelector(".spin-wheel-button")
spinBtn.onclick = async(e) => {
    let bet = document.querySelector(".wheel-bet-field").value
    if (bet < 0 || bet > +document.querySelector(".user-wheel-balance").innerHTML.slice(0, -1) || bet == "")
        return null;
    e.target.disabled = true
    let balanceField = document.querySelector(".user-wheel-balance")
    balanceField.innerHTML = +balanceField.innerHTML.slice(0, -1) - +bet + "$";
    let wheel = document.querySelector(".box")
    let degrees = Math.floor(Math.random() * 1980)
    wheel.style.transform = "rotate(" + degrees + "deg)";
    degrees = degrees % 360
    let won = 0
    await new Promise(r => setTimeout(r, 5000));
    let message = ""

    if ((degrees > 90 && degrees <= 135) || (degrees > 180 && degrees < 225) || (degrees > 315 && degrees < 360)) {
        won = 3 * +bet - bet
        message = "We have a winner"
    } else if (degrees > 0 && degrees < 45) {
        won = -balanceField.innerHTML.slice(0, -1) - bet
        message = "Better luck next time"
    } else if (degrees > 225 && degrees < 270) {
        won = 0
        message = "Try again"
    } else if ((degrees > 45 && degrees <= 90) || (degrees > 135 && degrees < 180) || (degrees > 270 && degrees < 315)) {
        won = -bet
        message = "Better luck next time"
    } else {
        won = 0
        message = "Draw"
    }
    let userId = document.querySelector(".user_id").getAttribute("userId")
    let token = getCookie("csrftoken")
    var myHeaders = new Headers();
    myHeaders.append("X-CSRFToken", token);

    var formdata = new FormData();
    formdata.append("balanceDifference", won);
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
            balanceField.innerHTML = result.newBalance + "$";
            let totalwin = document.querySelector(".wheel-total-win")
            totalwin.innerHTML = result.balanceChange + "$";
            M.toast({ html: '<h5>' + message + '<h5>' })
            e.target.disabled = false
        })
        .catch(error => console.log('error', error));
}