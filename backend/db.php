<?php
$host = 'localhost';
$db = 'timetable_manager';
$user = 'root'; // your DB username
$pass = '';     // your DB password

// Create connection
$conn = new mysqli($host, $user, $pass, $db, 3307);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optional: set charset to utf8mb4
$conn->set_charset("utf8mb4");
?>

