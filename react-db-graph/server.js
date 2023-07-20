<<<<<<< Updated upstream
// server.js
const express = require('express');
const connection = require('./src/db');

const app = express();
const port = 5000;

app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM Organism', (error, results) => {
    if (error) {
      console.error('Error fetching data from MySQL:', error);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
=======
// server.js
const express = require('express');
const connection = require('./src/db');

const app = express();
const port = 5000;

app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM Organism', (error, results) => {
    if (error) {
      console.error('Error fetching data from MySQL:', error);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
>>>>>>> Stashed changes
});