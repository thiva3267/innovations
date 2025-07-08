<?php
// Set content type to JSON for future extensibility
header('Content-Type: application/json');

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize and validate input
    $feedback = trim(filter_input(INPUT_POST, 'feedback', FILTER_SANITIZE_STRING));
    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));

    if (empty($feedback) || empty($email)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Please provide both feedback and email.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
        exit;
    }

    // Prepare log file (you can replace this with a DB connection)
    $logFile = __DIR__ . '/feedback_log.txt';
    $entry = "[" . date('Y-m-d H:i:s') . "] Email: $email\nFeedback: $feedback\n---\n";

    // Save to file
    if (file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX)) {
        // OPTIONAL: send email to admin
        $adminEmail = "admin@example.com";
        $subject = "New Website Feedback Received";
        $body = "You received new feedback:\n\n$entry";

        // mail($adminEmail, $subject, $body); // Uncomment to send email

        echo json_encode(['status' => 'success', 'message' => 'Thanks for your feedback!']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to save feedback. Try again later.']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
