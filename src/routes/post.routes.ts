import express from "express";
import postController from "../controllers/post.controller";
import { apiKeyAuth } from "../middleware/apiKey.middleware";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = express.Router();

// Get all posts with pagination and search - requires API key
router.get("/", apiKeyAuth, postController.getPosts);

// Get post by ID - requires API key
router.get("/:id", apiKeyAuth, postController.getPostById);

// Create a new post - requires both API key and JWT authentication
router.post("/", apiKeyAuth, authenticateJWT, postController.createPost);

// Update a post - requires both API key and JWT authentication
router.put("/:id", apiKeyAuth, authenticateJWT, postController.updatePost);

// Partially update a post - requires both API key and JWT authentication
router.patch("/:id", apiKeyAuth, authenticateJWT, postController.patchPost);

// Delete a post - requires both API key and JWT authentication
router.delete("/:id", apiKeyAuth, authenticateJWT, postController.deletePost);

export default router;
