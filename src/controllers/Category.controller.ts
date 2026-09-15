import { Request, Response } from "express";
import { CategoryModel } from "../models/category.model";

export const CategoryController = {
    async getAll(req: Request, res: Response) {
        try {
            const categories = await CategoryModel.findAll();
            res.status(200).json({
                success: true,
                message: "Data kategori berhasil diambil",
                data: categories,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const category = await CategoryModel.findById(id);

            if (!category) {
                return res.status(404).json({ success: false, message: "Kategori tidak ditemukan" });
            }

            res.status(200).json({
                success: true,
                message: "Detail kategori berhasil diambil",
                data: category,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            if (!name || name.trim() === "") {
                return res.status(400).json({ success: false, message: "Nama kategori tidak boleh kosong" });
            }

            const category = await CategoryModel.create(name);
            res.status(201).json({
                success: true,
                message: "Kategori berhasil ditambahkan",
                data: category,
            });
        } catch (err: any) {
            console.error(err);
            if (err?.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ success: false, message: "Nama kategori sudah ada" });
            }
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name } = req.body;

            if (!name || name.trim() === "") {
                return res.status(400).json({ success: false, message: "Nama kategori tidak boleh kosong" });
            }

            const existing = await CategoryModel.findById(id);
            if (!existing) {
                return res.status(404).json({ success: false, message: "Kategori tidak ditemukan" });
            }

            const category = await CategoryModel.update(id, name);
            res.status(200).json({
                success: true,
                message: "Kategori berhasil diperbarui",
                data: category,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },

    async remove(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const deleted = await CategoryModel.remove(id);

            if (!deleted) {
                return res.status(404).json({ success: false, message: "Kategori tidak ditemukan" });
            }

            res.status(200).json({ success: true, message: "Kategori berhasil dihapus" });
        } catch (err: any) {
            console.error(err);
            // Kode error MySQL untuk pelanggaran foreign key constraint
            if (err?.errno === 1451 || err?.code === "ER_ROW_IS_REFERENCED_2") {
                return res.status(400).json({
                    success: false,
                    message: "Kategori masih dipakai oleh artikel. Hapus atau pindahkan artikelnya dulu.",
                });
            }
            res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
        }
    },
};