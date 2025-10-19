// LOGIN PAGE SCRIPT
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Send AJAX request to PHP login script
    fetch("../backend/login.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json()) // expecting JSON response from PHP
        .then(data => {
            if (data.success) {
                // Login successful
                alert(`Welcome back, ${data.username}!`);
                window.location.href = "../HomePage/home.php";
            } else {
                // Login failed
                alert(data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        });
});
