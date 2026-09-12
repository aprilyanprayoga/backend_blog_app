import multer from "multer";

// simpan file sementara di memori (buffer), belum ditulis ke disk
const storage = multer.memoryStorage();

export const uploadThumbnail = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // maksimal 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Format file harus JPG, PNG, atau WEBP"));
        }
    },
}).single("thumbnail"); // field name di form-data harus "thumbnail"