<?php
/**
 * Contact Form Handler for AP Real Estate Solutions
 * This script handles form submissions and sends emails
 */

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form type
$formType = isset($_POST['form-type']) ? trim($_POST['form-type']) : 'contact';

// Get form data - handle different form structures
$firstName = isset($_POST['first-name']) ? trim($_POST['first-name']) : (isset($_POST['fname']) ? trim($_POST['fname']) : (isset($_POST['name']) ? trim($_POST['name']) : (isset($_POST['tenant-name']) ? trim($_POST['tenant-name']) : '')));
$lastName = isset($_POST['last-name']) ? trim($_POST['last-name']) : (isset($_POST['lname']) ? trim($_POST['lname']) : '');
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$enquiryType = isset($_POST['enquiry-type']) ? trim($_POST['enquiry-type']) : $formType;
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$gdpr = isset($_POST['gdpr']) ? true : false;

// Additional fields for different forms
$property = isset($_POST['property']) ? trim($_POST['property']) : (isset($_POST['address']) ? trim($_POST['address']) : (isset($_POST['property-address']) ? trim($_POST['property-address']) : ''));
$bedrooms = isset($_POST['bedrooms']) ? trim($_POST['bedrooms']) : '';
$propertyType = isset($_POST['property-type']) ? trim($_POST['property-type']) : '';
$paymentOption = isset($_POST['payment-option']) ? trim($_POST['payment-option']) : '';
$issueType = isset($_POST['issue-type']) ? trim($_POST['issue-type']) : '';
$contactTime = isset($_POST['contact-time']) ? trim($_POST['contact-time']) : '';

// Validation
$errors = [];

// Name validation (handle different name field structures)
if (empty($firstName)) {
    $errors[] = 'Name is required';
}

// Email validation
if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address';
}

// Form-specific validation
if ($formType === 'contact') {
    if (empty($lastName)) {
        $errors[] = 'Last name is required';
    }
    if (empty($enquiryType) || $enquiryType === 'contact') {
        $errors[] = 'Enquiry type is required';
    }
    if (empty($message)) {
        $errors[] = 'Message is required';
    }
} elseif ($formType === 'valuation') {
    if (empty($property)) {
        $errors[] = 'Property address is required';
    }
    if (!empty($bedrooms) && empty($bedrooms)) {
        $errors[] = 'Number of bedrooms is required';
    }
} elseif ($formType === 'maintenance') {
    if (empty($phone)) {
        $errors[] = 'Phone number is required';
    }
    if (empty($property)) {
        $errors[] = 'Property address is required';
    }
    if (empty($issueType)) {
        $errors[] = 'Issue type is required';
    }
    if (empty($message)) {
        $errors[] = 'Issue description is required';
    }
}

// GDPR validation
if (!$gdpr) {
    $errors[] = 'GDPR consent is required';
}

// If there are errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Email configuration
// TODO: Update these with your actual email address
$to = 'info@ap-propertygroup.co.uk'; // Your email address

// Build subject based on form type
$subject = 'New ' . ucfirst($formType) . ' Form Submission - AP Real Estate Solutions';
if ($formType === 'contact' && $enquiryType) {
    $subject = 'New Contact Form Submission - ' . ucfirst($enquiryType);
} elseif ($formType === 'maintenance' && $issueType) {
    $subject = 'New Maintenance Request - ' . ucfirst($issueType);
}

// Build email body based on form type
$emailBody = "New " . ucfirst($formType) . " form submission from AP Real Estate Solutions website:\n\n";

$emailBody .= "Name: " . ($lastName ? $firstName . ' ' . $lastName : $firstName) . "\n";
$emailBody .= "Email: {$email}\n";
if ($phone) {
    $emailBody .= "Phone: {$phone}\n";
}
if ($property) {
    $emailBody .= "Property Address: {$property}\n";
}

// Form-specific fields
if ($formType === 'contact') {
    $emailBody .= "Enquiry Type: " . ucfirst($enquiryType) . "\n";
    if ($message) {
        $emailBody .= "\nMessage:\n{$message}\n";
    }
} elseif ($formType === 'valuation') {
    if ($bedrooms) {
        $emailBody .= "Bedrooms: {$bedrooms}\n";
    }
    if ($propertyType) {
        $emailBody .= "Property Type: " . ucfirst($propertyType) . "\n";
    }
    if ($paymentOption) {
        $emailBody .= "Payment Preference: {$paymentOption}\n";
    }
    if ($message) {
        $emailBody .= "\nAdditional Details:\n{$message}\n";
    }
} elseif ($formType === 'maintenance') {
    $emailBody .= "Issue Type: " . ucfirst($issueType) . "\n";
    if ($contactTime) {
        $emailBody .= "Preferred Contact Time: " . ucfirst($contactTime) . "\n";
    }
    if ($message) {
        $emailBody .= "\nIssue Description:\n{$message}\n";
    }
}

$emailBody .= "\n---\nThis email was sent from the " . $formType . " form on your website.";

// Email headers
$headers = [
    'From: ' . $email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    // Optional: Send auto-reply to user
    $autoReplySubject = 'Thank you for contacting AP Real Estate Solutions';
    $autoReplyMessage = '';
    
    if ($formType === 'contact') {
        $autoReplyMessage = "your enquiry regarding " . ($enquiryType ? ucfirst($enquiryType) : 'our services');
    } elseif ($formType === 'valuation') {
        $autoReplyMessage = "your property valuation request";
    } elseif ($formType === 'maintenance') {
        $autoReplyMessage = "your maintenance request";
    } else {
        $autoReplyMessage = "your submission";
    }
    
    $autoReplyBody = "
Dear " . ($lastName ? $firstName : explode(' ', $firstName)[0]) . ",

Thank you for contacting AP Real Estate Solutions. We have received {$autoReplyMessage} and will get back to you within 24 hours.

Best regards,
AP Real Estate Solutions Team
";
    
    $autoReplyHeaders = [
        'From: ' . $to,
        'Reply-To: ' . $to,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    mail($email, $autoReplySubject, $autoReplyBody, implode("\r\n", $autoReplyHeaders));
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! We\'ll be in touch soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message. Please try again later or contact us directly.'
    ]);
}
?>

