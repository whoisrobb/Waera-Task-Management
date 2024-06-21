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
exports.getCardAttachments = exports.getAttachments = exports.addAttachments = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
// ADD ATTACHMENTS
const addAttachments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const files = req.files; // Explicitly type the files
        if (!files) {
            res.status(400).json({ message: "No files uploaded" });
            return;
        }
        const attachments = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const newAttachment = yield db_1.default.insert(schema_1.AttachmentTable).values({
                filename: file.originalname,
                filepath: file.path,
                size: file.size,
                cardId: cardId
            })
                .returning(); // Ensure the inserted rows are returned
            return newAttachment[0];
        })));
        res.status(201).json(attachments);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.addAttachments = addAttachments;
/* GET ALL ATTACHMENTS */
const getAttachments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attachments = yield db_1.default.query.AttachmentTable.findMany();
        res.status(200).json(attachments);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.getAttachments = getAttachments;
/* GET ATTACHMENTS */
const getCardAttachments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardId } = req.params;
        const attachments = yield db_1.default.query.AttachmentTable.findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.AttachmentTable.cardId, cardId)
        });
        res.status(200).json(attachments);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.getCardAttachments = getCardAttachments;
