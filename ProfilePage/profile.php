<?php
session_start();

// Redirect to login page if not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: ../StarterPage/login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile | University Timetable Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="profile.css">
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">Timetable Manager</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="../StudyPage/builder.html">Builder</a></li>
                <li class="nav-item"><a class="nav-link active" href="#">Profile</a></li>
                <li class="nav-item"><a class="nav-link logout" href="../backend/logout.php">Logout</a></li>
            </ul>
        </div>
    </div>
</nav>

<!-- Profile Hero Section -->
<section class="profile-hero text-center text-light d-flex align-items-center justify-content-center flex-column">
    <div class="container">
        <h1 class="fw-bold">Hello, <?php echo htmlspecialchars($_SESSION['username']); ?> 👋</h1>
        <p class="lead mt-2">Manage your account and view your timetables here.</p>
    </div>
</section>

<!-- User Info Cards -->
<section class="py-5 bg-light text-center">
    <div class="container">
        <h2 class="mb-4 fw-bold text-primary">Your Profile</h2>
        <div class="row g-4 justify-content-center">
            <div class="col-md-4">
                <div class="card p-3 h-100 shadow-sm">
                    <h5 class="card-title text-primary">Username</h5>
                    <p class="card-text"><?php echo htmlspecialchars($_SESSION['username']); ?></p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3 h-100 shadow-sm">
                    <h5 class="card-title text-primary">Email</h5>
                    <p class="card-text"><?php echo htmlspecialchars($_SESSION['email'] ?? 'Not set'); ?></p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3 h-100 shadow-sm">
                    <h5 class="card-title text-primary">Actions</h5>
                    <a href="../backend/logout.php" class="btn btn-warning">Logout</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- User Timetables -->
<section class="py-5 text-center">
    <div class="container">
        <h2 class="mb-4 fw-bold text-primary">Your Timetables</h2>
        <div class="timetable-list">
            <!-- Example Card -->
            <div class="timetable-card">
                <h3>Sample Timetable</h3>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="export-btn">Export</button>
            </div>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="text-center py-3 bg-white border-top">
    © 2025 University Timetable Manager
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="profile.js"></script>
</body>
</html>
