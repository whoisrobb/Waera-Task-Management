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
exports.deleteChecklistItem = exports.createOrUpdateChecklistItem = exports.deleteChecklist = exports.createOrUpdateChecklist = void 0;
const db_1 = __importDefault(require("../db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
// CREATE OR UPDATE CHECKLIST
const createOrUpdateChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const card = yield db_1.default.query.CardTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.CardTable.cardId, cardId)
        });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        const { name, checklistId } = req.body;
        if (checklistId) {
            const updatedChecklist = yield updateChecklist(name, checklistId);
            return res.status(200).json(updatedChecklist);
        }
        const checklist = yield db_1.default.insert(schema_1.ChecklistTable).values({
            name: name,
            cardId: cardId,
        })
            .returning();
        res.status(201).json(checklist[0]);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createOrUpdateChecklist = createOrUpdateChecklist;
// UPDATE CHECKLIST
const updateChecklist = (name, checklistId) => __awaiter(void 0, void 0, void 0, function* () {
    const availableChecklist = yield db_1.default.update(schema_1.ChecklistTable)
        .set({
        name: name,
    })
        .where((0, drizzle_orm_1.eq)(schema_1.ChecklistTable.checklistId, checklistId))
        .returning();
    return availableChecklist[0];
});
// DELETE CHECKLIST
const deleteChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { checklistId } = req.params;
        yield db_1.default.delete(schema_1.ChecklistTable).where((0, drizzle_orm_1.eq)(schema_1.ChecklistTable.checklistId, checklistId));
        res.status(200).json({ message: 'Deleted successfully' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteChecklist = deleteChecklist;
// CREATE OR UPDATE CHECKLIST ITEM
const createOrUpdateChecklistItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { checklistId } = req.params;
        const checklist = yield db_1.default.query.ChecklistTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.ChecklistItemTable.checklistId, checklistId)
        });
        if (!checklist) {
            return res.status(404).json({ message: 'Checklist not found' });
        }
        const { text, checklistItemId, completed } = req.body;
        if (checklistItemId) {
            const updatedChecklistItem = yield updateChecklistItem(text, checklistItemId, completed);
            return res.status(200).json(updatedChecklistItem);
        }
        const checklistItem = yield db_1.default.insert(schema_1.ChecklistItemTable)
            .values({
            text,
            checklistId,
        })
            .returning();
        res.status(201).json(checklistItem[0]);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createOrUpdateChecklistItem = createOrUpdateChecklistItem;
// UPDATE CHECKLIST ITEM
const updateChecklistItem = (text, checklistItemId, completed) => __awaiter(void 0, void 0, void 0, function* () {
    const availableChecklist = yield db_1.default.update(schema_1.ChecklistItemTable)
        .set({
        text,
        completed
    })
        .where((0, drizzle_orm_1.eq)(schema_1.ChecklistItemTable.checklistItemId, checklistItemId))
        .returning();
    return availableChecklist[0];
});
// DELETE CHECKLIST ITEM
const deleteChecklistItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { checklistItemId } = req.params;
        yield db_1.default.delete(schema_1.ChecklistItemTable).where((0, drizzle_orm_1.eq)(schema_1.ChecklistItemTable.checklistItemId, checklistItemId));
        res.status(200).json({ message: 'Deleted successfully' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteChecklistItem = deleteChecklistItem;
