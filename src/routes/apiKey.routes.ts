import express from "express";
import apiKeyController from "../controllers/apiKey.controller";
import { apiKeyAuth } from "../middleware/apiKey.middleware";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = express.Router();

// Create a new API key - requires JWT authentication
router.post("/", authenticateJWT, apiKeyController.createApiKey);

// Get all API keys - requires API key authentication
router.get("/", apiKeyAuth, apiKeyController.getApiKeys);

// Get a specific API key - requires API key authentication
router.get("/:id", apiKeyAuth, apiKeyController.getApiKey);

// Update an API key - requires API key authentication
router.put("/:id", apiKeyAuth, apiKeyController.updateApiKey);

// Delete an API key - requires API key authentication
router.delete("/:id", apiKeyAuth, apiKeyController.deleteApiKey);

export default router;
