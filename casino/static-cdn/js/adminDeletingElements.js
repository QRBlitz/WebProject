var deleteBtns = document.querySelectorAll(".custom-btn-red");
deleteBtns.forEach(element => element.onclick = (e) => {
    let parentBlock = e.target.parentNode;
    let underline = parentBlock.nextElementSibling;
    parentBlock.remove();
    underline.remove();
});