const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');
const { Pool } = require('pg');

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/team', teamRoutes);


/*  DATABASE SETUP */
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function getPostgresVersion() {
  const client = await pool.connect();
  try {
    const response = await client.query('SELECT version()');
    console.log(response.rows[0]);
  } finally {
    client.release();
  }
}

getPostgresVersion();

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));