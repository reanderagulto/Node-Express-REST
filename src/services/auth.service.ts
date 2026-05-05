import { findUserByEmail } from "../repository/auth.repository";
import bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import logger from "../utils/logger";

export const loginUser = async (email: string, password: string) => {
  // Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    logger.warn("Login attempt with non-existent email", { email });
    throw new Error("Invalid email or password");
  }

  // Verify password
  const passwordMatch = await bcryptjs.compare(password, user.password);
  if (!passwordMatch) {
    logger.warn("Login attempt with incorrect password", { email });
    throw new Error("Invalid email or password");
  }

  // Check if user is active
  if (user.status !== "ACTIVE") {
    logger.warn("Login attempt with inactive account", {
      email,
      status: user.status,
    });
    throw new Error("User account is not active");
  }

  const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
  const expiresIn =
    (process.env.JWT_EXPIRATION as jwt.SignOptions["expiresIn"]) || "24h";
  const signOptions: jwt.SignOptions = {
    expiresIn,
  };

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    jwtSecret,
    signOptions,
  );

  logger.info("User logged in successfully", { userId: user.id, email });

  // Omit password from returned user
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

export const verifyToken = (token: string) => {
  try {
    const jwtSecret = process.env.JWT_SECRET as jwt.Secret;
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    logger.warn("Invalid token verification attempt", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return null;
  }
};
