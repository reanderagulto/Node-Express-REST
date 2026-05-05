import { findApiKeyByHash } from "../repository/apikey.repository";
import logger from "../utils/logger";
import { hashApiKey } from "../utils/crypto";

export const apiKeyAuth = async (req: any, res: any, next: any) => {
  try {
    const key = req.header("x-api-key");

    if (!key) {
      logger.warn("API request without API key", {
        path: req.path,
        ip: req.ip,
      });
      return res.status(401).json({
        message: "API Key is missing",
      });
    }

    // Hash the provided key
    const keyHash = hashApiKey(key);

    // Find by hash
    const apiKey = await findApiKeyByHash(keyHash);

    if (!apiKey || !apiKey.isActive) {
      logger.warn("Invalid or inactive API key attempt", {
        path: req.path,
        ip: req.ip,
      });
      return res.status(403).json({
        message: "Invalid or inactive API Key",
      });
    }

    req.apiKey = apiKey;
    next();
  } catch (error) {
    logger.error("API key middleware error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next(error);
  }
};
