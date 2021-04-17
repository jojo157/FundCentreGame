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
/** 
* This function will display a modal when the button with the game name is choosen, alerting the user to select the game level.
* Following the user selecting the game level, the relevant game page will be called for Example - Game Risk - Easy.
*/
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
/** 
* This function will load the Risk game page and pass the data for the level choosen in the page address.
*/
    if (myLevelButton === "Easy") {
        window.open("gameRisk.html?variable=Easy", "_self");
    } else if (myLevelButton === "Medium") {
        window.open("gameRisk.html?variable=Medium", "_self");
    } else {
        window.open("gameRisk.html?variable=Hard", "_self");
    }
}
function loadManagementGame(myLevelButton) {
/** 
* This function will load the Management game page and pass the data for the level choosen in the page address.
*/
    if (myLevelButton === "Easy") {
        window.open("gameManagement.html?variable=Easy", "_self");
    } else if (myLevelButton === "Medium") {
        window.open("gameManagement.html?variable=Medium", "_self");
    } else {
        window.open("gameManagement.html?variable=Hard", "_self");
    }
}
function displayModal() {
 /** 
* This function will display a modal when the user clicks the game type (risk game or management style game).
* The modal will ask the user to choose a game level.
*/   
    document.getElementById("setup-Game-Title").innerText = "Lets Get Started";
    document.getElementById("setup-text-message").innerText = "Game selected, now choose your level. Are you up for a challenge!";
    document.getElementById("setup-game-modal").click();
}

















