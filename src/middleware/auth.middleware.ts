import { verifyToken } from "../services/auth.service";

export const authenticateJWT = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Access token is missing",
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
