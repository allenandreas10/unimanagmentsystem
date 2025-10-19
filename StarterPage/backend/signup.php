<?php
// register.php - handles user registration (skeleton)

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fullname = $_POST["fullname"] ?? '';
    $email = $_POST["email"] ?? '';
    $password = $_POST["password"] ?? '';
    $confirmPassword = $_POST["confirmPassword"] ?? '';

    // Basic validation (server-side)
    if (empty($fullname) || empty($email) || empty($password) || empty($confirmPassword)) {
        echo "All fields are required.";
        exit;
    }

    if ($password !== $confirmPassword) {
        echo "Passwords do not match.";
        exit;
    }

    // TODO: Connect to MySQL and store user securely
    // Example (to be replaced later):
    // $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    // Insert into database (fullname, email, $hashedPassword)

    echo "Registration successful for: " . htmlspecialchars($fullname);
}
?>
