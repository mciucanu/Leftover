<?php

try {
  $conn = new PDO("mysql:host=localhost;dbname=leftover", "root", "root");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$name = $_POST['name'];
$added_date = $_POST['added_date'];
$expiry_date = $_POST['expiry_date'];
$days_left = $_POST['days_left'];

$query = "INSERT INTO items (name, added_date, expiry_date, days_left) VALUES ('$name', '$added_date', '$expiry_date', '$days_left')";

$result = $conn->query($query);
if($result){
  echo json_encode(true);
} else {
  echo json_encode(false);
}

/*
CREATE TABLE items (
 item_id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR (255) NOT NULL,
 added_date VARCHAR(10),
 expiry_date VARCHAR(10) NOT NULL,
 days_left VARCHAR(4),
 image VARCHAR(255),
 user_id INT(11),
 PRIMARY KEY (item_id)
);
*/

?>