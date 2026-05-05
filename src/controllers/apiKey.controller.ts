import {
  createNewApiKey,
  getAllApiKeys,
  getApiKeyByIdentifier,
  updateApiKeyDetails,
  deleteApiKeyById,
} from "../services/apiKey.service";
import logger from "../utils/logger";

export const createApiKey = async (req: any, res: any, next: any) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "No Request Body",
      });
    }

    const { name } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        message: "API key name is required",
      });
    }

    const userId = req.user?.id;
    const apiKey = await createNewApiKey(name, userId);

    res.status(201).json({
      message: "API key created successfully",
      data: apiKey,
    });
  } catch (error: any) {
    logger.error("API key creation error", {
      error: error.message,
    });
    res.status(400).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create API key",
    });
  }
};

export const getApiKeys = async (req: any, res: any, next: any) => {
  try {
    const apiKeys = await getAllApiKeys();

    res.status(200).json({
      message: "API keys retrieved successfully",
      data: apiKeys,
    });
  } catch (error: any) {
    logger.error("Get API keys error", {
      error: error.message,
    });
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to retrieve API keys",
    });
  }
};

export const getApiKey = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const apiKey = await getApiKeyByIdentifier(id);

    if (!apiKey) {
      return res.status(404).json({
        message: "API key not found",
      });
    }

    res.status(200).json({
      message: "API key retrieved successfully",
      data: apiKey,
    });
  } catch (error: any) {
    logger.error("Get API key error", {
      error: error.message,
    });
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to retrieve API key",
    });
  }
};

export const updateApiKey = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    if (!name && isActive === undefined) {
      return res.status(400).json({
        message: "At least one field (name, isActive) is required",
      });
    }

    const apiKey = await updateApiKeyDetails(id, { name, isActive });

    res.status(200).json({
      message: "API key updated successfully",
      data: apiKey,
    });
  } catch (error: any) {
    logger.error("Update API key error", {
      error: error.message,
    });
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "API key not found",
      });
    }
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update API key",
    });
  }
};

export const deleteApiKey = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    await deleteApiKeyById(id);

    res.status(200).json({
      message: "API key deleted successfully",
    });
  } catch (error: any) {
    logger.error("Delete API key error", {
      error: error.message,
    });
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "API key not found",
      });
    }
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete API key",
    });
  }
};

export default {
  createApiKey,
  getApiKeys,
  getApiKey,
  updateApiKey,
  deleteApiKey,
};
