"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const board_1 = require("../controllers/board");
const list_1 = require("../controllers/list");
const card_1 = require("../controllers/card");
const attachments_1 = require("../controllers/attachments");
const label_1 = require("../controllers/label");
const checklist_1 = require("../controllers/checklist");
const upload_1 = __importDefault(require("../middleware/upload"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
// UPDATE USER DATA
router.put('/save/:userId', user_1.updateUserdata);
/* GET A USER'S BOARDS */
router.get('/boards/:userId', board_1.getUserBoards);
/* CREATE BOARD */
router.post('/boards/create', board_1.createBoard);
/* GET A SINGLE BOARD */
router.get('/boards/board/:boardId', board_1.getSingleBoard);
/* GET FILTERED LISTS */
router.post('/lists/filtered/:boardId', list_1.getFilteredLists);
/* CREATE LIST */
router.post('/lists/create/:boardId', list_1.createList);
/* CREATE CARD */
router.post('/cards/create/:listId', card_1.createCard);
/* CREATE LABEL */
router.post('/label', label_1.createLabel);
/* GET LABELS */
router.get('/labels', label_1.getLabels);
/* FETCH CARD LABELS */
router.get('/labels/card/:cardId', label_1.fetchCardLabels);
/* UPDATE CARD DETAILS */
router.put('/cards/updateCardDetails/:cardId', card_1.updateCardDetails);
/* UPDATE CARD DND */
router.put('/cards/updateCardDnd/:cardId', card_1.updateDragDropCard);
/* CREATE OR UPDATE CHECKLISTS */
router.put('/cards/checklists/:cardId', checklist_1.createOrUpdateChecklist);
/* DELETE CHECKLIST */
router.delete('/cards/checklists/delete/:checklistId', checklist_1.deleteChecklist);
/* CREATE OR UPDATE CHECKLIST ITEMS */
router.put('/cards/checklists/checklistItems/:checklistId', checklist_1.createOrUpdateChecklistItem);
/* DELETE CHECKLIST ITEMS */
router.delete('/cards/checklists/checklistItems/delete/:checklistItemId', checklist_1.deleteChecklistItem);
/* UPDATE LABELS */
router.put('/cards/updateLabels/:cardId', label_1.updateLabels);
/* ADD ATTACHMENTS */
router.post('/cards/attachments/:cardId', upload_1.default.array('file'), attachments_1.addAttachments);
/* GET ALL ATTACHMENTS */
router.get('/attachments', attachments_1.getAttachments);
/* DELETE BOARD */
router.delete('/boards/delete/:boardId', board_1.deleteBoard);
/* DELETE LIST */
router.delete('/lists/delete/:listId', list_1.deleteList);
/* DELETE CARD */
router.delete('/cards/delete/:cardId', card_1.deleteCard);
/* GET CARD ATTACHMENTS */
router.get('/cards/attachments/:cardId', attachments_1.getCardAttachments);
exports.default = router;
