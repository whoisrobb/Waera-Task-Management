"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
/* GET INITIALS */
const initials = (str1, str2) => {
    if (!str1 || !str2) {
        return "";
    }
    return str1[0].toUpperCase() + str2[0].toUpperCase();
};
/* GET ALL USERS */
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.default.select().from(schema_1.UserTable);
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllUsers = getAllUsers;
/* CREATE USER */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield db_1.default.insert(schema_1.UserTable).values({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })
            .returning();
        const token = jsonwebtoken_1.default.sign({
            userId: newUser[0].userId,
            firstName: newUser[0].firstName,
            lastName: newUser[0].lastName,
            email: newUser[0].email,
            domain: newUser[0].domain,
            avatar: newUser[0].avatar,
            initials: initials(newUser[0].firstName, newUser[0].lastName)
        }, process.env.JWT_SECRET);
        res.status(201).json({ message: `Successfully signed in as ${newUser[0].firstName} ${newUser[0].lastName}`, token });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.createUser = createUser;
/* LOGIN USER */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, password } = req.body;
        const user = yield db_1.default.query.UserTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.UserTable.email, value),
        });
        if (!user) {
            return res.status(404).json({ message: 'Invalid User!' });
        }
        ;
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }
        ;
        const token = jsonwebtoken_1.default.sign({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            domain: user.domain,
            avatar: user.avatar,
            initials: initials(user.firstName, user.lastName)
        }, process.env.JWT_SECRET);
        res.status(200).json({ message: `Successfully signed in as ${user.firstName} ${user.lastName}`, token });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.loginUser = loginUser;
