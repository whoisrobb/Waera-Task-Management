"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardTableRelations = exports.BoardTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const user_table_1 = require("./user-table");
const list_table_1 = require("./list-table");
exports.BoardTable = (0, pg_core_1.pgTable)("boardTable", {
    boardId: (0, pg_core_1.uuid)("boardId").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    description: (0, pg_core_1.text)("description"),
    userId: (0, pg_core_1.uuid)("userId").references(() => user_table_1.UserTable.userId),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").default((0, drizzle_orm_1.sql) `current_timestamp`),
});
exports.BoardTableRelations = (0, drizzle_orm_1.relations)(exports.BoardTable, ({ one, many }) => {
    return {
        lists: many(list_table_1.ListTable),
        user: one(user_table_1.UserTable, {
            fields: [exports.BoardTable.userId],
            references: [user_table_1.UserTable.userId]
        })
    };
});
