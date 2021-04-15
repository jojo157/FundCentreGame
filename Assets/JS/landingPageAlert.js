/*jshint esversion: 6 */
const $ = window.$;
$(document).ready(function () {
    let isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    if (isIE11) {
        window.alert("This game is incompatible with IE11 please use another browser");
    }
    // Get IE or Edge browser version
    let version = detectIE();
    console.log("version: ", version);
    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    function detectIE() {
        let ua = window.navigator.userAgent;
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        let msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        let trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            let rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        // other browser
        return false;
    }

});