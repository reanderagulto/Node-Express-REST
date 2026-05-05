import {
  findApiKey,
  createApiKey,
  getApiKeys,
  getApiKeyById,
  updateApiKey,
  deleteApiKey,
} from "../repository/apikey.repository";
import { generateApiKey, hashApiKey, verifyApiKey } from "../utils/crypto";
import logger from "../utils/logger";

export const validateApiKey = async (key: string) => {
  try {
    const apiKey = await findApiKey(key);

    if (!apiKey || !apiKey.isActive) {
      logger.warn("Invalid or inactive API key attempt", {
        keyId: apiKey?.id,
      });
      return null;
    }

    // Update last used timestamp
    if (apiKey.id) {
      await updateApiKey(apiKey.id, {
        lastUsedAt: new Date(),
      });
    }

    return apiKey;
  } catch (error) {
    logger.error("API key validation error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return null;
  }
};

export const createNewApiKey = async (name: string, userId?: number) => {
  const plainKey = generateApiKey();
  const keyHash = hashApiKey(plainKey);

  const apiKey = await createApiKey({
    key: plainKey,
    keyHash,
    name,
    isActive: true,
    userId,
  });

  logger.info("API key created", { apiKeyId: apiKey.id, userId });

  // Return the plain key only on creation (won't be retrievable later)
  return {
    id: apiKey.id,
    key: plainKey,
    name: apiKey.name,
    createdAt: apiKey.createdAt,
    message: "Store this API key securely. It will not be shown again.",
  };
};

export const getAllApiKeys = async () => {
  return getApiKeys();
};

export const getApiKeyByIdentifier = async (id: string) => {
  return getApiKeyById(id);
};

export const updateApiKeyDetails = async (
  id: string,
  data: { name?: string; isActive?: boolean },
) => {
  const updatedKey = await updateApiKey(id, data);
  logger.info("API key updated", { apiKeyId: id });
  return updatedKey;
};

export const deleteApiKeyById = async (id: string) => {
  logger.info("API key deleted", { apiKeyId: id });
  return deleteApiKey(id);
};
