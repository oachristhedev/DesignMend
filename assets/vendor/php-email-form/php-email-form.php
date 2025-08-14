<?php

class PHP_Email_Form {

  public $to;
  public $from_name;
  public $from_email;
  public $subject;
  public $message = ''; // This will hold the body of the email
  public $smtp = array(); // Optional SMTP configuration
  public $ajax = false;

  /**
   * Add message to the email body
   * @param string $message_content The content to be added (e.g., form field value)
   * @param string $label The label (e.g., field name) to be displayed in the email
   * @param int $priority Priority can determine the order or relevance (optional)
   */
  public function add_message($message_content, $label, $priority = 0) {
    // Append each message field with label and value to the $message property
    $this->message .= "$label: $message_content\n";  // Appending new line for readability
  }

  /**
   * Send the email using PHP's mail() function or SMTP
   * @return string Status message indicating success or failure
   */
  public function send() {
    // Set email headers
    $headers = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
    $headers .= "Reply-To: " . $this->from_email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Subject
    $subject = $this->subject;

    // Message body (which will include the messages added with add_message())
    $message = $this->message;

    // If SMTP settings are provided, use SMTP to send email
    if (!empty($this->smtp)) {
      return $this->send_smtp($subject, $message, $headers); // Use SMTP if configured
    } else {
      // Send using PHP's built-in mail() function
      if (mail($this->to, $subject, $message, $headers)) {
        return 'Mail sent successfully!';
      } else {
        return 'Mail sending failed!';
      }
    }
  }

  /**
   * Placeholder for sending via SMTP
   */
  private function send_smtp($subject, $message, $headers) {
    // Implement PHPMailer or another library here if SMTP is needed
    // Placeholder function, return 'Not implemented' for now
    return 'SMTP is not implemented in this code!';
  }
}

?>
