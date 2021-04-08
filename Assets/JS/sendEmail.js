/* credit to emailjs for API usage*/
/* code template for using emailjs provided in their documentation https://www.emailjs.com/docs/ */
$('#contact-form').on('submit', function(event) {
    event.preventDefault(); // prevent reload
    
    var formData = new FormData(this);
    formData.append('service_id', 'service_d7aqa1n');
    formData.append('template_id', 'template_3e1u6tq');
    formData.append('user_id', 'user_SWI5POi95flikT5s70ZfL');
 
    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, // auto-detection
        processData: false // no need to parse formData to string
    }).done(function() {
        alert('Your mail is sent!');
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });
});
