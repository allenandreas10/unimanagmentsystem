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
    $stmt = $pdo->prepare("DELETE FROM timetables WHERE id=? AND user_id=?");
    $stmt->execute([$id, $_SESSION['user_id']]);
    echo json_encode(["status"=>"success"]);
}
?>
