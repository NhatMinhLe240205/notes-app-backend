const mysql = require('mysql2');

// Create a connection to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notes_app',
  waitForConnections: true,
  connectionLimit: 10,
});

//exporting the pool to be used in other files
module.exports = pool;

