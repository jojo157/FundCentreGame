var fundName =[];
var fundRisk = [];
 
$(document).ready(function(){
extractDataFromTxtFile('Assets/FundTextFiles/fundnames.txt', fundName);
extractDataFromTxtFile('Assets/FundTextFiles/fundRiskLevel.txt', fundRisk);
});

setTimeout(function(){
    let answer = displayFundQuestion();
    let buttons = document.getElementsByClassName("answer-button");

    for(let button of buttons){
        button.addEventListener("click", function(){
            checkAnswer(this.textContent, answer);
        
        })
    }
}, 500);


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
    if (randomIndex === 1){
        randomIndex = randomIndex + 1;
    }
    return randomIndex;
}

function generateRandomFund(){
    let index = generateRandomIndex();
    let fundChoosen = fundName[index];
    let correctRisk = fundRisk[index];
    let solutions = [];
    solutions.push(fundChoosen);
    solutions.push(correctRisk);
    return solutions;
    
}

function displayFundQuestion(){
    let callSolutions = generateRandomFund();
    document.getElementById("fund-name-text").textContent = callSolutions[0];
    let riskAnswer = callSolutions[1] ;
    return riskAnswer;
    
}

function checkAnswer(useranswer, correctanswer){
    correctanswer = correctanswer.trim();
    console.log(correctanswer);
    let isCorrect = useranswer === correctanswer;

    if(isCorrect){
        alert("You got it right!");
        updateCorrectScore();

    }else{
        alert(`Hard luck, the correct answer is ${correctanswer}!`);
        updateIncorrectScore();
    }  
    nextQuestion();
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
    document.getElementById("fund-name-card-container").focus();
    displayFundQuestion();

}
