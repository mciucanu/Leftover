<?php

try {
  $conn = new PDO("mysql:host=localhost;dbname=leftover", "root", "root");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$_id = $_POST['id'];

$query = "SELECT * FROM items WHERE item_id='$_id'";

$result = $conn->query($query);
if($result){
  $item = $result->fetchAll();
  echo json_encode($item);
} else {
  echo json_encode(false);
}

?>