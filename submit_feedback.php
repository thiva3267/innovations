<?php
// Set content type to JSON for consistency with frontend
header('Content-Type: application/json');

// --- Database Configuration ---
// IMPORTANT: Replace with your actual database credentials
define('DB_SERVER', 'localhost'); // e.g., 'localhost' or your database host
define('DB_USERNAME', 'your_db_username'); // e.g., 'root'
define('DB_PASSWORD', 'your_db_password'); // e.g., '' (empty for no password)
define('DB_NAME', 'your_database_name'); // The name of your database

// Create database connection
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($conn->connect_error) {
    // Log error securely and return a generic error to the client
    error_log("Database Connection Failed: " . $conn->connect_error);
    http_response_code(500); // Internal Server Error
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed. Please try again later.']);
    exit;
}

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize and validate input
    // Using filter_input for safer data retrieval
    $feedback = filter_input(INPUT_POST, 'feedback', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

    // Basic validation
    if (empty($feedback)) {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Feedback cannot be empty.']);
        $conn->close();
        exit;
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
        $conn->close();
        exit;
    }

    // Prepare an SQL INSERT statement using prepared statements for security
    $sql = "INSERT INTO feedback (email, feedback) VALUES (?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters to the statement
        // 'ss' indicates that both parameters are strings
        $stmt->bind_param("ss", $email, $feedback);

        // Execute the prepared statement
        if ($stmt->execute()) {
            // Success
            http_response_code(200); // OK
            echo json_encode(['status' => 'success', 'message' => 'Thank you for your feedback!']);
        } else {
            // Error in execution
            error_log("SQL Execution Failed: " . $stmt->error);
            http_response_code(500); // Internal Server Error
            echo json_encode(['status' => 'error', 'message' => 'Failed to save feedback. Please try again.']);
        }

        // Close the statement
        $stmt->close();
    } else {
        // Error in preparing the statement
        error_log("SQL Prepare Failed: " . $conn->error);
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'error', 'message' => 'Server error preparing statement.']);
    }

} else {
    // Request method is not POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

// Close the database connection
$conn->close();
?>
