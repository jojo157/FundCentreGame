/*jshint esversion: 6 */
const $ = window.$ ;

$(document).ready(function () {
    internetExplorerAlert();
    document.getElementById("play-button").addEventListener("click", function () {
        window.open("startGame.html", "_self");
    });
    document.getElementById("contact-button").addEventListener("click", function () {
        window.open("contact.html", "_self");
    });
    document.getElementById("game-how-button").addEventListener("click", function(){
        document.getElementById("popup-instructions-window").style.display =  "block";
    });
    document.getElementById("buttonClose").addEventListener("click",function(){
        document.getElementById("popup-instructions-window").style.display= "none";
    });
});

function internetExplorerAlert(){
/** 
* This function will display an alert if the user is accessing the website using Internet Explorer browser.
*/
    if(navigator.appName == "Microsoft Internet Explorer" || window.msCrypto){
        alert("This game is incompatible with Internet Explorer, please use another browser");
    }
    return;
}