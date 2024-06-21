"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.LabelTable = (0, pg_core_1.pgTable)("labelTable", {
    labelId: (0, pg_core_1.uuid)("labelId").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    color: (0, pg_core_1.varchar)("color").notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").default((0, drizzle_orm_1.sql) `current_timestamp`),
});
