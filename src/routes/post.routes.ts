import express from "express";
import postController from "../controllers/post.controller";

const router = express.Router();

// Get all posts with pagination and search
router.get("/", postController.getPosts);

// Get post by ID
router.get("/:id", postController.getPostById);

// Create a new post
router.post("/", postController.createPost);

// Update a post
router.put("/:id", postController.updatePost);

// Partially update a post
router.patch("/:id", postController.patchPost);

// Delete a post
router.delete("/:id", postController.deletePost);

export default router;
