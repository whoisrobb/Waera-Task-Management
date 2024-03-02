const { Op } = require("sequelize");
const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.User;


/* GET INITIALS */
const initials = (str1, str2) => {
    if (!str1 || !str2) {
      return "";
    }
    return str1[0].toUpperCase() + str2[0].toUpperCase();
 }


/* GET ALL USERS */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* CREATE USER */
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const newUser = await User.create({
            FirstName: firstName,
            LastName: lastName,
            Username: username,
            Email: email,
            Password: password
        });

        const token = jwt.sign(
            {
                userId: newUser.UserID,
                username: newUser.Username,
                firstName: newUser.FirstName,
                lastName: newUser.LastName,
                email: newUser.Email,
                initials: initials(newUser.FirstName, newUser.LastName)
            },
            process.env.JWT_SECRET
        );

        res.status(201).json({ message: `Successfully signed in as ${newUser.Username}`, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* LOGIN USER */
const loginUser = async (req, res) => {
    try {
        const { value, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { Username: value },
                    { Email: value },
                ],
            },
        });
        
        if (!user) {
            return res.status(404).json({ message: 'Invalid User!' });
        };

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        };

        const token = jwt.sign(
            {
                userId: user.UserID,
                username: user.Username,
                firstName: user.FirstName,
                lastName: user.LastName,
                email: user.Email,
                initials: initials(user.FirstName, user.LastName)
            },
            process.env.JWT_SECRET
        );

        res.status(200).json({ message: `Successfully signed in as ${user.Username}`, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


module.exports = {
    getAllUsers,
    createUser,
    loginUser,
};