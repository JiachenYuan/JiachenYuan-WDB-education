var QRcode = document.getElementsByClassName("contact-QRcode"); // This is a list of elements, not just one
var X = document.getElementsByClassName("contact-X");
function QR_pop_up() {
    QRcode[0].style.zIndex = 2;
    X[0].style.zIndex = 1;
}

function close_contact_QRcode() {
    QRcode[0].style.zIndex = -1;
    X[0].style.zIndex = -1;
}

