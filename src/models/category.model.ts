import { db } from "../db";
import { categories } from "../db/schema";
import { eq } from "drizzle-orm";

export const CategoryModel = {
    async findAll() {
        return db.select().from(categories);
    },

    async findById(id: number) {
        const result = await db
            .select()
            .from(categories)
            .where(eq(categories.id, id));
        return result[0] || null;
    },

    async create(name: string) {
        const result = await db.insert(categories).values({ name });
        const insertId = result[0].insertId;
        return this.findById(insertId);
    },

    async update(id: number, name: string) {
        await db.update(categories).set({ name }).where(eq(categories.id, id));
        return this.findById(id);
    },

    async remove(id: number) {
        const result = await db.delete(categories).where(eq(categories.id, id));
        return result[0].affectedRows > 0;
    },
};