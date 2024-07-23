<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/PHPMailer.php';

error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['data'])) {
    
    $data = $_POST['data'];

    // Save data to a file (data.txt) in a specific folder on the server
    $folderPath = 'E:\hamdan\Corvus\Corvus-master\Demo Items'; // Update with your actual server folder path
    $file = $folderPath . 'data.txt';
    file_put_contents($file, $data);

    // Collect form data
    $fullName = $_POST['fname'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $attachmentPath = $file; // Get path to attachment from the form

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 2;                                       // Enable verbose debug output
        $mail->isSMTP();                                            // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                                   // Enable SMTP authentication
        $mail->Username = 'digioussolutions123@gmail.com';                 // SMTP username
        $mail->Password = 'mazqkerscbfqvray';                     // SMTP password (use App Password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        // Recipients
        $mail->setFrom($email, $fullName);
        $mail->addAddress("$email", "$fullName"); // Add a recipient

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body = "Name: $fullName<br>Email: $email<br>Message: $message";
        $mail->AltBody = "Name: $fullName\nEmail: $email\nMessage: $message";

        // Add the attachment
        $mail->addAttachment($attachmentPath);

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request method.";
}