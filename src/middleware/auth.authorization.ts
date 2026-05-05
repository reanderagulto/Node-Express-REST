import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const authorizeUserOwnership = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      logger.warn("Authorization failed: no user context", { path: req.path });
      return res.status(401).json({
        message: "User context not found",
      });
    }

    if (parseInt(id) !== userId) {
      logger.warn("Authorization failed: user not authorized", {
        userId,
        requestedId: id,
        path: req.path,
        ip: req.ip,
      });
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }

    next();
  } catch (error) {
    logger.error("Authorization error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({ error: "Authorization check failed" });
  }
};

export const authorizeApiKeyOwnership = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      logger.warn("Authorization failed: no user context for API key", {
        path: req.path,
      });
      return res.status(401).json({
        message: "User context not found",
      });
    }

    req.userId = userId;
    next();
  } catch (error) {
    logger.error("Authorization error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({ error: "Authorization check failed" });
  }
};
