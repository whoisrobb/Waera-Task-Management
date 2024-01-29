const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv').config();
// const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');
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

const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));