import {
  findApiKey,
  createApiKey,
  getApiKeys,
  getApiKeyById,
  updateApiKey,
  deleteApiKey,
} from "../repository/apikey.repository";
import { generateApiKey } from "../helpers/generate.apikey";

export const validateApiKey = async (key: string) => {
  const apiKey = await findApiKey(key);

  if (!apiKey || !apiKey.isActive) {
    return null;
  }

  return apiKey;
};

export const createNewApiKey = async (name: string) => {
  const key = generateApiKey();
  const apiKey = await createApiKey({
    key,
    name,
    isActive: true,
  });
  return apiKey;
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
  return updateApiKey(id, data);
};

export const deleteApiKeyById = async (id: string) => {
  return deleteApiKey(id);
};
