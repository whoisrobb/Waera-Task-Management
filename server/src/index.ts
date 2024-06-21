import express from 'express';
import path from 'path';
import cors from 'cors';
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import teamRoutes from './routes/team'

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'files')));


/* ROUTES */
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/team', teamRoutes);


app.get('/', (req, res) => {
    res.json({ greeting: 'Wsgood' })
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})