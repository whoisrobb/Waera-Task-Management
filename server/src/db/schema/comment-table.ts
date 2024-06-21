import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { CardTable } from "./card-table";
import { UserTable } from "./user-table";


export const CommentTable = pgTable("commentTable", {
    commentId: uuid("commentId").defaultRandom().primaryKey(),
    text: varchar("text").notNull(),
    cardId: uuid("cardId").references(() => CardTable.cardId, { onDelete: "cascade" }),
    userId: uuid("userId").references(() => UserTable.userId),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const CommentTableRelations = relations(CommentTable,
    ({ one }) => {
        return {
            card: one(CardTable, {
                fields: [CommentTable.cardId],
                references: [CardTable.cardId]
            }),
            user: one(UserTable, {
                fields: [CommentTable.userId],
                references: [UserTable.userId]
            })
        }
    }
);