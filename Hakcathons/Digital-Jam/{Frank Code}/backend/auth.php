<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'register':
                $email = $data['email'];
                $password = password_hash($data['password'], PASSWORD_BCRYPT);
                
                $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
                if ($stmt->execute([$email, $password])) {
                    echo json_encode(['success' => true, 'message' => 'Registration successful']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Registration failed']);
                }
                break;
                
            case 'login':
                $email = $data['email'];
                $password = $data['password'];
                
                $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
                $stmt->execute([$email]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($user && password_verify($password, $user['password'])) {
                    session_start();
                    $_SESSION['user_id'] = $user['id'];
                    echo json_encode(['success' => true, 'user_id' => $user['id']]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
                }
                break;
        }
    }
}
?>