<?php
global $pdo;
session_start();
require 'db.php';

if(!isset($_SESSION['user_id'])){
    echo json_encode(["status"=>"error", "message"=>"Not logged in"]);
    exit;
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $modules = json_encode($_POST['modules']);

    $stmt = $pdo->prepare("UPDATE timetables SET name=?, modules=?, updated_at=NOW() WHERE id=? AND user_id=?");
    $stmt->execute([$name, $modules, $id, $_SESSION['user_id']]);

    echo json_encode(["status"=>"success"]);
}
?>

