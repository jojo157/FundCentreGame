
$(document).ready(function(){

let choosenLevel = document.getElementsByClassName("button-StartGame");
for(let level of choosenLevel){
            level.addEventListener("click", function(){
                let myLevelButton = this.textContent;
                if(myLevelButton === "Easy"){
                    window.open("../gameRisk.html?variable=Easy", "_self");
                }
                else if(myLevelButton === "Medium"){
                    window.open("../gameRisk.html?variable=Medium", "_self");
                }
                else{
                    window.open("../gameRisk.html?variable=Hard", "_self");
                }
            })}

})