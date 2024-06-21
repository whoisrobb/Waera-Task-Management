import { Request, Response } from "express";
import db from "../db";
import { ListTable } from "../db/schema";
import { asc, desc, eq } from "drizzle-orm";


/* CREATE LIST */
export const createList = async (req: Request, res: Response) => {
    try {
        const { boardId } = req.params;
        const { listName } = req.body;

        const newList = await db.insert(ListTable).values({
                boardId: boardId,
                name: listName
            })
            .returning();
        
        res.status(201).json(newList[0]);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

/* GET FILTERED LISTS */
export const getFilteredLists = async (req: Request, res: Response) => {
    try {
        const { order, orderBy } = req.body;
        const { boardId } = req.params;

        const lists = await db.query
            .ListTable
            .findMany({
                where: eq(ListTable.boardId, boardId),
                with: {
                    cards: {
                        with: {
                            attachments: true,
                            comments: true,
                            checklists: {
                                with: {
                                    checklistItems: true
                                }
                            }
                        }
                    }
                },
                // orderBy: [
                //     orderBy == "date"
                //         ?
                //         order == "asc"
                //             ? asc(ListTable.createdAt)
                //             : desc(ListTable.createdAt)
                //         :
                //         order == "asc"
                //             ? asc(ListTable.position)
                //             : desc(ListTable.position)
                // ]
            });            

        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json(err)
    }
}

/* DELETE LIST */
export const deleteList = async (req: Request, res: Response) => {
    try {
        const { listId } = req.params;

        await db.delete(ListTable).where(eq(ListTable.listId, listId));
        res.status(200).json({ message: 'List deleted!' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};