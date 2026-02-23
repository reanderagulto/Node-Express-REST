"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.registerUser = void 0;
const user_service_1 = require("../services/user.service");
const registerUser = async (req, res, next) => {
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
        const user = await (0, user_service_1.createNewUser)(email, password, name);
        res.status(201).json({
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        if (error.message === "User with this email already exists") {
            return res.status(409).json({
                message: error.message,
            });
        }
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.registerUser = registerUser;
const getUsers = async (req, res, next) => {
    try {
        const users = await (0, user_service_1.getUsers)();
        res.status(200).json({
            message: "Users retrieved successfully",
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.getUserById)(parseInt(id));
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, name, password } = req.body;
        const user = await (0, user_service_1.updateUserDetails)(parseInt(id), {
            email,
            name,
            password,
        });
        res.status(200).json({
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, user_service_1.deleteUserById)(parseInt(id));
        res.status(200).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
exports.default = {
    registerUser: exports.registerUser,
    getUsers: exports.getUsers,
    getUser: exports.getUser,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser,
};
//# sourceMappingURL=user.controller.js.map