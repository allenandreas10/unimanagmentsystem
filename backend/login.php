<?php
session_start();
include 'db.php'; // connection using $conn

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $username, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $username;

            header("Location: ../HomePage/home.php");
            exit();
        } else {
            $_SESSION['error'] = "Incorrect password.";
            header("Location: ../StarterPage/login.php");
            exit();
        }
    } else {
        $_SESSION['error'] = "Email not found.";
        header("Location: ../StarterPage/login.php");
        exit();
    }

    $stmt->close();
}
$conn->close();
?>
