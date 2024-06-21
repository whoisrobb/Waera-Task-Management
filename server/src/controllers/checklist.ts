import { Request, Response } from "express";
import db from "../db";
import { eq } from "drizzle-orm";
import { CardTable, ChecklistItemTable, ChecklistTable } from "../db/schema";


// CREATE OR UPDATE CHECKLIST
export const createOrUpdateChecklist = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;

        const card = await db.query.CardTable.findFirst({
            where: eq(CardTable.cardId, cardId)
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const { name, checklistId } = req.body;

        if (checklistId) {
            const updatedChecklist = await updateChecklist(name, checklistId);
            return res.status(200).json(updatedChecklist);
        }

        const checklist = await db.insert(ChecklistTable).values({
                name: name,
                cardId: cardId,
            })
            .returning()
        
        res.status(201).json(checklist[0]);

    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE CHECKLIST
const updateChecklist = async (name: string, checklistId: string) => {
    const availableChecklist = await db.update(ChecklistTable)
        .set({
            name: name,
        })
        .where(eq(ChecklistTable.checklistId, checklistId))
        .returning();
        
    return availableChecklist[0];
}

// DELETE CHECKLIST
export const deleteChecklist = async (req: Request, res: Response) => {
    try {
        const { checklistId } = req.params;

        await db.delete(ChecklistTable).where(eq(ChecklistTable.checklistId, checklistId));

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// CREATE OR UPDATE CHECKLIST ITEM
export const createOrUpdateChecklistItem = async (req: Request, res: Response) => {
    try {
        const { checklistId } = req.params;

        const checklist = await db.query.ChecklistTable.findFirst({
            where: eq(ChecklistItemTable.checklistId, checklistId)
        });

        if (!checklist) {
            return res.status(404).json({ message: 'Checklist not found' });
        }

        const { text, checklistItemId, completed } = req.body;

        if (checklistItemId) {
            const updatedChecklistItem = await updateChecklistItem(text, checklistItemId, completed);
            return res.status(200).json(updatedChecklistItem);
        }

        const checklistItem = await db.insert(ChecklistItemTable)
            .values({
                text,
                checklistId,
            })
            .returning()
        
        res.status(201).json(checklistItem[0]);

    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE CHECKLIST ITEM
const updateChecklistItem = async (text: string, checklistItemId: string, completed: boolean) => {
    const availableChecklist = await db.update(ChecklistItemTable)
        .set({
            text,
            completed
        })
        .where(eq(ChecklistItemTable.checklistItemId, checklistItemId))
        .returning();
        
    return availableChecklist[0];
}

// DELETE CHECKLIST ITEM
export const deleteChecklistItem = async (req: Request, res: Response) => {
    try {
        const { checklistItemId } = req.params;

        await db.delete(ChecklistItemTable).where(eq(ChecklistItemTable.checklistItemId, checklistItemId));

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
}