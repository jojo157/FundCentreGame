
$(document).ready(function(){

    var gameChosen = "" ;
    var levelChosen = "";

    let games = document.getElementsByClassName("game-StartGame");
    for( let game of games){
        game.addEventListener("click", function(){
            gameChosen = this.id;
            alert("Game Selected, now choose your level .... are you up for a challenge!");
            return(gameChosen);
        })
    }

        let choosenLevel = document.getElementsByClassName("button-StartGame");
        for(let level of choosenLevel){
                    level.addEventListener("click", function(){
                        let myLevelButton = this.textContent;
                        levelChosen = myLevelButton;
                       

                          if(gameChosen != "")  {         
        if(gameChosen="fund-risk"){
            loadRiskGame(levelChosen);
        }
        else if(gameChosen="fund-management"){
            loadManagementGame(levelChosen); 
        }
    }
                    })}
        
      

        })

    function loadRiskGame(myLevelButton){
        if(myLevelButton === "Easy"){
            window.open("../gameRisk.html?variable=Easy", "_self");
        }
        else if(myLevelButton === "Medium"){
            window.open("../gameRisk.html?variable=Medium", "_self");
        }
        else{
        window.open("../gameRisk.html?variable=Hard", "_self");
        }
    }

    function loadManagementGame(myLevelButton){
        if(myLevelButton === "Easy"){
            window.open("../#.html?variable=Easy", "_self");
        }
        else if(myLevelButton === "Medium"){
            window.open("../#.html?variable=Medium", "_self");
        }
        else{
        window.open("../#.html?variable=Hard", "_self");
        }
    }