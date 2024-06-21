"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDragDropCard = exports.deleteCard = exports.updateCardDetails = exports.createCard = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
/* CREATE A CARD */
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId } = req.params;
        const { cardName } = req.body;
        const newCard = yield db_1.default.insert(schema_1.CardTable)
            .values({
            listId: listId,
            name: cardName
        })
            .returning();
        res.status(201).json(newCard[0]);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.createCard = createCard;
/* UPDATE CARD DETAILS */
const updateCardDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const card = yield db_1.default.query.CardTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.CardTable.cardId, cardId)
        });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        // Update card details
        yield db_1.default.update(schema_1.CardTable).set({
            name: req.body.cardName,
            description: req.body.description,
            dueDate: req.body.dueDate,
            // Add other fields as needed
        }).where((0, drizzle_orm_1.eq)(schema_1.CardTable.cardId, cardId));
        res.status(200).json({ message: 'Updated successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.updateCardDetails = updateCardDetails;
/* DELETE CARD */
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        yield db_1.default.delete(schema_1.CardTable).where((0, drizzle_orm_1.eq)(schema_1.CardTable.cardId, cardId));
        res.status(200).json({ message: 'Card deleted!' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.deleteCard = deleteCard;
/* DND CARD UPDATE */
const updateDragDropCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const { listId } = req.body;
        const card = yield db_1.default.update(schema_1.CardTable).set({
            listId: listId
        })
            .where((0, drizzle_orm_1.eq)(schema_1.CardTable.cardId, cardId))
            .returning();
        res.status(200).json(card[0]);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.updateDragDropCard = updateDragDropCard;
