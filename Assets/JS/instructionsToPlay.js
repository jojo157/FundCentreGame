$(document).ready(function(){
    $("#game-how-button").click(function(){
        $("#popup-instructions-window").css("display", "block");
    });
    $("#buttonClose").click(function(){
        $("#popup-instructions-window").css("display", "none");
    });

});