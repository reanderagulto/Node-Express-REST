import logger from "./logger";

export const validateEnvironment = () => {
  const requiredEnvVars = [
    "DATABASE_URL",
    "JWT_SECRET",
    "NODE_ENV",
    "REDIS_URL",
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  if (missingEnvVars.length > 0) {
    logger.error("Missing required environment variables", {
      missing: missingEnvVars,
    });
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`,
    );
  }

  // Validate JWT_SECRET minimum length
  if ((process.env.JWT_SECRET || "").length < 32) {
    logger.error("JWT_SECRET is too weak", {
      length: process.env.JWT_SECRET?.length,
    });
    throw new Error("JWT_SECRET must be at least 32 characters long");
  }

  logger.info("Environment variables validated successfully");
};
