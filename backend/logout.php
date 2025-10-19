<?php
session_start();
$_SESSION = [];
session_destroy();
header("Location: ../StarterPage/login.php");
exit();
