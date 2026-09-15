import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes";
import postRoutes from "./routes/post.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ success: true, message: "Blog API is running" });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

// 🔻 TAMBAHKAN INI DI PALING BAWAH (Error Handler)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error Detail:", err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;