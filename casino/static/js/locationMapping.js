var mapElement = document.querySelector(".map-container")
var collapsibleHeaders = document.querySelectorAll(".collapsible-header")
var dictionary = {
    "Almaty (KZ)": `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2034.107955833153!2d77.04671533357164!3d43.86281195720423!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3882f1a49857cd31%3A0x15083faf9651f9b0!2sAstoria%20Casino!5e0!3m2!1sru!2skz!4v1639417954186!5m2!1sru!2skz"
    width="100%" style="border:0; aspect-ratio: 1;" allowfullscreen="" loading="lazy"></iframe>`,
    "Las-Vegas (US)": `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86693.19499962946!2d-115.23907534321633!3d36.14817492601709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8db3029f8d3dd%3A0xa20d2200f23b4f43!2z0JHQvtGD0LvQtNC10YAg0KHRgtC10LnRiNC10L0g0KXQvtGC0LXQuyDRjdC90LQg0JrQsNC30LjQvdC-!5e0!3m2!1sru!2skz!4v1639418068997!5m2!1sru!2skz" width="100%" style="border:0; aspect-ratio:1;" allowfullscreen="" loading="lazy"></iframe>`,
    "Ontario (CA)": `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.472333222516!2d-79.3470677841996!3d44.64870059550507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d2aa9ba956be107%3A0xde3899486a0eca48!2z0JrQsNC30LjQvdC-INCg0LDQvNCwINCg0LXQt9C-0YDRgg!5e0!3m2!1sru!2skz!4v1639418092000!5m2!1sru!2skz" width="100%" style="border:0; aspect-ratio:1;" allowfullscreen="" loading="lazy"></iframe>`
}

collapsibleHeaders.forEach(header => {
    header.onclick = e => {
        mapElement.innerHTML = dictionary[e.target.innerHTML.trim()]
    }
})