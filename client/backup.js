const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team')
const { sequelize } = require('./models');
const config = require('./config.json');
const dbConfig = config.development;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
});

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());


/* SEQUELIZE SETUP */
// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        console.log('Database and tables synced')
    })
    .catch((err) => {
        console.error(err)
    })


/* ROUTES */
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/team', teamRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));