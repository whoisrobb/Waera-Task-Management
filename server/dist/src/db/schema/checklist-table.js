"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItemTableRelations = exports.ChecklistTableRelations = exports.ChecklistItemTable = exports.ChecklistTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const card_table_1 = require("./card-table");
exports.ChecklistTable = (0, pg_core_1.pgTable)("checklistTable", {
    checklistId: (0, pg_core_1.uuid)("checklistId").defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    cardId: (0, pg_core_1.uuid)("cardId").references(() => card_table_1.CardTable.cardId, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").default((0, drizzle_orm_1.sql) `current_timestamp`),
});
exports.ChecklistItemTable = (0, pg_core_1.pgTable)("checklistItemTable", {
    checklistItemId: (0, pg_core_1.uuid)("checklistItemId").defaultRandom().primaryKey(),
    text: (0, pg_core_1.varchar)("text").notNull(),
    completed: (0, pg_core_1.boolean)("completed").notNull().default(false),
    checklistId: (0, pg_core_1.uuid)("checklistId").references(() => exports.ChecklistTable.checklistId, { onDelete: "cascade" })
});
exports.ChecklistTableRelations = (0, drizzle_orm_1.relations)(exports.ChecklistTable, ({ one, many }) => {
    return {
        card: one(card_table_1.CardTable, {
            fields: [exports.ChecklistTable.cardId],
            references: [card_table_1.CardTable.cardId]
        }),
        checklistItems: many(exports.ChecklistItemTable)
    };
});
exports.ChecklistItemTableRelations = (0, drizzle_orm_1.relations)(exports.ChecklistItemTable, ({ one }) => {
    return {
        checklist: one(exports.ChecklistTable, {
            fields: [exports.ChecklistItemTable.checklistId],
            references: [exports.ChecklistTable.checklistId]
        }),
    };
});
