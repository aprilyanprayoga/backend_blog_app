import { db } from "../db";
import { posts, categories } from "../db/schema";
import { eq } from "drizzle-orm";

export const PostModel = {
    async findAll() {
        return db
            .select({
                id: posts.id,
                title: posts.title,
                slug: posts.slug,
                content: posts.content,
                thumbnail: posts.thumbnail,
                categoryId: posts.categoryId,
                categoryName: categories.name,
                createdAt: posts.createdAt,
                updatedAt: posts.updatedAt,
            })
            .from(posts)
            .leftJoin(categories, eq(posts.categoryId, categories.id));
    },

    async findById(id: number) {
        const result = await db
            .select({
                id: posts.id,
                title: posts.title,
                slug: posts.slug,
                content: posts.content,
                thumbnail: posts.thumbnail,
                thumbnailPublicId: posts.thumbnailPublicId,
                categoryId: posts.categoryId,
                categoryName: categories.name,
                createdAt: posts.createdAt,
                updatedAt: posts.updatedAt,
            })
            .from(posts)
            .leftJoin(categories, eq(posts.categoryId, categories.id))
            .where(eq(posts.id, id));
        return result[0] || null;
    },

    async categoryExists(categoryId: number) {
        const result = await db
            .select()
            .from(categories)
            .where(eq(categories.id, categoryId));
        return result.length > 0;
    },

    async create(data: {
        categoryId: number;
        title: string;
        slug: string;
        content: string;
        thumbnail?: string | null;
        thumbnailPublicId?: string | null;
    }) {
        const result = await db.insert(posts).values(data);
        const insertId = result[0].insertId;
        return this.findById(insertId);
    },

    async update(
        id: number,
        data: {
            categoryId: number;
            title: string;
            content: string;
            thumbnail?: string | null;
            thumbnailPublicId?: string | null;
        }
    ) {
        await db.update(posts).set(data).where(eq(posts.id, id));
        return this.findById(id);
    },

    async remove(id: number) {
        const existing = await this.findById(id);
        if (!existing) return null;
        await db.delete(posts).where(eq(posts.id, id));
        return existing;
    },
};