const db = require("../models");
const Card = db.Card;


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
    createCard,
    deleteCard,
}