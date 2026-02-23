import {
  findUserByEmail,
  createUser,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../repository/user.repository";
import { validateEmail } from "../helpers/users.helpers";
import bcrypt from "bcryptjs";

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const createNewUser = async (
  email: string,
  password: string,
  name: string,
) => {
  // Validate inputs
  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (!validatePassword(password)) {
    throw new Error("Password must be at least 6 characters long");
  }

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
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
    if (!validatePassword(data.password)) {
      throw new Error("Password must be at least 6 characters long");
    }
    data.password = await hashPassword(data.password);
  }

  if (data.email && !validateEmail(data.email)) {
    throw new Error("Invalid email format");
  }

  const user = await updateUser(id, data);
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const deleteUserById = async (id: number) => {
  return deleteUser(id);
};
