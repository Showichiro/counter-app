import { relations } from "drizzle-orm/relations";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sheets = sqliteTable("sheets", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export const sheetRelations = relations(sheets, ({ many }) => ({
  categories: many(categories),
}));

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  sheet_id: integer("sheet_id")
    .notNull()
    .references(() => sheets.id, { onDelete: "cascade" }),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  sheet: one(sheets, {
    fields: [categories.sheet_id],
    references: [sheets.id],
  }),
  counters: many(counters),
}));

export const counters = sqliteTable("counters", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  count: integer("count").notNull(),
  category_id: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export const countersRelations = relations(counters, ({ one }) => ({
  category: one(categories, {
    fields: [counters.category_id],
    references: [categories.id],
  }),
}));
