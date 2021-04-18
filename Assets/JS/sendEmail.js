/*jshint esversion: 6 */
const $ = window.$ ;

/********* credit to emailjs for API usage*************/
/********** code template for using emailjs provided in their documentation https://www.emailjs.com/docs/ *********/

$('#contact-form').on('submit', function(event) {
    event.preventDefault(); 
    
    var formData = new FormData(this);
    formData.append('service_id', 'service_d7aqa1n');
    formData.append('template_id', 'template_3e1u6tq');
    formData.append('user_id', 'user_SWI5POi95flikT5s70ZfL');
 
    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, 
        processData: false 
    }).done(function() {
        sendContactConfirmation();
        returnToHome();
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });
});



function sendContactConfirmation(){
/** 
* This function will show a message to the user to let them know the data has been sent to the site owner.
*/
    document.getElementById("contact-modal").click();
    return;
}

function returnToHome(){
/** 
* This function returns the user to the home page, once they press ok on the message sent confirmation window.
*/
    document.getElementById("okButton").addEventListener("click", function(){
        window.open("index.html", "_self");
    });
}