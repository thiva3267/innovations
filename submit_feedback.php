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

// Only run when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize inputs
    $feedback = $conn->real_escape_string($_POST['feedback']);
    $email = $conn->real_escape_string($_POST['email']);

    // Insert into database
    $sql = "INSERT INTO feedback (feedback_text, email) VALUES ('$feedback', '$email')";

    if ($conn->query($sql) === TRUE) {
        // Redirect to Thank You page to avoid form resubmission
        header("Location: thankyou.html");
        exit;
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
