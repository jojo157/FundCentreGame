
$(document).ready(function(){

let choosenLevel = document.getElementsByClassName("button-StartGame");
for(let level of choosenLevel){
            level.addEventListener("click", function(){
                let clickedButton = this.textContent;
                sessionStorage.level= clickedButton;
            })}
 
})



  
 /* document.getElementById("result").innerHTML = localStorage.getItem("lastname") */