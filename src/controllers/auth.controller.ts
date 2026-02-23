import { loginUser } from "../services/auth.service";

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
      return res.status(401).json({
        message: error.message,
      });
    }

    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  login,
};
