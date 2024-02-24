export default function getCookie(name) {
    // Split all cookies into an array based on the semicolon
    var cookieArray = document.cookie.split(';');
    
    // Iterate through each cookie
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        // Remove any leading spaces
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        // If the cookie's name matches the one we're looking for
        if (cookie.indexOf(name + '=') === 0) {
            // Return the value of the cookie
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    // If the cookie isn't found, return null
    return null;
}