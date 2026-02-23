import {
  createNewUser,
  getUsers as getUsersService,
  getUserById,
  updateUserDetails,
  deleteUserById,
} from "../services/user.service";

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
    res.status(400).json({
      message: error.message,
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
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    const { email, name, password } = req.body;

    const user = await updateUserDetails(parseInt(id), {
      email,
      name,
      password,
    });

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;
    await deleteUserById(parseInt(id));

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  registerUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
