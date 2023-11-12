const mysql = require("mysql2")

const connection = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "Rifan200418",
    database : "test"
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks_dbs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating the table:', err);
  } else {
    console.log('Table created successfully!');
  }
});

module.exports = connection