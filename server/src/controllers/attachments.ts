import { Request, Response } from "express";
import db from "../db";
import { AttachmentTable } from "../db/schema";
import { eq } from "drizzle-orm";


// ADD ATTACHMENTS
export const addAttachments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cardId } = req.params;
        const files = req.files as Express.Multer.File[]; // Explicitly type the files

        if (!files) {
            res.status(400).json({ message: "No files uploaded" });
            return;
        }

        const attachments = await Promise.all(
            files.map(async (file) => {
                const newAttachment = await db.insert(AttachmentTable).values({
                    filename: file.originalname,
                    filepath: file.path,
                    size: file.size,
                    cardId: cardId
                })
                .returning(); // Ensure the inserted rows are returned
                return newAttachment[0];
            })
        );

        res.status(201).json(attachments);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

/* GET ALL ATTACHMENTS */
export const getAttachments = async (req: Request, res: Response) => {
    try {
        const attachments = await db.query.AttachmentTable.findMany();
        res.status(200).json(attachments)
    } catch (err) {
        res.status(400).json({ message: err });
    }
};


/* GET ATTACHMENTS */
export const getCardAttachments = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        const attachments = await db.query.AttachmentTable.findMany({
            where: eq(AttachmentTable.cardId, cardId)
        })
        res.status(200).json(attachments)
    } catch (err) {
        res.status(500).json({ message: err });
    }
}