import express from "express";
import postController from "../controllers/post.controller";
import { apiKeyAuth } from "../middleware/apiKey.middleware";

const router = express.Router();

// Get all posts with pagination and search
router.get("/", apiKeyAuth, postController.getPosts);

// Get post by ID
router.get("/:id", apiKeyAuth, postController.getPostById);

// Create a new post
router.post("/", apiKeyAuth, postController.createPost);

// Update a post
router.put("/:id", apiKeyAuth, postController.updatePost);

// Partially update a post
router.patch("/:id", apiKeyAuth, postController.patchPost);

// Delete a post
router.delete("/:id", apiKeyAuth, postController.deletePost);

export default router;
