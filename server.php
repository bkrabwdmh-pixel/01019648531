<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$data = [
    'ip' => $_SERVER['REMOTE_ADDR'],
    'user_agent' => $_SERVER['HTTP_USER_AGENT'],
    'time' => date('Y-m-d H:i:s'),
    'headers' => getallheaders(),
    'get_params' => $_GET,
    'post_data' => file_get_contents('php://input')
];

// حفظ في ملف
file_put_contents('hacker_data.txt', json_encode($data, JSON_PRETTY_PRINT) . "\n\n", FILE_APPEND);

// إرسال بريد إلكتروني فوري (إذا كان لديك إعداد SMTP)
/*
$to = "your-email@example.com";
$subject = "⚠️ Hacker Trapped - " . $data['time'];
$message = print_r($data, true);
mail($to, $subject, $message);
*/

echo json_encode(['status' => 'success']);
?>
