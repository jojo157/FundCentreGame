var fundName =[];
var fundRisk = [];
 
$(document).ready(function(){
extractDataFromTxtFile('Assets/FundTextFiles/fundnames.txt', fundName);
extractDataFromTxtFile('Assets/FundTextFiles/fundRiskLevel.txt', fundRisk);
});

setTimeout(function(){
    console.log(fundName[3]);}, 500);
setTimeout(function(){
    console.log(fundRisk[3]);}, 500);
setTimeout(function(){
    displayFundQuestion();}, 500);

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
    let randomIndex = Math.floor(Math.random() *77 ) +1;
    if (randomIndex === 1){
        randomIndex = randomIndex + 1;
    }
    return randomIndex;
}

function generateRandomFund(){
    let index = generateRandomIndex();
    let fundChoosen = fundName[index];
    return fundChoosen;
}

function displayFundQuestion(){
    document.getElementById("fund-name-text").textContent = generateRandomFund();
}