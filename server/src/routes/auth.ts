import express from 'express';
import { getAllUsers, createUser, loginUser } from '../controllers/user';
const router = express.Router();


/* GET ALL USERS */
router.get('/', getAllUsers);

/* CREATE USER */
router.post('/register', createUser);

/* LOGIN USER */
router.post('/login', loginUser);


export default router;