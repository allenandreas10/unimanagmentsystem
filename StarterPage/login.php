<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>University Timetable Manager | Sign In</title>
    <link rel="stylesheet" href="styles/login.css" />
</head>
<body>
<div class="login-container">
    <h2>Sign In</h2>

    <!-- Form submits directly to login.php -->
    <form id="loginForm" method="POST" action="../backend/login.php">
        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" class="btn">Login</button>

        <p class="redirect-text">
            Don’t have an account? <a href="signup.php">Create one here</a>
        </p>

        <!-- Display error message from session -->
        <?php
        if (isset($_SESSION['error'])) {
            echo '<p class="error-msg" style="color:red; margin-top:10px;">' . $_SESSION['error'] . '</p>';
            unset($_SESSION['error']);
        }
        ?>
    </form>
</div>
</body>
</html>
