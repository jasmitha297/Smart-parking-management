function register() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        document.getElementById("message").innerText =
            "Please enter username and password.";
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    document.getElementById("message").innerText =
        "Registration successful!";
}


function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let storedUsername = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {

        document.getElementById("message").innerText =
            "Login successful!";

    } else {

        document.getElementById("message").innerText =
            "Invalid username or password.";
    }
}