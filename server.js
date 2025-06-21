
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();

const port = 3300;

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DFF_DB_HOST,
  user: process.env.DFF_DB_USER,
  password: process.env.DFF_DB_PASSWORD,
  database: process.env.DFF_DB_DATABASE,
  port: process.env.DFF_DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET routes
app.get('/api/v1/animals', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT 
      a.*, 
      f.field_name, 
      f.acre_size
    FROM animal a
    LEFT JOIN history h ON a.id = h.animal_id
    LEFT JOIN field f ON h.field_id = f.id
    ORDER BY a.id
  `);
  res.json(rows);
});


app.get('/api/v1/fields', async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM field");
  res.json(rows);
});

app.get('/api/v1/leases', async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM lease");
  res.json(rows);
});

app.get('/api/v1/animal-events', async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM animal_events");
  res.json(rows);
});

app.get('/api/v1/field-events', async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM field_events");
  res.json(rows);
});

// POST update route for animals
app.post('/api/v1/animals/update', async (req, res) => {
  const updated = req.body;
  try {
    for (const animal of updated) {
      await pool.query(
        `UPDATE animal SET tag=?, markings=?, sex=?, notes=?, enterprise_owner=?, date_of_birth=?,
        organic_status=?, dam_id=?, sire_id=?, animal_type=? WHERE id=?`,
        [animal.tag, animal.markings, animal.sex, animal.notes, animal.enterprise_owner,
         animal.date_of_birth, animal.organic_status, animal.dam_id, animal.sire_id, animal.animal_type, animal.id]
      );
    }
    res.send("Animal records updated successfully.");
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Failed to update animals.");
  }
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
