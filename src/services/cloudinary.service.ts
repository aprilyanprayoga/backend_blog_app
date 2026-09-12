import cloudinary from "../config/cloudinary";

// Helper upload ke Cloudinary via stream buffer
export const uploadToCloudinary = (
    fileBuffer: Buffer
): Promise<{ secure_url: string; public_id: string }> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "blog_app_thumbnails",
                resource_type: "image",
            },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        );
        uploadStream.end(fileBuffer);
    });
};

// Helper hapus gambar dari Cloudinary
export const deleteFromCloudinary = async (publicId: string) => {
    return cloudinary.uploader.destroy(publicId);
};