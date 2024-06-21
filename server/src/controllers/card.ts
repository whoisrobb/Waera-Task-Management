import { Request, Response } from 'express';
import db from '../db';
import { CardTable } from '../db/schema';
import { eq } from 'drizzle-orm';


/* CREATE A CARD */
export const createCard = async (req: Request, res: Response) => {
    try {
        const { listId } = req.params;
        const { cardName } = req.body;

        const newCard = await db.insert(CardTable)
            .values({
                listId: listId,
                name: cardName
            })
            .returning()
        
        res.status(201).json(newCard[0]);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

/* UPDATE CARD DETAILS */
export const updateCardDetails = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        const card = await db.query.CardTable.findFirst({
            where: eq(CardTable.cardId, cardId)
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Update card details
        await db.update(CardTable).set({
            name: req.body.cardName,
            description: req.body.description,
            dueDate: req.body.dueDate,
            // Add other fields as needed
        }).where(eq(CardTable.cardId, cardId));

        res.status(200).json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

/* DELETE CARD */
export const deleteCard = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;

        await db.delete(CardTable).where(eq(CardTable.cardId, cardId));
        res.status(200).json({ message: 'Card deleted!' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* DND CARD UPDATE */
export const updateDragDropCard = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        const { listId } = req.body;

        const card = await db.update(CardTable).set({
                listId: listId
            })
            .where(eq(CardTable.cardId, cardId))
            .returning()

        res.status(200).json(card[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};