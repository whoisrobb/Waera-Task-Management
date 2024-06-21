import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { LabelTable } from "./label-table";
import { CardTable } from "./card-table";


export const CardLabelsTable = pgTable("cardLabelsTable", {
    cardId: uuid("cardId").references(() => CardTable.cardId),
    labelId: uuid("labelId").references(() => LabelTable.labelId),
}, table => {
    return {
        pk: primaryKey({ columns: [table.cardId, table.labelId] })
    }
});