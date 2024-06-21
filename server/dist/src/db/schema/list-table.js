"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTableRelations = exports.ListTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const board_table_1 = require("./board-table");
const card_table_1 = require("./card-table");
exports.ListTable = (0, pg_core_1.pgTable)("listTable", {
    listId: (0, pg_core_1.uuid)("listId").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    position: (0, pg_core_1.smallint)("position"),
    boardId: (0, pg_core_1.uuid)("boardId").references(() => board_table_1.BoardTable.boardId, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").default((0, drizzle_orm_1.sql) `current_timestamp`),
});
exports.ListTableRelations = (0, drizzle_orm_1.relations)(exports.ListTable, ({ one, many }) => {
    return {
        board: one(board_table_1.BoardTable, {
            fields: [exports.ListTable.boardId],
            references: [board_table_1.BoardTable.boardId]
        }),
        cards: many(card_table_1.CardTable)
    };
});
