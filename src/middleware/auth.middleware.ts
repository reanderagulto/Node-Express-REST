import { verifyToken } from "../services/auth.service";
import logger from "../utils/logger";

export const authenticateJWT = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      logger.warn("JWT authentication failed: missing token", {
        path: req.path,
        ip: req.ip,
      });
      return res.status(401).json({
        message: "Access token is missing",
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      logger.warn("JWT authentication failed: invalid token", {
        path: req.path,
        ip: req.ip,
      });
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    logger.error("JWT authentication error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    next(error);
  }
};
