import { Request, Response } from "express";
import db from "../db";
import { CardLabelsTable, CardTable, LabelTable } from "../db/schema";
import { eq, inArray } from "drizzle-orm";


/* CREATE A LABEL */
export const createLabel = async (req: Request, res: Response) => {
    try {
        const { labelName, color } = req.body;

        const newLabel = await db.insert(LabelTable).values({
                name: labelName,
                color: color
            })
            .returning();

        res.status(201).json(newLabel[0]);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

/* GET LABEL */
export const getLabels = async (req: Request, res: Response) => {
    try {
        const labels = await db.query.LabelTable.findMany();
        res.status(200).json(labels);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* FETCH CARD LABELS */
export const fetchCardLabels = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;

        const cardLabels = await db.select()
            .from(CardTable)
            .where(
                eq(CardLabelsTable.cardId, cardId)
            )
            .innerJoin(LabelTable, inArray(CardTable.labels, LabelTable.labelId));

        res.status(200).json(cardLabels);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/* UPDATE LABELS */
export const updateLabels = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        
        const card = await db.query.CardTable.findFirst({
            where: eq(CardTable.cardId, cardId)
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Update or create labels
        const { labels } = req.body;

        const addedLabel = await db.update(CardTable)
            .set({
                labels: labels,
            })
            .where(eq(CardTable.cardId, cardId))
            .returning()

        res.status(200).json(addedLabel[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};