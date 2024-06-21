import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user-table";
import { ListTable } from "./list-table";


export const BoardTable = pgTable("boardTable", {
    boardId: uuid("boardId").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    description: text("description"),
    userId: uuid("userId").references(() => UserTable.userId),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const BoardTableRelations = relations(BoardTable,
    ({ one, many }) => {
        return {
            lists: many(ListTable),
            user: one(UserTable, {
                fields: [BoardTable.userId],
                references: [UserTable.userId]
            })
        }
    }
);

export type Board = typeof BoardTable.$inferSelect;