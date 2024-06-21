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
exports.deleteList = exports.getFilteredLists = exports.createList = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
/* CREATE LIST */
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = req.params;
        const { listName } = req.body;
        const newList = yield db_1.default.insert(schema_1.ListTable).values({
            boardId: boardId,
            name: listName
        })
            .returning();
        res.status(201).json(newList[0]);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
exports.createList = createList;
/* GET FILTERED LISTS */
const getFilteredLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order, orderBy } = req.body;
        const { boardId } = req.params;
        const lists = yield db_1.default.query
            .ListTable
            .findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.ListTable.boardId, boardId),
            with: {
                cards: {
                    with: {
                        attachments: true,
                        comments: true,
                        checklists: {
                            with: {
                                checklistItems: true
                            }
                        }
                    }
                }
            },
            // orderBy: [
            //     orderBy == "date"
            //         ?
            //         order == "asc"
            //             ? asc(ListTable.createdAt)
            //             : desc(ListTable.createdAt)
            //         :
            //         order == "asc"
            //             ? asc(ListTable.position)
            //             : desc(ListTable.position)
            // ]
        });
        res.status(200).json(lists);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getFilteredLists = getFilteredLists;
/* DELETE LIST */
const deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId } = req.params;
        yield db_1.default.delete(schema_1.ListTable).where((0, drizzle_orm_1.eq)(schema_1.ListTable.listId, listId));
        res.status(200).json({ message: 'List deleted!' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.deleteList = deleteList;
