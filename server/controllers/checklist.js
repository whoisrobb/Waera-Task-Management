const db = require("../models");
const Board = db.Board;
const List = db.List;
const Card = db.Card;
const Comment = db.Comment;
const Attachment = db.Attachment;
const Checklist = db.Checklist;
const ChecklistItem = db.ChecklistItem;
const Label = db.Label;


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

module.exports = {
    updateChecklists
}