import { createClient } from "redis";
import logger from "../utils/logger";

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error(
    "REDIS_URL environment variable is required for Redis caching",
  );
}

export const redisClient = createClient({ url: REDIS_URL });

redisClient.on("error", (err) => {
  logger.error("Redis client error", {
    error: err.message,
  });
});

redisClient.on("connect", () => {
  logger.info("Redis client connected");
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export const disconnectRedis = async () => {
  if (redisClient.isOpen) {
    await redisClient.disconnect();
  }
};

const DEFAULT_TTL_SECONDS = 60;

export const setCache = async (
  key: string,
  value: unknown,
  ttl: number = DEFAULT_TTL_SECONDS,
) => {
  await redisClient.set(key, JSON.stringify(value), {
    EX: ttl,
  });
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  const rawValue = await redisClient.get(key);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch (error) {
    logger.error("Failed to parse Redis cache value", {
      key,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return null;
  }
};

export const delCache = async (key: string) => {
  await redisClient.del(key);
};

export const delCacheByPattern = async (pattern: string) => {
  const keys: string[] = [];

  for await (const key of redisClient.scanIterator({ MATCH: pattern })) {
    if (typeof key === "string") {
      keys.push(key);
    }
  }

  if (keys.length > 0) {
    await redisClient.del(keys);
  }

  return keys.length;
};
