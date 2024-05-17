function login() {
    var password = document.getElementById("pass").value;

    if (password === "Kavish") {
            window.location.href = "./index2.html";
    } 
    else {
        document.getElementById("message").innerText = "Incorrect password. Access denied.";
    }
}
