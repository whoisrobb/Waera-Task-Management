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

/* GET LISTS */
const getLists = async (req, res) => {
    try {
        const { boardId } = req.params;

        const lists = await List.findAll({
            where: { BoardBoardID: boardId },
                include: [{
                    model: Card,
                    include: [
                        Attachment,
                        Comment,
                        {
                            model: Checklist,
                            include: [ChecklistItem],
                        },
                        {
                            model: Label,
                            through: 'CardLabels',
                        },
                    ],
                    order: [['createdAt', 'ASC']],
                }],
                order: [['createdAt', 'ASC']],
            });

        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/* CREATE LIST */
const createList = async (req, res) => {
    try {
        const { boardId } = req.params;
        const { listName } = req.body;

        const newList = await List.create({
            BoardBoardID: boardId,
            ListName: listName
        });
        
        res.status(201).json(newList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* CREATE A CARD */
const createCard = async (req, res) => {
    try {
        const { listId } = req.params;
        const { cardName } = req.body;

        const newCard = await Card.create({
            ListListID: listId,
            CardName: cardName
        });
        
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({ message: err.message });
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

/* UPDATE ALL CARD */
const updateCardBulk = async (req, res) => {
    const { cardId } = req.params;

    try {
        // Find the card by its ID
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

        // Update or create labels (assuming Card - Label is a many-to-many relationship)
        const { labelIds } = req.body;
        const selectedLabels = await Label.findAll({
            where: { LabelID: labelIds }
        });
        await card.setLabels(selectedLabels);

        // Fetch the updated card with its associations
        const updatedCard = await Card.findByPk(cardId, {
            include: [
                { model: Attachment },
                { model: Checklist, include: [{ model: ChecklistItem }] },
                { model: Label },
            ],
        });

        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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


/* DELETE LIST */
const deleteList = async (req, res) => {
    try {
        const { listId } = req.params;

        await List.destroy({ where: { ListID: listId }});
        res.status(200).json({ message: 'List deleted!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/* DELETE CARD */
const deleteCard = async (req, res) => {
    try {
        const { cardId } = req.params;

        await Card.destroy({ where: { CardID: cardId }});
        res.status(200).json({ message: 'Card deleted!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




module.exports = {
    createBoard,
    getUserBoards,
    getSingleBoard,
    getLists,
    createList,
    createCard,
    createLabel,
    getLabels,
    updateCardBulk,
    addAttachments,
    getAttachments,
    deleteBoard,
    deleteList,
    deleteCard
};