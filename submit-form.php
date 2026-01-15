<?php
// Error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set your email address where you want to receive form submissions
$to_email = "skfardin768@gmail.com";

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize
    $name = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
    $phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $device = isset($_POST["device"]) ? strip_tags(trim($_POST["device"])) : '';
    $issue = isset($_POST["issue"]) ? strip_tags(trim($_POST["issue"])) : '';
    
    // Validate required fields
    if (empty($name) || empty($phone) || empty($email) || empty($device) || empty($issue)) {
        die("Error: All fields are required. <a href='index.html'>Go back</a>");
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Error: Invalid email address. <a href='index.html'>Go back</a>");
    }
    
    // Email subject
    $subject = "New Service Request - Phone Repair Zone";
    
    // Build email message
    $message = "You have received a new service request from your website.\n\n";
    $message .= "Details:\n";
    $message .= "------------------------\n";
    $message .= "Name: $name\n";
    $message .= "Phone: $phone\n";
    $message .= "Email: $email\n";
    $message .= "Device Type: $device\n";
    $message .= "Issue Description:\n$issue\n";
    $message .= "------------------------\n\n";
    $message .= "Submitted on: " . date("F j, Y, g:i a") . "\n";
    
    // Get domain name for From header
    $domain = $_SERVER['HTTP_HOST'];
    
    // Email headers - Updated for better compatibility
    $headers = "From: Phone Repair Zone <noreply@$domain>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    $mail_sent = @mail($to_email, $subject, $message, $headers);
    
    if ($mail_sent) {
        // Success - redirect to thank you page
        header("Location: thank-you.html");
        exit;
    } else {
        // Email failed - show error message
        echo "<h2>Error Sending Email</h2>";
        echo "<p>There was a problem sending your request. Please try again or contact us directly at (602) 897-4917.</p>";
        echo "<p><a href='index.html'>Go back to form</a></p>";
        echo "<!-- Debug Info: Mail function returned false -->";
        exit;
    }
    
} else {
    // Not a POST request
    header("Location: index.html");
    exit;
}
?>
