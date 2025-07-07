<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $feedback = $_POST['feedback'];

    // Save to file (or database/email)
    $data = "Email: $email\nFeedback: $feedback\n\n";
    file_put_contents("feedbacks.txt", $data, FILE_APPEND);

    // Redirect to avoid form resubmission
    header("Location: thankyou.html");
    exit;
}
?>
