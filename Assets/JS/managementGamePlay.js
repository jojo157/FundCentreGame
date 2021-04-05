var fundName =[];
var fundManagement = [];
var fundsInGame = [];
 
$(document).ready(function(){
    extractDataFromTxtFile('Assets/FundTextFiles/fundsForManagement.txt', fundName);
    extractDataFromTxtFile('Assets/FundTextFiles/fundManagementStyle.txt', fundManagement);




setTimeout(function(){
    startGame();

},500);

setTimeout(function(){
    let buttons = document.getElementsByClassName("answer-button");
    let reset = document.getElementById("management-restart-button");

    reset.addEventListener("click", function(){
            restartGame();
        })    

    for(let button of buttons){
            button.addEventListener("click", function(){
            checkAnswer(this.textContent);
        
        })
    }
}, 500);

function startGame(){
    gameLevel();
    displayFundQuestion();
    numberOfQuestionsPerGame();
    
}


function extractDataFromTxtFile(fileAddress, arrayVariable){
     $.get(fileAddress, function(data) {
        var lines = data.split("\n");
        $.each(lines, function(n, elem) {
            arrayVariable.push(elem);
        });
     });
     return arrayVariable;
}

function generateRandomIndex(){
    let randomIndex = Math.floor(Math.random() *74 ) +1;
    return randomIndex;
}

function generateRandomFund(){
    let index = generateRandomIndex();
    let fundChoosen = fundName[index];
    let correctManagement = fundManagement[index];
    let solutions = [];
    solutions[0]=fundChoosen;
    solutions[1]= correctManagement;

    let repeatQ = checkRepeatQuestion(fundChoosen);
    if(repeatQ === true){
        generateRandomFund();
    }
    if(repeatQ === false){
    fundsInGame.push(fundChoosen);
    }
    return solutions;
    
}

function displayFundQuestion(){
    let callSolutions = generateRandomFund();
    document.getElementById("management-fund-name-text").textContent = callSolutions[0];
    let managementAnswer = callSolutions[1] ;
    return managementAnswer;
    
}

function checkAnswer(useranswer){
    let endValue = document.getElementById("management-totalNumberOfQuestions").textContent;
    let currentValue = document.getElementById("management-questionsAnswered").textContent;

    if(endValue === currentValue){
        return ;
    }else{

    let fund = document.getElementById("management-fund-name-text").textContent;
    let indexFund = fundName.indexOf(fund);
    let managementFund = fundManagement[indexFund];
    managementFund = managementFund.trim();
    let isCorrect = useranswer === managementFund;
    if(isCorrect){
        playCorrectSound();
        setTimeout(function(){
        alert("You got it right!");
        updateCorrectScore();
        updateNumberOfQsAnswered();
        checkGameEnd();
        },200);
    }else{
        playWrongSound();

        setTimeout(function(){
        alert(`Hard luck, the correct answer is ${managementFund}!`);
        updateIncorrectScore();
        updateNumberOfQsAnswered();
        checkGameEnd();
        },200);
    }  
    if(fundsInGame.length < 6){
        setTimeout(function(){
            nextQuestion();}, 200);
    }
}
}

function updateCorrectScore(){
 let previousScore = parseInt(document.getElementById("management-correct-score").innerText);
 previousScore = previousScore + 1;
 document.getElementById("management-correct-score").innerText = previousScore;
}

function updateIncorrectScore(){
 let previousScore = parseInt(document.getElementById("management-incorrect-score").innerText);
 previousScore = previousScore + 1;
 document.getElementById("management-incorrect-score").innerText = previousScore;
}

function nextQuestion(){
    displayFundQuestion();
}

function restartGame(){
        document.getElementById("management-correct-score").innerText = 0;
        document.getElementById("management-incorrect-score").innerText = 0;
        document.getElementById("management-questionsAnswered").innerText = 0;
        while(fundsInGame.length > 0) {
            fundsInGame.pop();
        }
        nextQuestion();
      
}

function gameLevel(){
   let level =  window.location.href;
   level = level.split("=");
   level = level[1];
   return level;
}

function numberOfQuestionsPerGame(){
    let level = gameLevel();
    let numberOfQs;
    if(level ==="Easy"){
        numberOfQs = 6;
        document.getElementById("management-totalNumberOfQuestions").innerText = numberOfQs;
    }else if(level ==="Medium"){
        numberOfQs = 12;
        document.getElementById("management-totalNumberOfQuestions").innerText = numberOfQs;
    }else{
        numberOfQs = 18;
        document.getElementById("managementtotalNumberOfQuestions").innerText = numberOfQs;
    }

}

function updateNumberOfQsAnswered(){
    let numQuestion = document.getElementById("management-questionsAnswered").textContent;
    numQuestion = parseInt(numQuestion) + 1;
    document.getElementById("management-questionsAnswered").innerText = numQuestion;
}

function checkGameEnd(){
    let endValue = document.getElementById("management-totalNumberOfQuestions").textContent;
    let currentValue = document.getElementById("management-questionsAnswered").textContent;
    if(currentValue === endValue){
        setTimeout(function(){endGame();},10);
    }
}

function endGame(){
    let endValue = document.getElementById("management-totalNumberOfQuestions").textContent;
    let currentCorrect = document.getElementById("management-correct-score").textContent;
    let score ;
    let action;
    endValue = parseInt(endValue);
    currentCorrect = parseInt(currentCorrect);
    score = (((currentCorrect / endValue) * 100).toFixed(0)) + "%"  ; 
    action = confirm(`Game Over! Your score is ${score}, would you like to try again?`);

    if (action === true){
        restartGame();
    }else{
    document.getElementById("management-fund-name-text").innerText = `Game Over! Your score is ${score}`;
    }
}

function checkRepeatQuestion(choosenFund){
    for(let i=0; i<fundsInGame.length; i++){
        if(fundsInGame[i] === choosenFund){
            return true;
        }
    }

    return false ;
    

}
    
function playCorrectSound(){
    var soundToPlay = document.createElement("audio");
    soundToPlay.setAttribute("src", "../Assets/Sounds/correct.wav");
    soundToPlay.play();
    return
}

function playWrongSound(){
    var soundToPlay = document.createElement("audio");
    soundToPlay.setAttribute("src", "../Assets/Sounds/wrong.wav");
    soundToPlay.play();
    return
}

});