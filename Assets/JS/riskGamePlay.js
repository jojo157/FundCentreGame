/*jshint esversion: 6 */
const $ = window.$ ;

const fundName =[];
const fundRisk = [];
const fundsInGame = [];
const soundToPlay = document.createElement("audio");
 
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
/** 
* This function calls the game level - sets how many qs are in in game
* Displays a random fund to the user by calling the displayFundQuestion fucntion
* Displays the total number of qs per game
*/
    gameLevel();
    displayFundQuestion();
    numberOfQuestionsPerGame();
    
}


function extractDataFromTxtFile(fileAddress, arrayVariable){
  /* 
    credit to stack overflow for help with the code to extract data from a text file
  */

/** 
* This function will extract all the data from a text file where each entry is on a new line.
* The function will remove any trailing white space before adding the data to an array. 
*/
        $.get(fileAddress, function(data) {
            var lines = data.split("\n");
            $.each(lines, function(n, elem) {
                elem = $.trim(elem);
                arrayVariable.push(elem);
            });
         });
         return arrayVariable;
    }
    
    


function generateRandomIndex(){
/** 
* This function will generate a random number between 1 and 77
*/

    return Math.floor(Math.random() *76 ) +1;
}

function generateRandomFund(){
/** 
* This function will generate a unique fund that has not already appeared in the game 
* The function will re-run if the fund given is not unique in the game by calling the checkRepeatQuestion function.
*/
    let index = generateRandomIndex();
    let fundChoosen = fundName[index];
    let correctRisk = fundRisk[index];
    let solutions = [];
    
    let repeatQ = checkRepeatQuestion(fundChoosen);
    if(repeatQ === false){
        fundsInGame.push(fundChoosen);
        solutions[0]=fundChoosen;
        solutions[1]= correctRisk;
        return solutions;  
    }
    else{
        return false;
    }  
}

function displayFundQuestion(){
/** 
* This function will display the random fund on the users screen in the fund box and 
* returns the fund risk for this random fund.
*/
    let callSolutions = generateRandomFund();
    if(callSolutions === false){
        displayFundQuestion();
    }
    else{
        document.getElementById("fund-name-text").textContent = callSolutions[0];
        return callSolutions[1];
    }       
}

function checkAnswer(useranswer){
/** 
* This function will check the users answer against the fund shown on screen
* It will call the answer alert -  sound and message - to inform the user of outcome
* It will call the function to undate the number of correct, incorrect and total answers answered and 
* then call the function to give the user another Q while game is still in play
*/

    let endValue = document.getElementById("totalNumberOfQuestions").textContent;
    let currentValue = document.getElementById("questionsAnswered").textContent;

    if(endValue === currentValue){
        return ;
    }else{

        let fund = document.getElementById("fund-name-text").textContent;
        let indexFund = fundName.indexOf(fund);
        let riskFund = fundRisk[indexFund];
        let isCorrect = useranswer === riskFund;
        if(isCorrect){
            playCorrectSound();
            setTimeout(function(){
            answerAlert(isCorrect, riskFund);
            updateCorrectScore();
            updateNumberOfQsAnswered();
            checkGameEnd();
            },1000);
        }
        else{
            playWrongSound();
            setTimeout(function(){
            answerAlert(isCorrect, riskFund);
            updateIncorrectScore();
            updateNumberOfQsAnswered();
            checkGameEnd();
            },1000);        
        } 
        
        if(fundsInGame.length < parseInt(document.getElementById("totalNumberOfQuestions").innerText)){
            setTimeout(function(){
            nextQuestion();}, 2000);
        }
    }
}

function updateCorrectScore(){
/** 
* This function will update the number of correct answers on the screen
*/
 let previousScore = parseInt(document.getElementById("correct-score").innerText);
 previousScore = (previousScore + 1).toString();
 document.getElementById("correct-score").innerText = previousScore;
}

