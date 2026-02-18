import dotenv from "dotenv";

dotenv.config();

export const apiKeyAuth = (req: any, res: any, next: any) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API Key is Missing" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API Key" });
  }

  next();
};
