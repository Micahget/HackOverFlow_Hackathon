const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_db",
});

connection.connect();
//create a database
// connection.query("CREATE DATABASE my_db", (err, result) => {
//   if (err) throw err;
//   console.log("Database created");
// });

//create a table
connection.query(
  "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))",
  (err, result) => {
    if (err) throw err;
    console.log("Table created");
  }
);
connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
});

connection.end();
