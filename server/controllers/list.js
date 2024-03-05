const db = require("../models");
const List = db.List;
const Card = db.Card;
const Comment = db.Comment;
const Attachment = db.Attachment;
const Checklist = db.Checklist;
const ChecklistItem = db.ChecklistItem;
const Label = db.Label;


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

/* GET FILTERED LISTS */
const getFilteredLists = async (req, res) => {
    try {
        const { boardId } = req.params;
        const { dateFrom, dateTo, order } = req.body;

        const where = { BoardBoardID: boardId };
        if (dateFrom) {
            where.createdAt = { [Op.gte]: dateFrom }; // Greater than or equal to dateFrom
        }
        if (dateTo) {
            where.createdAt = { ...where.createdAt, [Op.lte]: dateTo }; // Less than or equal to dateTo
        }
            
        const orderOptions = [];
        if (order) {
            orderOptions.push(['createdAt', order === 'asc' ? 'ASC' : 'DESC']);
        } else {
            orderOptions.push(['createdAt', 'DESC']);
        }
        // if (orderBy) {
        //     orderOptions.push([orderBy, order === 'asc' ? 'ASC' : 'DESC']);
        // } else {
        //     orderOptions.push(['createdAt', 'DESC']);
        // }
        
        const lists = await List.findAll({
            where,
            order: orderOptions,
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
                order: orderOptions,
            }],
        });

        res.status(200).json(lists);
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

module.exports = {
    createList,
    getFilteredLists,
    deleteList,
}
