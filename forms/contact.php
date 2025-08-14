<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@designmend.com';

  if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
  } else {
    die('Unable to load the "PHP Email Form" Library!');
  }

  // Create a new instance of the form handler
  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  // Set the email recipient
  $contact->to = $receiving_email_address;

  // Collect form data and validate
  if (!empty($_POST)) {
    $contact->from_name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $contact->from_email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $contact->subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $contact->message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Add email headers (optional but recommended)
    $contact->headers = 'From: ' . $contact->from_email . "\r\n" .
                        'Reply-To: ' . $contact->from_email . "\r\n" .
                        'X-Mailer: PHP/' . phpversion();

    // Check if email is valid
    if (!$contact->from_email) {
      die('Invalid email address');
    }

    // Send the email
    if ($contact->send()) {
      echo 'Email sent successfully!';
    } else {
      die('Email failed to send.');
    }
  } else {
    die('No form data received.');
  }
?>
