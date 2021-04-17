/*jshint esversion: 6 */


$(document).ready(function () {
    if(navigator.appName == "Microsoft Internet Explorer" || window.msCrypto){
        alert("This game is incompatible with Internet Explorer, please use another browser");
    }

    let play = document.getElementById("play-button") ;
    play.addEventListener("click", function () {
        window.open("startGame.html", "_self");
    });

    let contact = document.getElementById("contact-button") ;
    contact.addEventListener("click", function () {
        window.open("contact.html", "_self");
    });
})