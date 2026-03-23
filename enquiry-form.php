<?php
header('Content-Type: application/json');

include './conn.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'mailer/Exception.php';
require 'mailer/PHPMailer.php';
require 'mailer/SMTP.php';

// =============================
// GOOGLE SHEETS WEB APP URL
// =============================
$googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwfhaXG5Rp3fBoKKtsfcMHOOXpfVG22CgLNVY6PVlBsG0aGFKMvJGjqHOLAW8kStm_a/exec';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// =============================
// GET & SANITIZE INPUT
// =============================
$name   = trim($_POST['name'] ?? '');
$email  = trim($_POST['email'] ?? '');
$mobile = trim($_POST['mobile'] ?? '');

// =============================
// VALIDATION
// =============================
if (empty($name) || empty($email) || empty($mobile)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'All fields are required.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid email format.'
    ]);
    exit;
}

if (!preg_match('/^\d{10}$/', $mobile)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Phone number must be 10 digits.'
    ]);
    exit;
}

// =============================
// INSERT INTO DATABASE
// =============================
$stmt = $conn->prepare("INSERT INTO contact_enquiries (name, email, mobile, created_at) VALUES (?, ?, ?, NOW())");

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database preparation failed.'
    ]);
    exit;
}

$stmt->bind_param("sss", $name, $email, $mobile);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to save enquiry.'
    ]);
    exit;
}

// =============================
// SAVE TO GOOGLE SHEETS
// =============================
$sheetSaved = false;

$sheetPayload = [
    'name'       => $name,
    'email'      => $email,
    'mobile'     => $mobile,
    'created_at' => date('Y-m-d H:i:s'),
    'source'     => 'Website Enquiry Form'
];

$ch = curl_init($googleScriptUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($sheetPayload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$sheetResponse = curl_exec($ch);
$httpCode      = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError     = curl_error($ch);

curl_close($ch);

$responseData = json_decode($sheetResponse, true);

if (
    !$curlError &&
    (
        ($httpCode >= 200 && $httpCode < 300) ||
        (is_array($responseData) && isset($responseData['status']) && $responseData['status'] === 'success')
    )
) {
    $sheetSaved = true;
}

// =============================
// EMAIL TEMPLATE
// =============================
$body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 15px;background:#f3f4f6;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <tr>
            <td style="padding:20px 24px;color:#ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle" style="width:140px;">
                    <img
                      src="https://projects.ramaniyam.com/logo.svg"
                      alt="Logo"
                      style="max-width:110px;height:auto;display:block;"
                    />
                  </td>

                  <td align="right" valign="middle" style="color:#932223;">
                    <div style="font-size:22px;font-weight:700;line-height:1.3;">
                      New Enquiry Received
                    </div>
                    <div style="padding-top:6px;font-size:13px;opacity:0.9;line-height:1.5;">
                      A new enquiry has been submitted.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

                <tr>
                  <td style="padding:14px 16px;background:#f9fafb;border:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#111827;width:35%;">
                    Full Name
                  </td>
                  <td style="padding:14px 16px;background:#ffffff;border:1px solid #e5e7eb;font-size:14px;color:#374151;">
                    ' . htmlspecialchars($name) . '
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 16px;background:#f9fafb;border:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#111827;">
                    Email Address
                  </td>
                  <td style="padding:14px 16px;background:#ffffff;border:1px solid #e5e7eb;font-size:14px;color:#374151;">
                    ' . htmlspecialchars($email) . '
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 16px;background:#f9fafb;border:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#111827;">
                    Phone Number
                  </td>
                  <td style="padding:14px 16px;background:#ffffff;border:1px solid #e5e7eb;font-size:14px;color:#374151;">
                    ' . htmlspecialchars($mobile) . '
                  </td>
                </tr>

             

              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#6b7280;">
              ' . date("Y") . ' Ramaniyam. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

// =============================
// SEND EMAIL
// =============================
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'mail.ayatiworks.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'emailsmtp@ayatiworks.com';
    $mail->Password   = 'hYd@W,$nwNjC';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->setFrom('emailsmtp@ayatiworks.com', 'Website Enquiry');
    $mail->addAddress('balaji@ayatiworks.com');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'New Website Enquiry Received';
    $mail->Body    = $body;
    $mail->AltBody = "New Enquiry Received\n\nName: $name\nEmail: $email\nPhone: $mobile\nGoogle Sheets: " . ($sheetSaved ? "Saved successfully" : "Sync failed");

    $mail->send();

    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you! Your enquiry has been submitted successfully.'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status'  => $sheetSaved ? 'warning' : 'error',
        'message' => $sheetSaved
            ? 'Enquiry saved successfully and stored in Google Sheets, but email notification failed.'
            : 'Enquiry saved successfully in database, but Google Sheets sync and email notification failed.'
    ]);
}

$stmt->close();
$conn->close();
?>