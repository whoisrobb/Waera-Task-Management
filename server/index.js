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
const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));