function updateIncorrectScore(){
/** 
* This function will update the number of incorrect answers on the screen
*/
 let previousScore = parseInt(document.getElementById("incorrect-score").innerText);
 previousScore = (previousScore + 1).toString();
 document.getElementById("incorrect-score").innerText = previousScore;
}

function nextQuestion(){
/** 
* This function will call the function to get a new fund
*/
    displayFundQuestion();
}

function restartGame(){
/** 
* This function will set the number of correct, incorrect and total qs answered to 0 and empty the array for fundsInGame
* The function then gives the user a new fund
*/
        document.getElementById("correct-score").innerText = "0";
        document.getElementById("incorrect-score").innerText = "0";
        document.getElementById("questionsAnswered").innerText = "0";
        while(fundsInGame.length > 0) {
            fundsInGame.pop();
        }
        nextQuestion();
      
}

function gameLevel(){
/** 
* This function will extract the game level from the address that was passed when user selected game level on game load page.
*/
   let level =  window.location.href;
   level = level.split("=");
   level = level[1];
   return level;
}

function numberOfQuestionsPerGame(){
/** 
* This function sets the number of Qs in each game level
*/
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
/** 
* This function increases the number of questions answered by 1
*/
    let numQuestion = document.getElementById("questionsAnswered").textContent;
    numQuestion = (parseInt(numQuestion) + 1).toString();
    document.getElementById("questionsAnswered").innerText = numQuestion;
}

function checkGameEnd(){
/** 
* This function checks if the user has answered all the questions allowable in a game level
*/
    let endValue = document.getElementById("totalNumberOfQuestions").textContent;
    let currentValue = document.getElementById("questionsAnswered").textContent;
    if(currentValue === endValue){
        setTimeout(function(){endGame();},10);
    }
}

function endGame(){
/** 
* This function ends the users game when they have answered all the questions allowable in a game 
* The user is given the game outcome with a modal for % correct
*/
    let endValue = document.getElementById("totalNumberOfQuestions").textContent;
    let currentCorrect = document.getElementById("correct-score").textContent;
    let score ;
    endValue = parseInt(endValue);
    currentCorrect = parseInt(currentCorrect);
    score = (((currentCorrect / endValue) * 100).toFixed(0)) + "%"  ; 
    
    document.getElementById("exampleModalLongTitle").innerText = "Congratulations";
    document.getElementById("answer-text-message").innerText = `Game Over! Your score is ${score}. Check out the Fund Centre Website to learn more! Why not try and beat your score.`;
    document.getElementById("risk-game-modal").click();
    document.getElementById("fund-name-text").innerText = `Game Over! Your score is ${score}`;


}

function checkRepeatQuestion(choosenFund){
/** 
* This function checkes if a passed fund is in the fundsInGame array
*/
    for(let i=0; i<fundsInGame.length; i++){
        if(fundsInGame[i] === choosenFund){
            return true;
        }
    }
    return false ;
}

function answerAlert(isCorrect, riskFund){
/** 
* This function updated the page modal with a message depending on the answer outcome (correct, incorrect)
* if incorrect, the user is told the correct answer
*/
    if(isCorrect){
    document.getElementById("exampleModalLongTitle").innerText = "Congratulations";
    document.getElementById("answer-text-message").innerText = "Well Done, you got it right. Keep it up!";
    document.getElementById("risk-game-modal").click();
    }
    else{
    document.getElementById("exampleModalLongTitle").innerText = "Hard Luck";
    document.getElementById("answer-text-message").innerText = `The correct answer is ${riskFund}.`;
    document.getElementById("risk-game-modal").click();
    }
}

function playCorrectSound(isCorrect, riskFund){
/** 
* This function plays the correct sound file
*/
    soundToPlay.setAttribute("src", "Assets/Sounds/correct.wav");
    soundToPlay.play();
}

function playWrongSound(){
/** 
* This function plays the incorrect sound file
*/
    soundToPlay.setAttribute("src", "Assets/Sounds/wrong.wav");
    soundToPlay.play();
}