const db = require("../models");
const Attachment = db.Attachment;

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
    addAttachments,
    getAttachments,
    getCardAttachments,
}