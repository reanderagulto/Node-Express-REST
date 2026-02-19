import {
  createNewApiKey,
  getAllApiKeys,
  getApiKeyByIdentifier,
  updateApiKeyDetails,
  deleteApiKeyById,
} from "../services/apiKey.service";

export const createApiKey = async (req: any, res: any, next: any) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "No Request Body",
      });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "API key name is required",
      });
    }

    const apiKey = await createNewApiKey(name);

    res.status(201).json({
      message: "API key created successfully",
      data: apiKey,
    });
  } catch (error) {
    next(error);
  }
};

export const getApiKeys = async (req: any, res: any, next: any) => {
  try {
    const apiKeys = await getAllApiKeys();

    res.status(200).json({
      message: "API keys retrieved successfully",
      data: apiKeys,
    });
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
};

export const updateApiKey = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const apiKey = await updateApiKeyDetails(id, { name, isActive });

    res.status(200).json({
      message: "API key updated successfully",
      data: apiKey,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApiKey = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    await deleteApiKeyById(id);

    res.status(200).json({
      message: "API key deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createApiKey,
  getApiKeys,
  getApiKey,
  updateApiKey,
  deleteApiKey,
};
