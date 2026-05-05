import express from "express";
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { authorizeUserOwnership } from "../middleware/auth.authorization";

const router = express.Router();

// Register a new user
router.post("/", userController.registerUser);

// Get all users (requires authentication)
router.get("/", authenticateJWT, userController.getUsers);

// Get a specific user (requires authentication)
router.get("/:id", authenticateJWT, userController.getUser);

// Update a user (requires authentication and user ownership)
router.put(
  "/:id",
  authenticateJWT,
  authorizeUserOwnership,
  userController.updateUser,
);

// Delete a user (requires authentication and user ownership)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeUserOwnership,
  userController.deleteUser,
);

export default router;
