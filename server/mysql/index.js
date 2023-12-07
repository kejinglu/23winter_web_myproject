const mysql = require("mysql");

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin',
  database: 'node_project', // Specify the database you want to connect to
})
module.exports = { pool }
