"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTableRelations = exports.UserTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const board_table_1 = require("./board-table");
exports.UserTable = (0, pg_core_1.pgTable)("user", {
    userId: (0, pg_core_1.uuid)("userId").defaultRandom().primaryKey(),
    firstName: (0, pg_core_1.varchar)("firstName").notNull(),
    lastName: (0, pg_core_1.varchar)("lastName").notNull(),
    initials: (0, pg_core_1.varchar)("initials").notNull(),
    email: (0, pg_core_1.varchar)("email").notNull().unique(),
    password: (0, pg_core_1.varchar)("password").notNull().unique(),
    avatar: (0, pg_core_1.varchar)("avatar").default(""),
    description: (0, pg_core_1.varchar)("description").default(''),
    domain: (0, pg_core_1.varchar)("domain").default(''),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull()
});
exports.UserTableRelations = (0, drizzle_orm_1.relations)(exports.UserTable, ({ many }) => {
    return {
        boards: many(board_table_1.BoardTable)
    };
});
