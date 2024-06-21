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
exports.updateLabels = exports.fetchCardLabels = exports.getLabels = exports.createLabel = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
/* CREATE A LABEL */
const createLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { labelName, color } = req.body;
        const newLabel = yield db_1.default.insert(schema_1.LabelTable).values({
            name: labelName,
            color: color
        })
            .returning();
        res.status(201).json(newLabel[0]);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.createLabel = createLabel;
/* GET LABEL */
const getLabels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const labels = yield db_1.default.query.LabelTable.findMany();
        res.status(200).json(labels);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.getLabels = getLabels;
/* FETCH CARD LABELS */
const fetchCardLabels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const cardLabels = yield db_1.default.select()
            .from(schema_1.CardTable)
            .where((0, drizzle_orm_1.eq)(schema_1.CardLabelsTable.cardId, cardId))
            .innerJoin(schema_1.LabelTable, (0, drizzle_orm_1.inArray)(schema_1.CardTable.labels, schema_1.LabelTable.labelId));
        res.status(200).json(cardLabels);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.fetchCardLabels = fetchCardLabels;
/* UPDATE LABELS */
const updateLabels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const card = yield db_1.default.query.CardTable.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.CardTable.cardId, cardId)
        });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        // Update or create labels
        const { labels } = req.body;
        const addedLabel = yield db_1.default.update(schema_1.CardTable)
            .set({
            labels: labels,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.CardTable.cardId, cardId))
            .returning();
        res.status(200).json(addedLabel[0]);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.updateLabels = updateLabels;
