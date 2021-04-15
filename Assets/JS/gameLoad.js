/*jshint esversion: 6 */
const $ = window.$;
$(document).ready(function () {
    let isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    if (isIE11) {
        window.alert("This game is incompatible with IE11 please use another browser");
    }
    // Get IE or Edge browser version
    let version = detectIE();
    console.log("version: ", version);
    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    function detectIE() {
        let ua = window.navigator.userAgent;
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        let msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        let trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            let rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        // other browser
        return false;
    }
    let gameChosen = "";
    let levelChosen = "";
    let myPromise = new Promise(function (myResolve, myReject) {
        if (gameChosen === "") {
            myResolve("complete loading");
        } else {
            myReject("failed");
        }
    });
    myPromise.then(
        function () {
            setUpGame(gameChosen, levelChosen);
        },
        function (error) {
            console.log("error loading game: ", error);
        }
    );
});
function setUpGame(gameChosen, levelChosen) {
    let games = document.getElementsByClassName("game-StartGame");
    for (let game of games) {
        game.addEventListener("click", function () {
            gameChosen = this.id;
            displayModal();
            return (gameChosen);
        });
    }
    let chosenLevel = document.getElementsByClassName("button-StartGame");
    for (let level of chosenLevel) {
        level.addEventListener("click", function () {
            levelChosen = this.textContent;
            if (gameChosen === "fund-risk") {
                loadRiskGame(levelChosen);
            } else if (gameChosen === "fund-management-game") {
                loadManagementGame(levelChosen);
            }
        });
    }
}
function loadRiskGame(myLevelButton) {
    if (myLevelButton === "Easy") {
        window.open("gameRisk.html?variable=Easy", "_self");
    } else if (myLevelButton === "Medium") {
        window.open("gameRisk.html?variable=Medium", "_self");
    } else {
        window.open("gameRisk.html?variable=Hard", "_self");
    }
}
function loadManagementGame(myLevelButton) {
    if (myLevelButton === "Easy") {
        window.open("gameManagement.html?variable=Easy", "_self");
    } else if (myLevelButton === "Medium") {
        window.open("gameManagement.html?variable=Medium", "_self");
    } else {
        window.open("gameManagement.html?variable=Hard", "_self");
    }
}
function displayModal() {
    document.getElementById("setup-Game-Title").innerText = "Lets Get Started";
    document.getElementById("setup-text-message").innerText = "Game selected, now choose your level. Are you up for a challenge!";
    document.getElementById("setup-game-modal").click();
}

















