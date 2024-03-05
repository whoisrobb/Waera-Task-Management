const db = require("../models");
const Board = db.Board;
const List = db.List;
const Card = db.Card;
const Comment = db.Comment;
const Attachment = db.Attachment;
const Checklist = db.Checklist;
const ChecklistItem = db.ChecklistItem;
const Label = db.Label;


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


module.exports = {
    createLabel,
    getLabels,
    updateLabels,
}