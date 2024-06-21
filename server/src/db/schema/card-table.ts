import { relations, sql } from "drizzle-orm";
import { boolean, date, json, pgTable, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { ListTable } from "./list-table";
import { AttachmentTable } from "./attachment-table";
import { CommentTable } from "./comment-table";
import { ChecklistTable } from "./checklist-table";
import { type Label } from "./label-table";


export const CardTable = pgTable("cardTable", {
    cardId: uuid("cardId").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    description: text("description"),
    position: smallint("position"),
    labels: json("labels").$type<Label[]>().default([]),
    dueDate: date("dueDate"),
    completed: boolean("completed").notNull().default(false),
    listId: uuid("listId").references(() => ListTable.listId, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const CardTableRelations = relations(CardTable,
    ({ one, many }) => {
        return {
            attachments: many(AttachmentTable),
            comments: many(CommentTable),
            checklists: many(ChecklistTable),
            list: one(ListTable, {
                fields: [CardTable.listId],
                references: [ListTable.listId]
            })
        }
    }
);

export type Card = typeof CardTable.$inferSelect;