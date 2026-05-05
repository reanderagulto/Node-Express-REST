import crypto from "crypto";

export const generateApiKey = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const hashApiKey = (apiKey: string): string => {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
};

export const verifyApiKey = (plainKey: string, hashedKey: string): boolean => {
  const hash = hashApiKey(plainKey);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashedKey));
};
