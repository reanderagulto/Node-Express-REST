import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import routes
import postRoutes from "./routes/post.routes";
import apiKeyRoutes from "./routes/apiKey.routes";

// Use routes
app.use("/posts", postRoutes);
app.use("/api-keys", apiKeyRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
