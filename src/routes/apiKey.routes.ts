import express from "express";
import apiKeyController from "../controllers/apiKey.controller";
import { apiKeyAuth } from "../middleware/apiKey.middleware";

const router = express.Router();

// Create a new API key
router.post("/", apiKeyController.createApiKey);

// Get all API keys
router.get("/", apiKeyAuth, apiKeyController.getApiKeys);

// Get a specific API key
router.get("/:id", apiKeyAuth, apiKeyController.getApiKey);

// Update an API key
router.put("/:id", apiKeyAuth, apiKeyController.updateApiKey);

// Delete an API key
router.delete("/:id", apiKeyAuth, apiKeyController.deleteApiKey);

export default router;
