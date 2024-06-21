"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentTableRelations = exports.AttachmentTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const card_table_1 = require("./card-table");
const drizzle_orm_1 = require("drizzle-orm");
exports.AttachmentTable = (0, pg_core_1.pgTable)("attachment", {
    attachmentId: (0, pg_core_1.uuid)("attchmentId").defaultRandom().primaryKey(),
    filename: (0, pg_core_1.varchar)("filename").notNull(),
    filepath: (0, pg_core_1.varchar)("filepath").notNull(),
    size: (0, pg_core_1.integer)("size").notNull(),
    cardId: (0, pg_core_1.uuid)("cardId").references(() => card_table_1.CardTable.cardId, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull()
});
exports.AttachmentTableRelations = (0, drizzle_orm_1.relations)(exports.AttachmentTable, ({ one }) => {
    return {
        card: one(card_table_1.CardTable, {
            fields: [exports.AttachmentTable.cardId],
            references: [card_table_1.CardTable.cardId]
        })
    };
});
