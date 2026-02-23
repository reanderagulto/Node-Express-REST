"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserDetails = exports.getUsers = exports.getUserById = exports.getUserByEmail = exports.createNewUser = exports.hashPassword = exports.validatePassword = exports.validateEmail = void 0;
const user_repository_1 = require("../repository/user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    return password.length >= 6;
};
exports.validatePassword = validatePassword;
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const createNewUser = async (email, password, name) => {
    // Validate inputs
    if (!(0, exports.validateEmail)(email)) {
        throw new Error("Invalid email format");
    }
    if (!(0, exports.validatePassword)(password)) {
        throw new Error("Password must be at least 6 characters long");
    }
    // Check if user already exists
    const existingUser = await (0, user_repository_1.findUserByEmail)(email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    // Hash password
    const hashedPassword = await (0, exports.hashPassword)(password);
    // Create user
    const user = await (0, user_repository_1.createUser)({
        email,
        password: hashedPassword,
        name,
    });
    // Omit password from returned user
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
exports.createNewUser = createNewUser;
const getUserByEmail = async (email) => {
    return (0, user_repository_1.findUserByEmail)(email);
};
exports.getUserByEmail = getUserByEmail;
const getUserById = async (id) => {
    return (0, user_repository_1.findUserById)(id);
};
exports.getUserById = getUserById;
const getUsers = async () => {
    return (0, user_repository_1.getAllUsers)();
};
exports.getUsers = getUsers;
const updateUserDetails = async (id, data) => {
    if (data.password) {
        if (!(0, exports.validatePassword)(data.password)) {
            throw new Error("Password must be at least 6 characters long");
        }
        data.password = await (0, exports.hashPassword)(data.password);
    }
    if (data.email && !(0, exports.validateEmail)(data.email)) {
        throw new Error("Invalid email format");
    }
    const user = await (0, user_repository_1.updateUser)(id, data);
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
exports.updateUserDetails = updateUserDetails;
const deleteUserById = async (id) => {
    return (0, user_repository_1.deleteUser)(id);
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=user.service.js.map