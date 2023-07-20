// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'dbrocks46',
  password: 'reallysecurepassword',
  database: 'princess_vlei',
});

module.exports = connection;