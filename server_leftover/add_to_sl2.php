<?php

try {
  $conn = new PDO("mysql:host=localhost;dbname=leftover", "root", "root");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$item_id = $_POST['item_id'];
$name = $_POST['name'];
$image = $_POST['image'];

$query = "INSERT INTO shopping_list (item_id, user_id, name, image) VALUES ('$item_id', 1, '$name', '$image')";

$result = $conn->query($query);
if($result){
  echo json_encode(true);
} else {
  echo json_encode(false);
}

/*
CREATE TABLE shopping_list (
 slitem_id INT NOT NULL AUTO_INCREMENT,
 item_id INT (11),
 user_id INT (11) NOT NULL,
 name VARCHAR (255) NOT NULL,
 image LONGTEXT NOT NULL,
 PRIMARY KEY (slitem_id)
);
*/

?>