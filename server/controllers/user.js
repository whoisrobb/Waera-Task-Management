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

/* CREATE A LABEL */
const createLabel = async (req, res) => {
    try {
        const { labelName, color } = req.body;

        const newLabel = await Label.create({
            LabelName: labelName,
            Color: color
        });

        res.status(201).json(newLabel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* GET LABEL */
const getLabels = async (req, res) => {
    try {
        const labels = await Label.findAll();
        res.status(200).json(labels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* UPDATE CARD DETAILS */
const updateCardDetails = async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = await Card.findByPk(cardId);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Update card details
        await card.update({
            CardName: req.body.cardName,
            Description: req.body.description,
            DueDate: req.body.dueDate,
            // Add other fields as needed
        });

        res.status(200).json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
/* UPDATE CHECKLISTS */
const updateChecklists = async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = await Card.findByPk(cardId);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Update or create checklists
        await Checklist.destroy({ where: { CardCardID: cardId } });
        
        const { checklists } = req.body;
        for (const checklistData of checklists) {
            const checklist = await Checklist.create({
                ChecklistName: checklistData.ChecklistName,
                CardCardID: cardId,
            })

            const checklistItems = await ChecklistItem.bulkCreate(checklistData.ChecklistItems.map((item) => ({
                ChecklistItemText: item.ChecklistItemText,
                ItemComplete: item.ItemComplete,
                ChecklistChecklistID: checklist.ChecklistID,
            })))
        };

        res.status(200).json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
/* UPDATE LABELS */
const updateLabels = async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = await Card.findByPk(cardId);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Update or create labels
        const { labelIds } = req.body;
        const selectedLabels = await Label.findAll({
            where: { LabelID: labelIds }
        });

        await card.setLabels(selectedLabels);

        res.status(200).json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/* ADD ATTACHMENTS */
const addAttachments = async (req, res) => {
    try {
        const { cardId } = req.params;
        
        const files = req.files;

        const attachments = await Promise.all(
            files.map(async (file) => {
                const newAttachment = await Attachment.create({
                    FileName: file.originalname,
                    FilePath: file.path,
                    CardCardID: cardId
                });
                return newAttachment;
            })
        );
        
        res.status(201).json(attachments);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* GET ALL ATTACHMENTS */
const getAttachments = async (req, res) => {
    try {
        const attachments = await Attachment.findAll();
        res.status(200).json(attachments)
    } catch (err) {
        res.status(400).json({ message: err.message });
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


/* GET ATTACHMENTS */
const getCardAttachments = async (req, res) => {
    try {
        const { cardId } = req.params;
        const attachments = await Attachment.findAll({
            where: { CardCardID: cardId }
        })
        res.status(200).json(attachments)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createBoard,
    getUserBoards,
    getSingleBoard,
    createLabel,
    getLabels,
    updateCardDetails,
    updateChecklists,
    updateLabels,
    addAttachments,
    getAttachments,
    deleteBoard,
    getCardAttachments,
};