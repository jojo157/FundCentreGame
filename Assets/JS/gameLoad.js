/*jshint esversion: 6 */
const $ = window.$;
$(document).ready(function () {
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

















