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
exports.deleteBoard = exports.getSingleBoard = exports.createBoard = exports.getUserBoards = void 0;
const db_1 = __importDefault(require("../db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
/* GET USER BOARDS */
const getUserBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const boards = yield db_1.default.select()
            .from(schema_1.BoardTable)
            .where((0, drizzle_orm_1.eq)(schema_1.BoardTable.userId, userId));
        res.status(200).json(boards);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.getUserBoards = getUserBoards;
/* CREATE BOARD */
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardName, description, userId } = req.body;
        const newBoard = yield db_1.default.insert(schema_1.BoardTable).values({
            name: boardName,
            description: description,
            userId: userId
        })
            .returning();
        res.status(201).json(newBoard[0]);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.createBoard = createBoard;
/* GET A SINGLE BOARD */
const getSingleBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = req.params;
        const board = yield db_1.default.query.BoardTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.BoardTable.boardId, boardId)
        });
        if (!board) {
            return res.status(404).json({ message: 'Board not found!' });
        }
        res.status(200).json(board);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.getSingleBoard = getSingleBoard;
/* DELETE BOARD */
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = req.params;
        yield db_1.default.delete(schema_1.BoardTable).where((0, drizzle_orm_1.eq)(schema_1.BoardTable.boardId, boardId));
        res.status(200).json({ message: 'Board deleted!' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.deleteBoard = deleteBoard;
