import express from 'express';
import { createBoard, getUserBoards, getSingleBoard, deleteBoard } from '../controllers/board';
import { createList, deleteList, getFilteredLists } from '../controllers/list';
import { createCard, deleteCard, updateCardDetails, updateDragDropCard } from '../controllers/card';
import { addAttachments, getAttachments, getCardAttachments } from '../controllers/attachments';
import { createLabel, fetchCardLabels, getLabels, updateLabels } from '../controllers/label';
import { createOrUpdateChecklist, createOrUpdateChecklistItem, deleteChecklist, deleteChecklistItem } from '../controllers/checklist';
import upload from '../middleware/upload';
import { updateUserdata } from '../controllers/user';

const router = express.Router();

// UPDATE USER DATA
router.put('/save/:userId', updateUserdata);

/* GET A USER'S BOARDS */
router.get('/boards/:userId', getUserBoards);

/* CREATE BOARD */
router.post('/boards/create', createBoard);

/* GET A SINGLE BOARD */
router.get('/boards/board/:boardId', getSingleBoard);

/* GET FILTERED LISTS */
router.post('/lists/filtered/:boardId', getFilteredLists);

/* CREATE LIST */
router.post('/lists/create/:boardId', createList);

/* CREATE CARD */
router.post('/cards/create/:listId', createCard);

/* CREATE LABEL */
router.post('/label', createLabel);

/* GET LABELS */
router.get('/labels', getLabels);

/* FETCH CARD LABELS */
router.get('/labels/card/:cardId', fetchCardLabels);

/* UPDATE CARD DETAILS */
router.put('/cards/updateCardDetails/:cardId', updateCardDetails);

/* UPDATE CARD DND */
router.put('/cards/updateCardDnd/:cardId', updateDragDropCard);

/* CREATE OR UPDATE CHECKLISTS */
router.put('/cards/checklists/:cardId', createOrUpdateChecklist);

/* DELETE CHECKLIST */
router.delete('/cards/checklists/delete/:checklistId', deleteChecklist);

/* CREATE OR UPDATE CHECKLIST ITEMS */
router.put('/cards/checklists/checklistItems/:checklistId', createOrUpdateChecklistItem);

/* DELETE CHECKLIST ITEMS */
router.delete('/cards/checklists/checklistItems/delete/:checklistItemId', deleteChecklistItem);

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


export default router;