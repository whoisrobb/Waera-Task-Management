const express = require('express');
const { createBoard, getUserBoards, getSingleBoard, getLists, createList, createCard, createLabel, getLabels, addAttachments, getAttachments, deleteBoard, deleteList, deleteCard, updateCardDetails, updateChecklists, updateLabels, getCardAttachments } = require('../controllers/user');
const upload = require('../controllers/upload');
const router = express.Router();

/* GET A USER'S BOARDS */
router.get('/boards/:userId', getUserBoards);

/* CREATE BOARD */
router.post('/boards/create', createBoard);

/* GET A SINGLE BOARD */
router.get('/boards/board/:boardId', getSingleBoard);

/* GET LISTS */
router.get('/lists/:boardId', getLists);

/* CREATE LIST */
router.post('/lists/create/:boardId', createList);

/* CREATE CARD */
router.post('/cards/create/:listId', createCard);

/* CREATE LABEL */
router.post('/label', createLabel);

/* GET LABELS */
router.get('/labels', getLabels);

/* UPDATE CARD DETAILS */
router.put('/cards/updateCardDetails/:cardId', updateCardDetails);

/* UPDATE CHECKLISTS */
router.put('/cards/updateChecklists/:cardId', updateChecklists);

/* UPDATE LABELS */
router.put('/cards/updateLabels/:cardId', updateLabels);

/* ADD ATTACHMENTS */
router.post('/cards/attachments/:cardId', upload.array('file'), addAttachments);

/* GET ALL ATTACHMENTS */
router.get('/attachments', getAttachments);

/* DELETE BOARD */
router.delete('/boards/delete/:boardId', deleteBoard);

/* DELETE LIST */
router.delete('/lists/delete/:listId', deleteList);

/* DELETE CARD */
router.delete('/cards/delete/:cardId', deleteCard);

/* GET CARD ATTACHMENTS */
router.get('/cards/attachments/:cardId', getCardAttachments);


module.exports = router;