const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');
const { sequelize } = require('./models');


/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());


/* ROUTES */
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/team', teamRoutes);


/* CONNECT ALL THE MODELS TO THE DATABASE */
// sequelize.sync({ force: true })
sequelize.sync()
  .then(() => console.log('Models synced successfully!'))
  .catch((error) => console.error('Error syncing models:', error));


const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));