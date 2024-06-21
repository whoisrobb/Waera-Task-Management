"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTableRelations = exports.CardTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const list_table_1 = require("./list-table");
const attachment_table_1 = require("./attachment-table");
const comment_table_1 = require("./comment-table");
const checklist_table_1 = require("./checklist-table");
exports.CardTable = (0, pg_core_1.pgTable)("cardTable", {
    cardId: (0, pg_core_1.uuid)("cardId").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    description: (0, pg_core_1.text)("description"),
    position: (0, pg_core_1.smallint)("position"),
    labels: (0, pg_core_1.json)("labels").$type().default([]),
    dueDate: (0, pg_core_1.date)("dueDate"),
    completed: (0, pg_core_1.boolean)("completed").notNull().default(false),
    listId: (0, pg_core_1.uuid)("listId").references(() => list_table_1.ListTable.listId, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").default((0, drizzle_orm_1.sql) `current_timestamp`),
});
exports.CardTableRelations = (0, drizzle_orm_1.relations)(exports.CardTable, ({ one, many }) => {
    return {
        attachments: many(attachment_table_1.AttachmentTable),
        comments: many(comment_table_1.CommentTable),
        checklists: many(checklist_table_1.ChecklistTable),
        list: one(list_table_1.ListTable, {
            fields: [exports.CardTable.listId],
            references: [list_table_1.ListTable.listId]
        })
    };
});
