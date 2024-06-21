import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { BoardTable } from "./board-table";


export const UserTable = pgTable("user", {
    userId: uuid("userId").defaultRandom().primaryKey(),
    firstName: varchar("firstName").notNull(),
    lastName: varchar("lastName").notNull(),
    initials: varchar("initials").notNull(),
    email: varchar("email").notNull().unique(),
    password: varchar("password").notNull().unique(),
    avatar: varchar("avatar").default(""),
    description: varchar("description").default(''),
    domain: varchar("domain").default(''),
    createdAt: timestamp("createdAt").defaultNow().notNull()
});

export const UserTableRelations = relations(UserTable,
    ({ many }) => {
        return {
            boards: many(BoardTable)
        }
    }
);

export type User = typeof UserTable.$inferSelect;