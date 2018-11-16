<?php

try {
  $conn = new PDO("mysql:host=localhost;dbname=leftover", "root", "root");
} catch (PDOException $e) {
  echo "Error".$e->getMessage();
}

$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];

$query = "INSERT INTO users (email, username, password) VALUES ('$email', '$username', '$password')";

$result = $conn->query($query);
if($result){
  echo json_encode(true);
} else {
  echo json_encode(false);
}

/*
CREATE TABLE users (
 user_id INT NOT NULL AUTO_INCREMENT,
 email VARCHAR (255) NOT NULL,
 username VARCHAR (255) NOT NULL,
 password VARCHAR(255) NOT NULL,
 PRIMARY KEY (user_id)
);
*/

?>