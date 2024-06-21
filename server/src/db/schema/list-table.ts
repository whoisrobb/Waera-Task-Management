import { relations, sql } from "drizzle-orm";
import { pgTable, smallint, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { BoardTable } from "./board-table";
import { CardTable } from "./card-table";


export const ListTable = pgTable("listTable", {
    listId: uuid("listId").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    position: smallint("position"),
    boardId: uuid("boardId").references(() => BoardTable.boardId, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export const ListTableRelations = relations(ListTable,
    ({ one, many }) => {
        return {
            board: one(BoardTable, {
                fields: [ListTable.boardId],
                references: [BoardTable.boardId]
            }),
            cards: many(CardTable)
        }
    }
);

export type List = typeof ListTable.$inferSelect;