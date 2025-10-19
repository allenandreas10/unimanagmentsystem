// SIGNUP PAGE SCRIPT

document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Basic validation
    if (!fullname || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // TODO: Add backend API call to register user
    console.log("Registering:", fullname, email);

    // Example redirect after successful registration
    window.location.href = "login.html";
});
