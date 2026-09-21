const adminLoginForm = document.getElementById("admin-login-form");
const adminUsername = document.getElementById("admin-username");
const adminPassword = document.getElementById("admin-password");
const loginError = document.getElementById("login-error");

adminLoginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = adminUsername.value;
    const password = adminPassword.value;

    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.success) {
            sessionStorage.setItem("isAdmin", "true");
            window.location.href = "projects.html";
        } else {
            loginError.textContent = "Incorrect username or password.";
        }
    })
    .catch(function(error) {
        console.error("Login error:", error);
    });
});