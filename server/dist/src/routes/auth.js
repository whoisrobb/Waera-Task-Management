"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
/* GET ALL USERS */
router.get('/', user_1.getAllUsers);
/* CREATE USER */
router.post('/register', user_1.createUser);
/* LOGIN USER */
router.post('/login', user_1.loginUser);
exports.default = router;
