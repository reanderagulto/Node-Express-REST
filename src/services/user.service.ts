import {
  findUserByEmail,
  createUser,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../repository/user.repository";
import {
  validateEmail,
  validatePassword,
  getPasswordError,
  getEmailError,
} from "../utils/validation";
import bcryptjs from "bcryptjs";
import logger from "../utils/logger";

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

export const createNewUser = async (
  email: string,
  password: string,
  name: string,
) => {
  // Validate inputs
  const emailError = getEmailError(email);
  if (emailError) {
    throw new Error(emailError);
  }

  const passwordError = getPasswordError(password);
  if (passwordError) {
    throw new Error(passwordError);
  }

  if (!name || name.trim().length === 0) {
    throw new Error("Name is required");
  }

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    logger.warn("Registration attempt with existing email", { email });
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await createUser({
    email,
    password: hashedPassword,
    name,
  });

  logger.info("User registered successfully", { userId: user.id, email });

  // Omit password from returned user
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUserByEmail = async (email: string) => {
  return findUserByEmail(email);
};

export const getUserById = async (id: number) => {
  return findUserById(id);
};

export const getUsers = async () => {
  return getAllUsers();
};

export const updateUserDetails = async (
  id: number,
  data: { email?: string; name?: string; password?: string },
) => {
  if (data.password) {
    const passwordError = getPasswordError(data.password);
    if (passwordError) {
      throw new Error(passwordError);
    }
    data.password = await hashPassword(data.password);
  }

  if (data.email) {
    const emailError = getEmailError(data.email);
    if (emailError) {
      throw new Error(emailError);
    }

    // Check if email is already in use by another user
    const existingUser = await findUserByEmail(data.email);
    if (existingUser && existingUser.id !== id) {
      throw new Error("Email is already in use");
    }
  }

  if (data.name && data.name.trim().length === 0) {
    throw new Error("Name cannot be empty");
  }

  const updatedUser = await updateUser(id, data);

  logger.info("User updated successfully", { userId: id });

  // Omit password from returned user
  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUserById = async (id: number) => {
  logger.info("User deleted", { userId: id });
  return deleteUser(id);
};
