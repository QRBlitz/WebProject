function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

var userDeletingBtns = document.querySelectorAll(".user-deleting-btn")
userDeletingBtns.forEach(btn => {
    btn.onclick = (e) => {
        let token = getCookie("csrftoken")
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "csrftoken=" + token);

        var formdata = new FormData();
        formdata.append("csrfmiddlewaretoken", token);
        formdata.append("user_id", e.target.parentNode.getAttribute("user_id"))

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/deleteUser", requestOptions)
            .then(response => response.json())
            .then(result => {
                M.toast({ html: '<h5>' + result.msg + '<h5>' })
                let parentBlock = e.target.parentNode;
                let underline = parentBlock.nextElementSibling;
                parentBlock.remove();
                underline.remove();
            })
            .catch(error => console.log('error', error));
    }
})


function saveUpdatedDataFunc(e) {
    var modal = document.querySelector("#user-details")
    var newData = {}
    var info_fields = document.querySelectorAll(".user-info-field")
    info_fields.forEach(field => {
        newData[field.classList[field.classList.length - 1]] = field.value
    })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let token = getCookie("csrftoken")
    myHeaders.append("Cookie", "csrftoken=" + token);
    myHeaders.append('X-CSRFToken', token);
    var raw = JSON.stringify(newData);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/updateUser", requestOptions)
        .then(response => response.json())
        .then(result => M.toast({ html: '<h5>' + result.msg + '<h5>' }))
        .catch(error => console.log('error', error));

    modal.querySelectorAll(".user-info-field").forEach(field => {
        field.disabled = true
    })
    modal.querySelector(".update-cancelling-btn").remove()
    modal.querySelector(".save-updating-btn").remove()
    var newUpdateBtn = document.createElement("button")
    newUpdateBtn.classList.add("green", "btn", "white-text", "update-allowing-btn", "functionality-btn")
    newUpdateBtn.innerHTML = "UPDATE"
    newUpdateBtn.onclick = e => {
        updateAllowingBtnFunc(e)
    }
    modal.lastElementChild.lastElementChild.appendChild(newUpdateBtn)

}

function cancelUpdatingFunc(e) {
    var modal = document.querySelector("#user-details")
    modal.querySelectorAll(".user-info-field").forEach(field => {
        field.disabled = true
    })
    modal.querySelector(".update-cancelling-btn").remove()
    modal.querySelector(".save-updating-btn").remove()
    var newUpdateBtn = document.createElement("button")
    newUpdateBtn.classList.add("green", "btn", "white-text", "update-allowing-btn", "functionality-btn")
    newUpdateBtn.innerHTML = "UPDATE"
    newUpdateBtn.onclick = e => {
        updateAllowingBtnFunc(e)
    }
    modal.lastElementChild.lastElementChild.appendChild(newUpdateBtn)

}

function updateAllowingBtnFunc(e) {
    var modal = document.querySelector("#user-details")
    modal.querySelectorAll(".user-info-field").forEach(field => {
        field.disabled = false
    })
    var newCancelBtn = document.createElement("button")
    newCancelBtn.classList.add('red', "btn", "white-text", "update-cancelling-btn", "functionality-btn")
    newCancelBtn.innerHTML = "CANCEL"
    newCancelBtn.onclick = e => {
        cancelUpdatingFunc(e)
    }
    modal.lastElementChild.lastElementChild.appendChild(newCancelBtn)
    var newSaveBtn = document.createElement("button")
    newSaveBtn.classList.add("blue", "btn", "white-text", "save-updating-btn", "functionality-btn")
    newSaveBtn.innerHTML = "SAVE"
    newSaveBtn.onclick = e => {
        saveUpdatedDataFunc(e)
    }
    modal.lastElementChild.lastElementChild.appendChild(newSaveBtn)
    e.target.remove()
}

var updateAllowingBtn = document.querySelector(".update-allowing-btn")
updateAllowingBtn.onclick = e => { updateAllowingBtnFunc(e) }


var userUpdateBtns = document.querySelectorAll(".user-update-btn")
userUpdateBtns.forEach(btn => {
    btn.onclick = e => {
        var modal = document.querySelector("#user-details")
        var newCancelBtn = document.createElement("button")
        newCancelBtn.classList.add('red', "btn", "white-text", "update-cancelling-btn", "functionality-btn")
        newCancelBtn.innerHTML = "CANCEL"
        newCancelBtn.onclick = e => {
            cancelUpdatingFunc(e)
        }
        if (!modal.querySelector(".update-cancelling-btn")) {
            modal.lastElementChild.lastElementChild.appendChild(newCancelBtn)
        }
        var newSaveBtn = document.createElement("button")
        newSaveBtn.classList.add("blue", "btn", "white-text", "save-updating-btn", "functionality-btn")
        newSaveBtn.innerHTML = "SAVE"
        newSaveBtn.onclick = e => {
            saveUpdatedDataFunc(e)
        }
        if (!modal.querySelector(".save-updating-btn"))
            modal.lastElementChild.lastElementChild.appendChild(newSaveBtn)
        try {
            modal.querySelector(".update-allowing-btn").remove()

        } catch (error) {

        }
        modal.querySelectorAll(".user-info-field").forEach(field => {
            field.disabled = false
        })
        let token = getCookie("csrftoken")
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "csrftoken=" + token);

        var formdata = new FormData();
        formdata.append("csrfmiddlewaretoken", token);
        formdata.append("user_id", e.target.parentNode.getAttribute("user_id"));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };


        fetch("http://127.0.0.1:8000/api/getUserById", requestOptions)
            .then(response => response.json())
            .then(result => {
                result = JSON.parse(result)
                Object.keys(result[0]['fields']).forEach(key => {
                    try {
                        modal.querySelector("." + key).value = result[0]['fields'][key]
                    } catch (error) {

                    }
                });
                Object.keys(result[1]['fields']).forEach(key => {
                    try {
                        modal.querySelector("." + key).value = result[1]['fields'][key]
                    } catch (error) {}
                });
                var modalHeader = document.querySelector(".modal-user-header")
                modalHeader.innerHTML = result[0]['fields']['first_name'] + " " + result[0]['fields']['last_name'] + " #" + result[0]['pk']
            })
            .catch(error => console.log('error', error));
    }
})

