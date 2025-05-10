<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../config/config.php';
include_once '../includes/Database.php';

$database = new Database();
$db = $database->connect();

$category = isset($_GET['category']) ? $_GET['category'] : null;
$price = isset($_GET['price']) ? $_GET['price'] : null;
$sort = isset($_GET['sort']) ? $_GET['sort'] : null;

$query = "SELECT p.*, c.name as category_name 
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE 1=1";

if($category && $category != 'all') {
    $query .= " AND c.slug = :category";
}

if($price) {
    $query .= " AND p.price <= :price";
}

switch($sort) {
    case 'price-low':
        $query .= " ORDER BY p.price ASC";
        break;
    case 'price-high':
        $query .= " ORDER BY p.price DESC";
        break;
    case 'name-asc':
        $query .= " ORDER BY p.name ASC";
        break;
    case 'name-desc':
        $query .= " ORDER BY p.name DESC";
        break;
}

$stmt = $db->prepare($query);

if($category && $category != 'all') {
    $stmt->bindParam(':category', $category);
}

if($price) {
    $stmt->bindParam(':price', $price);
}

$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products);
?>
