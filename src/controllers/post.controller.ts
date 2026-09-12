import { Request, Response } from "express";
import { PostModel } from "../models/post.model";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinary.service";

function generateSlug(title: string): string {
    return (
        title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now()
    );
}

export const PostController = {
    async getAll(req: Request, res: Response) {
        try {
            const data = await PostModel.findAll();
            res.status(200).json({
                success: true,
                message: "Data artikel berhasil diambil",
                data,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const post = await PostModel.findById(id);

            if (!post) {
                return res.status(404).json({ success: false, message: "Artikel tidak ditemukan" });
            }

            res.status(200).json({
                success: true,
                message: "Detail artikel berhasil diambil",
                data: post,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { title, content } = req.body;
            const categoryId = Number(req.body.category_id);

            if (!title || title.trim() === "") {
                return res.status(400).json({ success: false, message: "Title tidak boleh kosong" });
            }
            if (!content || content.trim() === "") {
                return res.status(400).json({ success: false, message: "Content tidak boleh kosong" });
            }
            if (!categoryId || isNaN(categoryId)) {
                return res.status(400).json({ success: false, message: "category_id wajib diisi dan berupa angka" });
            }

            const categoryExists = await PostModel.categoryExists(categoryId);
            if (!categoryExists) {
                return res.status(400).json({ success: false, message: "category_id tidak ditemukan" });
            }

            let thumbnail: string | null = null;
            let thumbnailPublicId: string | null = null;

            if (req.file) {
                const uploaded = await uploadToCloudinary(req.file.buffer);
                thumbnail = uploaded.secure_url;
                thumbnailPublicId = uploaded.public_id;
            }

            const post = await PostModel.create({
                categoryId,
                title,
                content,
                slug: generateSlug(title),
                thumbnail,
                thumbnailPublicId,
            });

            res.status(201).json({
                success: true,
                message: "Artikel berhasil dibuat",
                data: post,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { title, content } = req.body;
            const categoryId = Number(req.body.category_id);

            const existing = await PostModel.findById(id);
            if (!existing) {
                return res.status(404).json({ success: false, message: "Artikel tidak ditemukan" });
            }

            if (!title || title.trim() === "") {
                return res.status(400).json({ success: false, message: "Title tidak boleh kosong" });
            }
            if (!content || content.trim() === "") {
                return res.status(400).json({ success: false, message: "Content tidak boleh kosong" });
            }
            if (!categoryId || isNaN(categoryId)) {
                return res.status(400).json({ success: false, message: "category_id wajib diisi dan berupa angka" });
            }

            const categoryExists = await PostModel.categoryExists(categoryId);
            if (!categoryExists) {
                return res.status(400).json({ success: false, message: "category_id tidak ditemukan" });
            }

            let thumbnail: string | null | undefined = undefined;
            let thumbnailPublicId: string | null | undefined = undefined;

            if (req.file) {
                if (existing.thumbnailPublicId) {
                    await deleteFromCloudinary(existing.thumbnailPublicId);
                }
                const uploaded = await uploadToCloudinary(req.file.buffer);
                thumbnail = uploaded.secure_url;
                thumbnailPublicId = uploaded.public_id;
            }

            const post = await PostModel.update(id, {
                categoryId,
                title,
                content,
                ...(thumbnail !== undefined && { thumbnail, thumbnailPublicId }),
            });

            res.status(200).json({
                success: true,
                message: "Artikel berhasil diperbarui",
                data: post,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },

    async remove(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await PostModel.remove(id);

            if (!deleted) {
                return res.status(404).json({ success: false, message: "Artikel tidak ditemukan" });
            }

            if (deleted.thumbnailPublicId) {
                await deleteFromCloudinary(deleted.thumbnailPublicId);
            }

            res.status(200).json({ success: true, message: "Artikel berhasil dihapus" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },
};