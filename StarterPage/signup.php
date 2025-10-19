<?php
session_start();
$error = $_SESSION['error'] ?? '';
unset($_SESSION['error']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>University Timetable Manager | Sign Up</title>
    <link rel="stylesheet" href="styles/signup.css" />
</head>
<body>
<div class="signup-container">
    <h2>Create an Account</h2>

    <?php if($error): ?>
        <p class="error-msg"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>

    <form id="signupForm" method="POST" action="../backend/register.php">
        <div class="form-group">
            <label for="username">Full Name</label>
            <input type="text" id="username" name="username" placeholder="Enter your full name" required />
        </div>

        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Create a password" required />
        </div>

        <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter your password" required />
        </div>

        <button type="submit" class="btn">Sign Up</button>

        <p class="redirect-text">
            Already have an account? <a href="login.php">Sign in here</a>
        </p>
    </form>
</div>
</body>
</html>
