# Contact Form Setup Guide for Hostinger VPS

## Overview
The contact form has been updated to work with a PHP backend. When you deploy to Hostinger VPS, the form will send emails to your specified address.

## Files Created/Modified

1. **contact-form-handler.php** - PHP script that processes form submissions and sends emails
2. **assets/scripts/main.js** - Updated to send form data to the PHP handler

## Setup Instructions

### Step 1: Update Email Address
Open `contact-form-handler.php` and update line 60 with your actual email address:

```php
$to = 'info@ap-propertygroup.co.uk'; // Change this to your email
```

### Step 2: Upload Files to Hostinger VPS
Upload all files to your VPS, ensuring:
- `contact-form-handler.php` is in the root directory (same level as `index.html`)
- All other files maintain their current structure

### Step 3: Configure PHP Mail (if needed)
Hostinger VPS should have PHP mail() function enabled by default. If emails aren't sending:

1. **Check PHP mail configuration** in your VPS
2. **Consider using SMTP** for more reliable email delivery (see Alternative Setup below)

### Step 4: Test the Form
1. Visit your contact page
2. Fill out and submit the form
3. Check your email inbox for the submission

## Alternative: Using SMTP (More Reliable)

For better email delivery, you can configure SMTP. Here's an example using PHPMailer:

### Install PHPMailer
```bash
composer require phpmailer/phpmailer
```

### Update contact-form-handler.php
Replace the mail() function with PHPMailer SMTP configuration.

## Troubleshooting

### Emails Not Sending?
1. Check PHP error logs on your VPS
2. Verify the email address in `contact-form-handler.php`
3. Test PHP mail() function directly
4. Consider using SMTP instead of PHP mail()

### Form Not Submitting?
1. Check browser console for JavaScript errors
2. Verify `contact-form-handler.php` is accessible at `/contact-form-handler.php`
3. Check file permissions (should be 644 or 755)

### CORS Errors?
If you see CORS errors, the PHP script already includes CORS headers. If issues persist, check your VPS server configuration.

## Security Notes

- The form includes basic validation on both client and server side
- GDPR consent is required before submission
- Consider adding rate limiting to prevent spam
- You may want to add CAPTCHA for additional spam protection

## Support

If you encounter issues:
1. Check Hostinger VPS documentation
2. Review PHP error logs
3. Test the PHP script directly by accessing it in a browser (should show "Method not allowed")

