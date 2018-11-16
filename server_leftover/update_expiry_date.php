<?php

try {
  $conn = new PDO("mysql:host=localhost;dbname=leftover", "root", "root");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$item_id = $_POST['item_id'];
$exp_date = $_POST['exp_date'];

$query = "UPDATE items SET expiry_date='$exp_date' WHERE item_id='$item_id'";

$result = $conn->query($query);
if($result){
  echo json_encode(true);
} else {
  echo json_encode(false);
}

?>