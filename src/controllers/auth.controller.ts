import { loginUser } from "../services/auth.service";
import logger from "../utils/logger";

export const login = async (req: any, res: any, next: any) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "No Request Body",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const loginResult = await loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      data: loginResult,
    });
  } catch (error: any) {
    if (
      error.message === "Invalid email or password" ||
      error.message === "User account is not active"
    ) {
      logger.warn("Login failed", { error: error.message });
      return res.status(401).json({
        message: error.message,
      });
    }

    logger.error("Login error", { error: error.message });
    res.status(400).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An error occurred during login",
    });
  }
};

export default {
  login,
};
