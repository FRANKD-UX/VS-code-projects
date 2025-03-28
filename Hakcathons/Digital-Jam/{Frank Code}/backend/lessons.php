<?php
require_once 'db_connect.php';

header("Content-Type: application/json");

try {
    $stmt = $conn->query("SELECT id, title, description, difficulty FROM lessons");
    $lessons = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($lessons);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch lessons"]);
}
?>