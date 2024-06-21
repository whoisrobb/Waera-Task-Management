"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardLabelsTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const label_table_1 = require("./label-table");
const card_table_1 = require("./card-table");
exports.CardLabelsTable = (0, pg_core_1.pgTable)("cardLabelsTable", {
    cardId: (0, pg_core_1.uuid)("cardId").references(() => card_table_1.CardTable.cardId),
    labelId: (0, pg_core_1.uuid)("labelId").references(() => label_table_1.LabelTable.labelId),
}, table => {
    return {
        pk: (0, pg_core_1.primaryKey)({ columns: [table.cardId, table.labelId] })
    };
});
