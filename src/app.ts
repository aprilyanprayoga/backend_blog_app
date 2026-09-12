import express from "express";
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ success: true, message: "Blog API is running" });
});

app.use("/api/categories", categoryRoutes);

export default app;