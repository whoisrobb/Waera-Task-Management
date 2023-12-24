const express = require('express');
const { getAllUsers, createUser, loginUser } = require('../controllers/auth');
const router = express.Router();


/* GET ALL USERS */
router.get('/', getAllUsers);

/* CREATE USER */
router.post('/register', createUser);

/* LOGIN USER */
router.post('/login', loginUser);


module.exports = router;