
<?php
session_start();
require 'db.php';

if(!isset($_SESSION['user_id'])){
    echo json_encode(["status"=>"error", "message"=>"Not logged in"]);
    exit;
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $user_id = $_SESSION['user_id'];
    $name = $_POST['name'];
    $modules = json_encode($_POST['modules']); // array of modules

    $stmt = $pdo->prepare("INSERT INTO timetables (user_id, name, modules) VALUES (?, ?, ?)");
    $stmt->execute([$user_id, $name, $modules]);

    echo json_encode(["status"=>"success"]);
}
?>
