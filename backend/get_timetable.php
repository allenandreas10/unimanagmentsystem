<?php
global $pdo;
session_start();
require 'db.php';

if(!isset($_SESSION['user_id'])){
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];
$stmt = $pdo->prepare("SELECT * FROM timetables WHERE user_id=? ORDER BY created_at DESC");
$stmt->execute([$user_id]);
$timetables = $stmt->fetchAll();

echo json_encode($timetables);
?>
