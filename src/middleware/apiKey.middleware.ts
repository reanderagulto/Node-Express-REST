import { validateApiKey } from "../services/apiKey.service";

export const apiKeyAuth = async (req: any, res: any, next: any) => {
  try {
    const key = req.header("x-api-key");

    if (!key) {
      return res.status(401).json({
        message: "API Key is missing",
      });
    }

    const apiKey = await validateApiKey(key);

    if (!apiKey) {
      return res.status(403).json({
        message: "Invalid or inactive API Key",
      });
    }

    req.apiKey = apiKey;

    next();
  } catch (error) {
    next(error);
  }
};
