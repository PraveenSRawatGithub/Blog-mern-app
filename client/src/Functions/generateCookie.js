export default function (token) {
    var encodedToken = encodeURIComponent(token);
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Expires in 1 day
    var expires = "expires=" + expirationDate.toUTCString();
    document.cookie = "jwt=" + encodedToken + ";" + expires + ";path=/";
}