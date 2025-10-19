// signup.js

// Optional: show server-side error messages
window.addEventListener('DOMContentLoaded', () => {
    const error = sessionStorage.getItem('signupError');
    if (error) {
        alert(error);
        sessionStorage.removeItem('signupError');
    }
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
    // Remove e.preventDefault() so form submits to PHP
    const fullname = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!fullname || !email || !password || !confirmPassword) {
        e.preventDefault(); // Stop submission if fields are empty
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        e.preventDefault();
        alert("Passwords do not match.");
        return;
    }

    // Otherwise, let the form submit to register.php
});
