<?php
require_once 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$userId = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Save progress
    $lessonId = $data['lesson_id'];
    $completed = $data['completed'] ? 1 : 0;
    
    $stmt = $pdo->prepare("INSERT INTO user_progress (user_id, lesson_id, completed) 
                          VALUES (?, ?, ?) 
                          ON DUPLICATE KEY UPDATE completed = VALUES(completed)");
    $stmt->execute([$userId, $lessonId, $completed]);
    
    echo json_encode(['success' => true]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Load progress
    $stmt = $pdo->prepare("SELECT lesson_id, completed FROM user_progress WHERE user_id = ?");
    $stmt->execute([$userId]);
    $progress = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($progress);
}
?>