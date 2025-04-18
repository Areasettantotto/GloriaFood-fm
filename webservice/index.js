// webservice/index.js
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.get('/restaurants/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM restaurants WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).send({ message: 'Not found' });
    res.send(rows[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(process.env.PORT || 3002, () => {
  console.log(`Webservice running on port ${process.env.PORT || 3002}`);
});
