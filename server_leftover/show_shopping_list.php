<?php
      
try {
  $conn = new PDO("mysql:host=localhost;dbname=leftover", "root", "root");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}
  
$query = "SELECT * FROM shopping_list";

$result = $conn->query($query);
if($result){
  $users = $result->fetchAll();
  echo json_encode($users);
} else {
  echo json_encode(false);
}

?>