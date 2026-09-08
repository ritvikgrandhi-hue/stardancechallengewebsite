const adminLoginForm = document.getElementById("admin-login-form");
const adminUsername = document.getElementById("admin-username");
const adminPassword = document.getElementById("admin-password");

adminLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = adminUsername.value;
    const password = adminPassword.value;

    if (username === "admin" && password === "password123") {
        sessionStorage.setItem("isAdmin", "true");
        window.location.href = "projects.html";
    } else {
        console.log("Incorrect username or password.");
    }
});