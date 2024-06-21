import { Request, Response } from "express";
import db from "../db";
import { eq } from "drizzle-orm";
import { BoardTable } from "../db/schema";


/* GET USER BOARDS */
export const getUserBoards = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const boards = await db.select()
            .from(BoardTable) 
            .where(eq(BoardTable.userId, userId));

        res.status(200).json(boards);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* CREATE BOARD */
export const createBoard = async (req: Request, res: Response) => {
    try {
        const { boardName, description, userId } = req.body;

        const newBoard = await db.insert(BoardTable).values({
            name: boardName,
            description: description,
            userId: userId
        })
        .returning()

        res.status(201).json(newBoard[0]);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

/* GET A SINGLE BOARD */
export const getSingleBoard = async (req: Request, res: Response) => {
    try {
        const { boardId } = req.params;
        const board = await db.query.BoardTable.findFirst({
            where: eq(BoardTable.boardId, boardId)
        });

        if (!board) {
            return res.status(404).json({ message: 'Board not found!' });
        }

        res.status(200).json(board);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* DELETE BOARD */
export const deleteBoard = async (req: Request, res: Response) => {
    try {
        const { boardId } = req.params;

        await db.delete(BoardTable).where(eq(BoardTable.boardId, boardId));
        res.status(200).json({ message: 'Board deleted!' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};