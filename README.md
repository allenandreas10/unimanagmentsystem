🎓 University Timetable Manager

A simple web-based application that allows students and administrators to manage university timetables efficiently. The system supports user registration, login authentication, and role-based access to timetable features.


---

🚀 Features

👤 User Management

Register new users with secure password hashing.

Login authentication using PHP sessions.

Error handling for invalid login credentials.


🕒 Timetable Management

View weekly timetables (student role).

Add, edit, or delete timetable entries (admin role).

Organized display by day and time slot.


⚙️ Technical Features

Frontend: HTML5, CSS3, JavaScript

Backend: PHP (with MySQLi)

Database: MySQL

Security: Password hashing using password_hash() and verification using password_verify()



---

📂 Project Structure

UniversityTimetableManager/
│
├── backend/
│   ├── db.php               # Database connection file
│   ├── register.php         # Handles user registration
│   ├── login.php            # Handles user login
│
├── StarterPage/
│   ├── signup.php           # Signup form
│   ├── login.php            # Login form
│   ├── styles/
│   │   ├── login.css
│   │   └── signup.css
│   ├── scripts/
│       ├── signup.js
│       └── login.js
│
├── HomePage/
│   └── home.php             # User dashboard (after login)
│
└── README.md


---

🧩 Database Schema

Database Name: timetable_manager

Table: users

Column Name	Type	Description

id	INT (Primary Key, Auto Increment)	Unique user ID
username	VARCHAR(100)	User’s full name or display name
email	VARCHAR(100)	User’s email address
password	VARCHAR(255)	Hashed password



---

⚙️ Setup Instructions

1. Clone or copy this project into your htdocs or local server directory.


2. Create a MySQL database called timetable_manager.


3. Import the users table (SQL example below):

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


4. Update database credentials in backend/db.php:

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'timetable_manager';


5. Start Apache and MySQL in XAMPP.


6. Access the system:

Sign Up: http://localhost/WAD/StarterPage/signup.php

Login: http://localhost/WAD/StarterPage/login.php





---

🔒 Security Notes

All passwords are encrypted before being stored in the database.

Database queries use prepared statements to prevent SQL injection.

Sessions are used for secure user authentication.



---

💡 Future Enhancements

Add timetable creation/editing interface.

Implement roles (Student / Admin).

Add timetable conflict detection.

Responsive layout for mobile devices.