var userDetailsBtn = document.querySelectorAll(".user-details-btn")
userDetailsBtn.forEach(btn => {
    btn.onclick = (e) => {
        var modal = document.querySelector("#user-details")
        modal.querySelectorAll(".user-info-field").forEach(field => {
            field.disabled = true
        })
        if (!document.querySelector(".update-allowing-btn")) {
            var newUpdateBtn = document.createElement("button")
            newUpdateBtn.classList.add("green", "btn", "white-text", "update-allowing-btn", "functionality-btn")
            newUpdateBtn.innerHTML = "UPDATE"
            newUpdateBtn.onclick = e => {
                updateAllowingBtnFunc(e)
            }
            modal.lastElementChild.lastElementChild.appendChild(newUpdateBtn)
        }
        try {

            modal.querySelector(".update-cancelling-btn").remove()
            modal.querySelector(".save-updating-btn").remove()
        } catch (error) {

        }
        let token = getCookie("csrftoken")
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "csrftoken=" + token);

        var formdata = new FormData();
        formdata.append("csrfmiddlewaretoken", token);
        formdata.append("user_id", e.target.parentNode.getAttribute("user_id"));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };


        fetch("http://127.0.0.1:8000/api/getUserById", requestOptions)
            .then(response => response.json())
            .then(result => {
                result = JSON.parse(result)
                Object.keys(result[0]['fields']).forEach(key => {
                    try {
                        modal.querySelector("." + key).value = result[0]['fields'][key]
                    } catch (error) {}
                });
                Object.keys(result[1]['fields']).forEach(key => {
                    try {
                        modal.querySelector("." + key).value = result[1]['fields'][key]
                    } catch (error) {}
                });
                var modalHeader = document.querySelector(".modal-user-header")
                modalHeader.innerHTML = result[0]['fields']['first_name'] + " " + result[0]['fields']['last_name'] + " #" + result[0]['pk']
            })
            .catch(error => console.log('error', error));
    }
})


function userCreationRequestSendingBtnFunc(e) {
    var modal = document.querySelector("#user-details")
    var newData = {}
    var info_fields = document.querySelectorAll(".user-info-field")
    info_fields.forEach(field => {
        newData[field.classList[field.classList.length - 1]] = field.value
    })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let token = getCookie("csrftoken")
    myHeaders.append("Cookie", "csrftoken=" + token);
    myHeaders.append('X-CSRFToken', token);
    var raw = JSON.stringify(newData);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/createUser", requestOptions)
        .then(response => response.json())
        .then(result => {
            M.toast({ html: '<h5>' + result.msg + '<h5>' })
            var listOfUsers = document.querySelector(".list-of-items")
            listOfUsers.innerHTML = `<div class="item" user_id="` + result['userId'] + `">
            ` + result['userInfo'] + `
            <a href="#" class="custom-btn-red right black-text user-deleting-btn"
              >Delete</a
            >
            <a href="#user-details" class="custom-btn-green right black-text user-update-btn modal-trigger"
              >Update</a
            >
            <a href="#user-details" class="custom-btn-blue right black-text user-details-btn modal-trigger"
              >Info</a
            >
          </div>
          <hr />` + listOfUsers.innerHTML

        })
        .catch(error => console.log('error', error));
}

var userCreationBtn = document.querySelector(".user-creation-btn")
userCreationBtn.onclick = e => {
    var modal = document.querySelector("#user-details")
    var info_fields = document.querySelectorAll(".user-info-field")
    info_fields.forEach(field => {
        field.value = ""
        field.placeholder = "Type here"
    })
    var modalHeader = document.querySelector(".modal-user-header")
    modalHeader.innerHTML = "New user"
    var functionalityBtns = document.querySelectorAll(".functionality-btn")
    functionalityBtns.forEach(btn => { btn.remove() })
    var newCreatorBtn = document.createElement("button")
    newCreatorBtn.classList.add("btn", "amber", "white-text", "functionality-btn")
    newCreatorBtn.innerHTML = "Add new user"
    newCreatorBtn.onclick = (e) => {
        userCreationRequestSendingBtnFunc(e)
    }
    modal.lastElementChild.lastElementChild.appendChild(newCreatorBtn)
    var info_fields = document.querySelectorAll(".user-info-field")
    info_fields.forEach(field => {
        field.disabled = false
    })
}