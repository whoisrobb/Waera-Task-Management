import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const LabelTable = pgTable("labelTable", {
    labelId: uuid("labelId").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    color: varchar("color").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").default(sql`current_timestamp`),
});

export type Label = typeof LabelTable.$inferSelect;