<?php
// Database connection settings
$host = "localhost";
$dbname = "your_database_name";
$username = "your_db_username";
$password = "your_db_password";

// Create DB connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$feedback = $_POST['feedback'];
$email = $_POST['email'];

// Sanitize inputs
$feedback = $conn->real_escape_string($feedback);
$email = $conn->real_escape_string($email);

// Insert into database
$sql = "INSERT INTO feedback (feedback_text, email) VALUES ('$feedback', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "Feedback submitted successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
