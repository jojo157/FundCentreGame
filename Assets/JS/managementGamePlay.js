/*jshint esversion: 6 */
const $ = window.$;
const fundName = [];
const fundManagement = [];
const fundsInGame = [];
const soundToPlay = document.createElement("audio");
$(document).ready(function () {
    extractDataFromTxtFile('Assets/FundTextFiles/fundsForManagement.txt', fundName);
    extractDataFromTxtFile('Assets/FundTextFiles/fundManagementStyle.txt', fundManagement);
});
$(window).on("load", function startup() {
    setTimeout(function () {
        startGame();
        let buttons = document.getElementsByClassName("answer-button");
        let reset = document.getElementById("management-restart-button");
        reset.addEventListener("click", function () {
            restartGame();
        });
        for (let button of buttons) {
            button.addEventListener("click", function () {
                checkAnswer(this.textContent);
            });
        }
    }, 500);
});
function startGame() {
    gameLevel();
    displayFundQuestion();
    numberOfQuestionsPerGame();
}
function extractDataFromTxtFile(fileAddress, arrayVariable) {
/* 
    credit to stack overflow for help with the code to extract data from a text file
*/
    $.get(fileAddress, function (data) {
        var lines = data.split("\n");
        $.each(lines, function (n, elem) {
            arrayVariable.push(elem);
        });
    });
    return arrayVariable;
}
function generateRandomIndex() {
    return Math.floor(Math.random() * 74) + 1;
}
function generateRandomFund() {
    let index = generateRandomIndex();
    let fundChoosen = fundName[index];
    let correctManagement = fundManagement[index];
    let solutions = [];
    solutions[0] = fundChoosen;
    solutions[1] = correctManagement;
    let repeatQ = checkRepeatQuestion(fundChoosen);
    if (repeatQ === true) {
        generateRandomFund();
    }
    if (repeatQ === false) {
        fundsInGame.push(fundChoosen);
    }
    return solutions;
}
function displayFundQuestion() {
    let callSolutions = generateRandomFund();
    document.getElementById("management-fund-name-text").textContent = callSolutions[0];
    return callSolutions[1];
}
function checkAnswer(useranswer) {
    let endValue = document.getElementById("management-totalNumberOfQuestions").textContent;
    let currentValue = document.getElementById("management-questionsAnswered").textContent;
    if (endValue === currentValue) {
        return;
    } else {
        let fund = document.getElementById("management-fund-name-text").textContent;
        let indexFund = fundName.indexOf(fund);
        let managementFund = fundManagement[indexFund];
        managementFund = managementFund.trim();
        let isCorrect = useranswer === managementFund;
        if (isCorrect) {
            playCorrectSound();
            setTimeout(function () {
                answerAlert(isCorrect, managementFund);
                updateCorrectScore();
                updateNumberOfQsAnswered();
                checkGameEnd();
            }, 1000);
        } else {
            playWrongSound();
            setTimeout(function () {
                answerAlert(isCorrect, managementFund);
                updateIncorrectScore();
                updateNumberOfQsAnswered();
                checkGameEnd();
            }, 1000);
        }
        if (fundsInGame.length < parseInt(document.getElementById("management-totalNumberOfQuestions").innerText)) {
            setTimeout(function () {
                nextQuestion();
            }, 2000);
        }
    }
}
function updateCorrectScore() {
    let previousScore = parseInt(document.getElementById("management-correct-score").innerText);
    previousScore = (previousScore + 1).toString();
    document.getElementById("management-correct-score").innerText = previousScore;
}
function updateIncorrectScore() {
    let previousScore = parseInt(document.getElementById("management-incorrect-score").innerText);
    previousScore = (previousScore + 1).toString();
    document.getElementById("management-incorrect-score").innerText = previousScore;
}
function nextQuestion() {
    displayFundQuestion();
}
function restartGame() {
    document.getElementById("management-correct-score").innerText = '0';
    document.getElementById("management-incorrect-score").innerText = '0';
    document.getElementById("management-questionsAnswered").innerText = '0';
    while (fundsInGame.length > 0) {
        fundsInGame.pop();
    }
    nextQuestion();
}
function gameLevel() {
    let level = window.location.href;
    level = level.split("=");
    level = level[1];
    return level;
}
function numberOfQuestionsPerGame() {
    let level = gameLevel();
    let numberOfQs;
    if (level === "Easy") {
        numberOfQs = 6;
        document.getElementById("management-totalNumberOfQuestions").innerText = numberOfQs;
    } else if (level === "Medium") {
        numberOfQs = 12;
        document.getElementById("management-totalNumberOfQuestions").innerText = numberOfQs;
    } else {
        numberOfQs = 18;
        document.getElementById("managementtotalNumberOfQuestions").innerText = numberOfQs;
    }
}
function updateNumberOfQsAnswered() {
    let numQuestion = document.getElementById("management-questionsAnswered").textContent;
    numQuestion = parseInt(numQuestion) + 1;
    document.getElementById("management-questionsAnswered").innerText = numQuestion;
}
function checkGameEnd() {
    let endValue = document.getElementById("management-totalNumberOfQuestions").textContent;
    let currentValue = document.getElementById("management-questionsAnswered").textContent;
    if (currentValue === endValue) {
        setTimeout(function () {
            endGame();
        }, 10);
    }
}
function endGame() {
    let endValue = document.getElementById("management-totalNumberOfQuestions").textContent;
    let currentCorrect = document.getElementById("management-correct-score").textContent;
    let score;
    endValue = parseInt(endValue);
    currentCorrect = parseInt(currentCorrect);
    score = (((currentCorrect / endValue) * 100).toFixed(0)) + "%";
    document.getElementById("management-Game-Title").innerText = "Congratulations";
    document.getElementById("management-answer-text-message").innerText = `Game Over! Your score is ${score}. Check out the Fund Centre Website to learn more! Why not try and beat your score.`;
    document.getElementById("management-game-modal").click();
    document.getElementById("management-fund-name-text").innerText = `Game Over! Your score is ${score}`;
}
function checkRepeatQuestion(choosenFund) {
    for (let i = 0; i < fundsInGame.length; i++) {
        if (fundsInGame[i] === choosenFund) {
            return true;
        }
    }
    return false;
}
function answerAlert(isCorrect, managementFund) {
    if (isCorrect) {
        document.getElementById("management-Game-Title").innerText = "Congratulations";
        document.getElementById("management-answer-text-message").innerText = "Well Done, you got it right. Keep it up!";
        document.getElementById("management-game-modal").click();
    } else {
        document.getElementById("management-Game-Title").innerText = "Hard Luck";
        document.getElementById("management-answer-text-message").innerText = `The correct answer is ${managementFund}.`;
        document.getElementById("management-game-modal").click();
    }
}
function playCorrectSound() {
    soundToPlay.setAttribute("src", "Assets/Sounds/correct.wav");
    soundToPlay.play();
}
function playWrongSound() {
    soundToPlay.setAttribute("src", "Assets/Sounds/wrong.wav");
    soundToPlay.play();
}