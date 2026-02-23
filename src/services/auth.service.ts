import { findUserByEmail } from "../repository/auth.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  // Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  // Check if user is active
  if (user.status !== "ACTIVE") {
    throw new Error("User account is not active");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    (process.env.JWT_SECRET || "default_secret_key") as string,
    {
      expiresIn: "24h",
    },
  );

  // Omit password from returned user
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(
      token,
      (process.env.JWT_SECRET || "default_secret_key") as string,
    );
  } catch (error) {
    return null;
  }
};
