import express from "express";
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = express.Router();

// Register a new user
router.post("/", userController.registerUser);

// Get all users (requires authentication)
router.get("/", authenticateJWT, userController.getUsers);

// Get a specific user (requires authentication)
router.get("/:id", authenticateJWT, userController.getUser);

// Update a user (requires authentication)
router.put("/:id", authenticateJWT, userController.updateUser);

// Delete a user (requires authentication)
router.delete("/:id", authenticateJWT, userController.deleteUser);

export default router;
