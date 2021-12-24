function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function avatarBtnFunc(e) {
    let parentBlock = e.target.parentNode
    let token = getCookie("csrftoken")
    parentBlock.innerHTML = `
    <a class="white-text custom-btn cancel-updating-btn">Cancel</a>
    <form action="addPlayerImage" method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrfmiddlewaretoken" value=` + token + `>
    <div class="file-field input-field">
    <div class="btn grey darken-3 white-text">
    <span>File</span>
    <input type="file" accept="image/*" class="white-text" name="newAvatar">
    </div>
    <div class="file-path-wrapper">
    <input class="file-path validate" type="text">
    </div>
    </div>
    <button type="submit" class="update-avatar-btn custom-btn" style="margin-left: 35%">Submit</button>
    </form>`
    let cancelBtn1 = document.querySelector(".cancel-updating-btn")
    cancelBtn1.onclick = (e) => { cancelBtnFunc(e) }
}

function cancelBtnFunc(e) {
    e.target.parentNode.innerHTML = "<a class=\"white-text custom-btn update-avatar-btn\">Update avatar</a>"
    let addBtn1 = document.querySelector(".update-avatar-btn")
    addBtn1.onclick = (e) => { avatarBtnFunc(e) }
}
let avatarBtn = document.querySelector(".update-avatar-btn")
avatarBtn.onclick = (e) => {
    avatarBtnFunc(e)
}