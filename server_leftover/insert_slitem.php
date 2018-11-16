<?php

try {
  $conn = new PDO("mysql:host=localhost;dbname=leftover", "root", "root");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$name = $_POST['name'];

$query = "INSERT INTO shopping_list (user_id, name, image) VALUES (1, '$name', 'imagesrc')";

$result = $conn->query($query);
if($result){
  echo json_encode(true);
} else {
  echo json_encode(false);
}

?>