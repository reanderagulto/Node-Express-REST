import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import logger from "./utils/logger";
import { validateEnvironment } from "./utils/env.validator";
import prisma from "./config/database";
import { connectRedis, disconnectRedis } from "./config/cache";

dotenv.config();

// Validate environment variables at startup
validateEnvironment();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Request size limits
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

// Rate limiting for general endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many authentication attempts, please try again later.",
  skipSuccessfulRequests: true,
});

app.use(limiter);

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path}`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });
  });
  next();
});

// Import routes
import postRoutes from "./routes/post.routes";
import apiKeyRoutes from "./routes/apiKey.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// API routes with versioning
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/api-keys", apiKeyRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

// Apply stricter rate limiting to auth endpoints
app.use("/api/v1/auth", authLimiter);
app.use("/api/v1/users", authLimiter);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled error", {
    error: err.message,
    stack: err.stack,
    path: req.path,
  });

  const message =
    process.env.NODE_ENV === "development" ? err.message : "An error occurred";

  res.status(err.status || 500).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

const startServer = async () => {
  await connectRedis();

  const server = app.listen(PORT, () => {
    logger.info(`API running on http://localhost:${PORT}`, {
      env: process.env.NODE_ENV || "development",
    });
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received, shutting down gracefully`);
    server.close(async () => {
      logger.info("HTTP server closed");
      await prisma.$disconnect();
      logger.info("Database connection closed");
      await disconnectRedis();
      logger.info("Redis connection closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer().catch((error) => {
  logger.error("Server startup failed", {
    error: error instanceof Error ? error.message : "Unknown error",
  });
  process.exit(1);
});
