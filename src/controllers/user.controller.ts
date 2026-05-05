import {
  createNewUser,
  getUsers as getUsersService,
  getUserById,
  updateUserDetails,
  deleteUserById,
} from "../services/user.service";
import logger from "../utils/logger";

export const registerUser = async (req: any, res: any, next: any) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "No Request Body",
      });
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email, password, and name are required",
      });
    }

    const user = await createNewUser(email, password, name);

    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    logger.warn("User registration error", { error: error.message });
    res.status(400).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed",
    });
  }
};

export const getUsers = async (req: any, res: any, next: any) => {
  try {
    const users = await getUsersService();

    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    logger.error("Get users error", {
      error: error.message,
    });
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to retrieve users",
    });
  }
};

export const getUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const user = await getUserById(parseInt(id));

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    logger.error("Get user error", {
      error: error.message,
    });
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to retrieve user",
    });
  }
};

export const updateUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const { email, name, password } = req.body;

    if (!email && !name && !password) {
      return res.status(400).json({
        message: "At least one field (email, name, password) is required",
      });
    }

    const user = await updateUserDetails(parseInt(id), {
      email,
      name,
      password,
    });

    logger.info("User updated", { userId: id });

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    logger.warn("User update error", { error: error.message });
    res.status(400).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update user",
    });
  }
};

export const deleteUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    await deleteUserById(parseInt(id));

    logger.info("User deleted", { userId: id });

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    logger.error("Delete user error", {
      error: error.message,
    });
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete user",
    });
  }
};

export default {
  registerUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
