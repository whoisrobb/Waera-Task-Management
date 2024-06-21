import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { CardTable } from "./card-table";
import { relations } from "drizzle-orm";


export const AttachmentTable = pgTable("attachment", {
    attachmentId: uuid("attchmentId").defaultRandom().primaryKey(),
    filename: varchar("filename").notNull(),
    filepath: varchar("filepath").notNull(),
    size: integer("size").notNull(),
    cardId: uuid("cardId").references(() => CardTable.cardId, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull()
});

export const AttachmentTableRelations = relations(AttachmentTable,
    ({ one }) => {
        return {
            card: one(CardTable, {
                fields: [AttachmentTable.cardId],
                references: [CardTable.cardId]
            })
        }
    }
);