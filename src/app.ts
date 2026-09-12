import express from "express";
import categoryRoutes from "./routes/category.routes";
import postRoutes from "./routes/post.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ success: true, message: "Blog API is running" });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

export default app;