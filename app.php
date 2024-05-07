<?php
// Database connection parameters
$servername = "127.0.0.1";
$username = "pathFinder";
$password = "pf123456";
$dbname = "pathfinder";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Assuming you receive user input (in a real-world scenario, you would sanitize and validate input)
$user_id = $_POST['user_id'];
$test_name = $_POST['test_name'];
$result = $_POST['result'];

// Insert new psychometric result into the database
$sql = "INSERT INTO psychometric_results (user_id, test_name, result) VALUES ('$user_id', '$test_name', '$result')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Retrieve psychometric results from the database
$sql = "SELECT * FROM psychometric_results WHERE user_id = '$user_id'";

$result = $conn->query($sql);

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . " - Test Name: " . $row["test_name"] . " - Result: " . $row["result"] . "<br>";
    }
} else {
    echo "0 results";
}

// Close the database connection
$conn->close();
?>
//
$hostname: This almost always refers to ‘localhost’ unless you are connecting to an external database.

$username: This is the MySQL user you want to connect with. Keep in mind the user must be assigned to the database.

$password: This is the password for the username you just entered.  This variable specifies the database password. It should be the same password you use to access PHPMyAdmin.

$dbname: This refers to the database name you wish to connect to.

$usertable: This is not needed to connect but in this script, it refers to a specific table within the database.

$yourfield: This is not needed to connect to the database but tells the script which field to echo to the screen.
//
