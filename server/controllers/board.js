const db = require("../models");
const Board = db.Board;
const List = db.List;
const Card = db.Card;
const Comment = db.Comment;
const Attachment = db.Attachment;
const Checklist = db.Checklist;
const ChecklistItem = db.ChecklistItem;
const Label = db.Label;


/* GET USER BOARDS */
const getUserBoards = async (req, res) => {
    try {
        const { userId } = req.params;

        const boards = await Board.findAll({ 
            where: { UserUserID: userId }
        });

        res.status(200).json(boards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* CREATE BOARD */
const createBoard = async (req, res) => {
    try {
        const { boardName, description, userId } = req.body;

        const newBoard = await Board.create({
            BoardName: boardName,
            Description: description,
            UserUserID: userId
        })

        res.status(201).json(newBoard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* GET A SINGLE BOARD */
const getSingleBoard = async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findByPk(boardId);

        if (!board) {
            return res.status(404).message({ message: 'Board not found!' });
        }

        res.status(200).json(board);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* DELETE BOARD */
const deleteBoard = async (req, res) => {
    try {
        const { boardId } = req.params;

        await Board.destroy({ where: { BoardID: boardId }});
        res.status(200).json({ message: 'Board deleted!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createBoard,
    getUserBoards,
    getSingleBoard,
    deleteBoard,
};