"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const team_1 = __importDefault(require("./routes/team"));
/* CONFIGURATIONS */
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/files', express_1.default.static(path_1.default.join(__dirname, 'files')));
/* ROUTES */
app.use('/auth', auth_1.default);
app.use('/user', user_1.default);
app.use('/team', team_1.default);
app.get('/', (req, res) => {
    res.json({ greeting: 'Wsgood' });
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
