<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: ../StarterPage/login.php");
    exit();
}
$username = $_SESSION['username'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome | University Timetable Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="home.css">
</head>
<body>
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">Timetable Manager</a>
        <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="../StudyPage/builder.html">Builder</a></li>
            <li class="nav-item"><a class="nav-link" href="../ProfilePage/profile.php">Profile</a></li>
            <li class="nav-item"><a class="nav-link text-warning" href="../StarterPage/login.php">Logout</a></li>
        </ul>
    </div>
</nav>

<!-- Hero Section -->
<section class="hero-section text-center text-light d-flex align-items-center justify-content-center flex-column">
    <div class="container">
        <h1 class="fw-bold">Welcome, <span id="username"><?php echo htmlspecialchars($username); ?></span> 👋</h1>
        <p class="lead mt-2">Easily create, manage, and personalize your university timetable.</p>
        <div class="mt-4">
            <a href="../StudyPage/builder.html" class="btn btn-success btn-lg me-3">Open Timetable Builder</a>
            <a href="../ProfilePage/profile.html" class="btn btn-outline-light btn-lg">View Profile</a>
        </div>
    </div>
</section>

</body>
</html>
