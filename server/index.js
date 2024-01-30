const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv').config();
// const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');
const { Pool } = require('pg');
const pg = require('pg');
// const { sequelize } = require('./models');
// const config = require('./config.json');
// const dbConfig = config.development;

// const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//     host: dbConfig.host,
//     port: dbConfig.port,
//     dialect: dbConfig.dialect,
// });

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

// async function getPostgresVersion() {
//   const client = await pool.connect();
//   try {
//     const response = await client.query('SELECT version()');
//     console.log(response.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPostgresVersion();

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));