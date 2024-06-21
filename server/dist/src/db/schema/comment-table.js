"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentTableRelations = exports.CommentTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const card_table_1 = require("./card-table");
const user_table_1 = require("./user-table");
exports.CommentTable = (0, pg_core_1.pgTable)("commentTable", {
    commentId: (0, pg_core_1.uuid)("commentId").defaultRandom().primaryKey(),
    text: (0, pg_core_1.varchar)("text").notNull(),
    cardId: (0, pg_core_1.uuid)("cardId").references(() => card_table_1.CardTable.cardId, { onDelete: "cascade" }),
    userId: (0, pg_core_1.uuid)("userId").references(() => user_table_1.UserTable.userId),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").default((0, drizzle_orm_1.sql) `current_timestamp`),
});
exports.CommentTableRelations = (0, drizzle_orm_1.relations)(exports.CommentTable, ({ one }) => {
    return {
        card: one(card_table_1.CardTable, {
            fields: [exports.CommentTable.cardId],
            references: [card_table_1.CardTable.cardId]
        }),
        user: one(user_table_1.UserTable, {
            fields: [exports.CommentTable.userId],
            references: [user_table_1.UserTable.userId]
        })
    };
});
