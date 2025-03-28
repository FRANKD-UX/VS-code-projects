<?php
require_once 'db.php';

// Enhanced error handling and logging
function logError($message) {
    error_log($message, 3, 'auth_errors.log');
}

// Input validation function
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Improved password validation
function isPasswordStrong($password) {
    // Require minimum 8 characters, at least one uppercase, one lowercase, and one number
    return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $password);
}

try {
    // Ensure only POST requests are processed
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Parse incoming JSON data
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input data
    if (!$data) {
        throw new Exception('Invalid JSON data');
    }

    if (!isset($data['action'])) {
        throw new Exception('No action specified');
    }

    switch ($data['action']) {
        case 'register':
            // Validate email
            if (!isset($data['email']) || !validateEmail($data['email'])) {
                throw new Exception('Invalid email address');
            }

            // Validate password strength
            if (!isset($data['password']) || !isPasswordStrong($data['password'])) {
                throw new Exception('Password does not meet strength requirements');
            }

            $email = $data['email'];
            $password = password_hash($data['password'], PASSWORD_BCRYPT);

            // Check if email already exists
            $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
            $checkStmt->execute([$email]);
            if ($checkStmt->fetchColumn() > 0) {
                throw new Exception('Email already registered');
            }

            $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
            if ($stmt->execute([$email, $password])) {
                echo json_encode([
                    'success' => true, 
                    'message' => 'Registration successful'
                ]);
            } else {
                throw new Exception('Registration failed');
            }
            break;

        case 'login':
            // Validate email
            if (!isset($data['email']) || !validateEmail($data['email'])) {
                throw new Exception('Invalid email address');
            }

            if (!isset($data['password'])) {
                throw new Exception('Password is required');
            }

            $email = $data['email'];
            $password = $data['password'];

            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                session_start();
                $_SESSION['user_id'] = $user['id'];
                echo json_encode([
                    'success' => true, 
                    'user_id' => $user['id']
                ]);
            } else {
                throw new Exception('Invalid credentials');
            }
            break;

        default:
            throw new Exception('Unknown action');
    }
} catch (Exception $e) {
    // Log the error and return a generic error response
    logError($e->getMessage());
    
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}
?>