import {
    mysqlTable,
    int,
    varchar,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const categories = mysqlTable("categories", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const posts = mysqlTable("posts", {
    id: int("id").autoincrement().primaryKey(),
    categoryId: int("category_id")
        .notNull()
        .references(() => categories.id),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).unique(),
    content: text("content").notNull(),
    thumbnail: text("thumbnail"),
    thumbnailPublicId: text("thumbnail_public_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
    category: one(categories, {
        fields: [posts.categoryId],
        references: [categories.id],
    }),
}));