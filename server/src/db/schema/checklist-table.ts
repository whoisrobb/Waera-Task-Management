import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { CardTable } from "./card-table";


export const ChecklistTable = pgTable("checklistTable", {
    checklistId: uuid("checklistId").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    cardId: uuid("cardId").references(() => CardTable.cardId, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const ChecklistItemTable = pgTable("checklistItemTable", {
    checklistItemId: uuid("checklistItemId").defaultRandom().primaryKey(),
    text: varchar("text").notNull(),
    completed: boolean("completed").notNull().default(false),
    checklistId: uuid("checklistId").references(() => ChecklistTable.checklistId, { onDelete: "cascade" })
});

export const ChecklistTableRelations = relations(ChecklistTable,
    ({ one, many }) => {
        return {
            card: one(CardTable,{
                fields: [ChecklistTable.cardId],
                references: [CardTable.cardId]
            }),
            checklistItems: many(ChecklistItemTable)
        }
    }
)

export const ChecklistItemTableRelations = relations(ChecklistItemTable,
    ({ one }) => {
        return {
            checklist: one(ChecklistTable,{
                fields: [ChecklistItemTable.checklistId],
                references: [ChecklistTable.checklistId]
            }),
        }
    }
)