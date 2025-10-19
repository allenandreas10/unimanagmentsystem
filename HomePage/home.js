// home.js

document.addEventListener("DOMContentLoaded", () => {
    // Simulate user data (for now)
    const username = localStorage.getItem("username") || "Student";

    // Display username on the page
    document.getElementById("username").textContent = username;
});
