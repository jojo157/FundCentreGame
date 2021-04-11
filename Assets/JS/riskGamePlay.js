/*jshint esversion: 6 */
const $ = window.$ ;

var fundName =[];
var fundRisk = [];
var fundsInGame = [];
var soundToPlay = document.createElement("audio");
 
$(document).ready(function(){
        extractDataFromTxtFile('Assets/FundTextFiles/fundnames.txt', fundName);
        extractDataFromTxtFile('Assets/FundTextFiles/fundRiskLevel.txt', fundRisk);   
});


$(window).load(function startup() {

    setTimeout(function(){  
    startGame();
    let buttons = document.getElementsByClassName("answer-button");
    let reset = document.getElementById("restart-button");

    reset.addEventListener("click", function(){
            restartGame();
        });    

    for(let button of buttons){
            button.addEventListener("click", function(){
            checkAnswer(this.textContent);
        
        });
    }},500);
       
});

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
    let randomIndex = Math.floor(Math.random() *76 ) +1;
    return randomIndex;
}

function generateRandomFund(){
    let index = generateRandomIndex();
    let fundChoosen = fundName[index];
    let correctRisk = fundRisk[index];
    let solutions = [];
    solutions[0]=fundChoosen;
    solutions[1]= correctRisk;

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
    document.getElementById("fund-name-text").textContent = callSolutions[0];
    let riskAnswer = callSolutions[1] ;
    return riskAnswer;
    
}

function checkAnswer(useranswer){
    let endValue = document.getElementById("totalNumberOfQuestions").textContent;
    let currentValue = document.getElementById("questionsAnswered").textContent;

    if(endValue === currentValue){
        return ;
    }else{

    let fund = document.getElementById("fund-name-text").textContent;
    let indexFund = fundName.indexOf(fund);
    let riskFund = fundRisk[indexFund];
    riskFund = riskFund.trim();
    let isCorrect = useranswer === riskFund;
    if(isCorrect){
        playCorrectSound();
        setTimeout(function(){
        answerAlert(isCorrect, riskFund);
        updateCorrectScore();
        updateNumberOfQsAnswered();
        checkGameEnd();
        },1500);
    }
    
    
    
    else{
        playWrongSound();
        setTimeout(function(){
        answerAlert(isCorrect, riskFund);
        updateIncorrectScore();
        updateNumberOfQsAnswered();
        checkGameEnd();
        },1500);
        
        
    } 
    
    if(fundsInGame.length < parseInt(document.getElementById("totalNumberOfQuestions").innerText)){
        setTimeout(function(){
        nextQuestion();}, 1500);
    }
    }
}

function updateCorrectScore(){
 let previousScore = parseInt(document.getElementById("correct-score").innerText);
 previousScore = previousScore + 1;
 document.getElementById("correct-score").innerText = previousScore;
}

function updateIncorrectScore(){
 let previousScore = parseInt(document.getElementById("incorrect-score").innerText);
 previousScore = previousScore + 1;
 document.getElementById("incorrect-score").innerText = previousScore;
}

function nextQuestion(){
    displayFundQuestion();
}

function restartGame(){
        document.getElementById("correct-score").innerText = 0;
        document.getElementById("incorrect-score").innerText = 0;
        document.getElementById("questionsAnswered").innerText = 0;
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
        document.getElementById("totalNumberOfQuestions").innerText = numberOfQs;
    }else if(level ==="Medium"){
        numberOfQs = 12;
        document.getElementById("totalNumberOfQuestions").innerText = numberOfQs;
    }else{
        numberOfQs = 18;
        document.getElementById("totalNumberOfQuestions").innerText = numberOfQs;
    }

}

function updateNumberOfQsAnswered(){
    let numQuestion = document.getElementById("questionsAnswered").textContent;
    numQuestion = parseInt(numQuestion) + 1;
    document.getElementById("questionsAnswered").innerText = numQuestion;
}

function checkGameEnd(){
    let endValue = document.getElementById("totalNumberOfQuestions").textContent;
    let currentValue = document.getElementById("questionsAnswered").textContent;
    if(currentValue === endValue){
        setTimeout(function(){endGame();},10);
    }
}

function endGame(){
    let endValue = document.getElementById("totalNumberOfQuestions").textContent;
    let currentCorrect = document.getElementById("correct-score").textContent;
    let score ;
    let action;
    endValue = parseInt(endValue);
    currentCorrect = parseInt(currentCorrect);
    score = (((currentCorrect / endValue) * 100).toFixed(0)) + "%"  ; 
    action = confirm(`Game Over! Your score is ${score}. Check out the Fund Centre Website to learn more! Would you like to try again?`);

    if (action === true){
        restartGame();
    }else{
    document.getElementById("fund-name-text").innerText = `Game Over! Your score is ${score}`;
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

function answerAlert(isCorrect, riskFund){
    if(isCorrect){
        alert("You got it right!");
    }
    else{
        alert(`Hard luck, the correct answer is ${riskFund}!`);
    }
    return;
}

function playCorrectSound(isCorrect, riskFund){
    soundToPlay.setAttribute("src", "Assets/Sounds/correct.wav");
    soundToPlay.play();
    return;
}

function playWrongSound(){
    soundToPlay.setAttribute("src", "Assets/Sounds/wrong.wav");
    soundToPlay.play();
    return;
}

